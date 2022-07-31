const { Composer, Scenes, session } = require('telegraf');
const { sendError } = require('../utils/sendLoadings');
const { getTaskIdArrFromApi } = require('../features/getRoute.feature');
const complexScene = require('../wizards/complex.wizard');
const sendMessageInit = require('../keyboards/scenes/sendMessageInit.routeMenu');
const initialScene = require('../wizards/route.wizard');


/**
  * Обработчик сцены выбора роута. 
  * 
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
module.exports = (ctx) => {

    const composer = new Composer();
    const stage = new Scenes.Stage([initialScene(ctx), ...complexScene(ctx)])

    composer.use(stage.middleware())

    composer.action('route1', async (ctx) => {
        try {
            await ctx.deleteMessage()
            ctx.routeNumber = 1
            await sendMessageInit(ctx)
            await ctx.scene.enter('INITIAL_WIZARD_ID')
        } catch (e) {
            await sendError(ctx, e)
        }

    })

    composer.action('route2', async (ctx) => {
        try {
            await ctx.deleteMessage()
            ctx.routeNumber = 2
            await sendMessageInit(ctx)
            await ctx.scene.enter('INITIAL_WIZARD_ID')
        } catch (e) {
            await sendError(ctx, e)
        }

    })

    return composer
}
