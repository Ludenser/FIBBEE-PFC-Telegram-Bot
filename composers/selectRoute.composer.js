const { Composer, Scenes, session } = require('telegraf'),
    route1Scene = require('../scenes/route1.scene'),
    route2Scene = require('../scenes/route2.scene'),
    sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

const stage = new Scenes.Stage([route1Scene, route2Scene])
composer.use(session())
composer.use(stage.middleware())

composer.action('route1', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 1
        ctx.reply(`Вы выбрали ${ctx.routeNumber} маршрут`)
        ctx.scene.enter('route1Wizard')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

composer.action('route2', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 2
        ctx.reply(`Вы выбрали ${ctx.routeNumber} маршрут`)
        ctx.scene.enter('route2Wizard')
    } catch (e) {
        sendMessageError(ctx, e)
    }

})

module.exports = composer