const { Composer } = require('telegraf');
const { sendError } = require('../utils/sendLoadings');
const _ = require('lodash');
const sendMessageInit = require('../keyboards/scenes/sendMessageInit.routeMenu');
const { sendFormatMsgFromCurrentClickUpList } = require('../features/getRoute.feature');


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
            selectComposer.action(`route${i}`, async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    ctx.session.currentRouteNumber = i
                    await sendFormatMsgFromCurrentClickUpList(ctx, ctx.session.all_lists[i].tasksWithoutMain)
                    await sendMessageInit(ctx)
                    await ctx.scene.enter('INITIAL_WIZARD_ID')
                } catch (e) {
                    await sendError(ctx, e)
                }

            })
            return selectComposer
        })
    return selectComposerArray
}
