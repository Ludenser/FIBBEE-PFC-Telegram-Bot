const { Composer } = require('telegraf');
const sendMessageSelectRoute = require('../commands/sendMessageSelectRoute.command');

const composer = new Composer();

composer.action('route1', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 1
        sendMessageSelectRoute(ctx)
    } catch (error) {
        ctx.reply(error)
    }

})

composer.action('route2', async (ctx) => {
    try {
        await ctx.deleteMessage()
        ctx.routeNumber = 2
        sendMessageSelectRoute(ctx)
    } catch (error) {
        ctx.reply(error)
    }

})


module.exports = composer