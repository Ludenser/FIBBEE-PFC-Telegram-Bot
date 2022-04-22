const { Composer, Scenes, session } = require('telegraf'),
    routeWizard = require('../wizards/route.wizard'),
    sendMessageError = require('../utils/sendMessageError'),
    sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu');


const composer = new Composer();

const stage = new Scenes.Stage([routeWizard])
composer.use(session())
composer.use(stage.middleware())

composer.action('route1', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 1
        await sendMessageInit(ctx)
        await ctx.scene.enter('ROUTE_WIZARD_ID')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

composer.action('route2', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 2
        await sendMessageInit(ctx)
        await ctx.scene.enter('ROUTE_WIZARD_ID')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

module.exports = composer