const { Composer } = require('telegraf');
const { sendError } = require('../../../utils/sendLoadings');
const _ = require('lodash');
const { sendFormatMsgFromCurrentClickUpList } = require('../../../features/getRoute.feature');
const sendMessageInitRouteMenu = require('../keyboards/sendMessageInit.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { menu_states } = require('../../../config/otherSettings');
const { selectRouteComposerActions: Actions } = require('../actions');

/**
  * Обработчик сцены выбора роута. 
  * 
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
module.exports = (ctx) => {

    const selectComposerArray = _(ctx.session.all_lists)
        .map((el, i) => {

            const selectComposer = new Composer()
            selectComposer.action(`${Actions.ROUTE}${i}`, async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    ctx.session.currentRouteNumber = i
                    ctx.session.states.current.menu_state = menu_states.DIVISION_SCENE
                    if (!ctx.session.states.route_msg.isDeleted) {
                        ctx.session.states.route_msg.id = await deleteMessagesById(ctx, ctx.session.states.route_msg.id, ctx.session.states.route_msg.isDeleted)
                    }
                    await sendFormatMsgFromCurrentClickUpList(ctx, ctx.session.all_lists[i].tasksWithoutDriverTaskAndSide)
                    await sendMessageInitRouteMenu(ctx)
                    await ctx.scene.enter('INITIAL_WIZARD_ID')
                } catch (e) {
                    await sendError(ctx, e)
                }

            })
            return selectComposer
        })
    return selectComposerArray
}
