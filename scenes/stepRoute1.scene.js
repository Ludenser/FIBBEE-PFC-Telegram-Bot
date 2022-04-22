const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const stepRoute1 = new Composer()

stepRoute1.action('leave', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await GetTasksService.setTaskStatus('2bukvwe', 'to do')
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = stepRoute1