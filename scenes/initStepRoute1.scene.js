const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu'),
    sendMessageUazPhotoCheck = require('../keyboards/scenes/sendMessageUazPhotoCheck.routeMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev'),
    postAttachment = require('../features/postAttachments.feature');

const initStepRoute1 = new Composer()

initStepRoute1.on('photo', async (ctx) => {
    await postAttachment(ctx, '2eaj9tf')
})

initStepRoute1.on('message', async (ctx) => {
    await sendMessageUazPhotoCheck(ctx)
})

initStepRoute1.action('point_1', async (ctx) => {
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 3)
    await deleteMessagePrev(ctx, 2)
    await deleteMessagePrev(ctx, 1)
    // return await ctx.wizard.next()
})

initStepRoute1.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await GetTasksService.setTaskStatus('2eaj9tf', 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = initStepRoute1