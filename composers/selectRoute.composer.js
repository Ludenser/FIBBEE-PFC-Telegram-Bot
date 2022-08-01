const { Composer } = require('telegraf');
const { sendError } = require('../utils/sendLoadings');
const sendMessageInit = require('../keyboards/scenes/sendMessageInit.routeMenu');


/**
  * Обработчик сцены выбора роута. 
  * 
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
module.exports = (ctx) => {

    const selectComposerArray = ctx.session.all_lists.map((el, i) => {

        const selectComposer = new Composer()
        selectComposer.action(`route${i + 1}`, async (ctx) => {
            try {
                await ctx.deleteMessage()
                ctx.routeNumber = i + 1
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
