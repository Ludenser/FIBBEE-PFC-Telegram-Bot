const { Composer, Scenes, session } = require('telegraf'),
    route1Scene = require('../scenes/route1.scene'),
    route2Scene = require('../scenes/route2.scene'),
    sendMessageError = require('../utils/sendMessageError'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const composer = new Composer();

const stage = new Scenes.Stage([route1Scene, route2Scene])
composer.use(session())
composer.use(stage.middleware())

composer.action('route1', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 1
        await ctx.scene.enter('ROUTE_1_WIZARD_ID')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

composer.action('route2', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 2
        await ctx.scene.enter('ROUTE_2_WIZARD_ID')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

composer.action('leaveScene', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = undefined
        return await ctx.scene.leave()

    } catch (e) {
        sendMessageError(ctx, e)
    }

})

module.exports = composer