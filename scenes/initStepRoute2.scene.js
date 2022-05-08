const { Composer } = require('telegraf'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev');

const initStepRoute2 = new Composer()

initStepRoute2.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = initStepRoute2