const { Composer } = require('telegraf'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const stepRoute2 = new Composer()

stepRoute2.action('leave', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = stepRoute2