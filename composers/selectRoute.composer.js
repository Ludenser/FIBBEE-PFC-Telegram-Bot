const { Composer } = require('telegraf');
const { sendError } = require('../utils/sendLoadings');
const _ = require('lodash');
const { sendFormatMsgFromCurrentClickUpList } = require('../features/getRoute.feature');
const sendMessageInitRouteMenu = require('../keyboards/mainMenu/sendMessageInit.routeMenu');
const deleteMessagesById = require('../utils/deleteMessagesById');

const ROUTE = 'route'

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
            selectComposer.action(`${ROUTE}${i}`, async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    ctx.session.currentRouteNumber = i
                    ctx.session.states.currentMenuState = 'division_scene'
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
