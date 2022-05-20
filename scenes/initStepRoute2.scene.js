const { Composer } = require('telegraf');
const GetTasksService = require('../api/clickupApiTasks.service');
const GetTimeService = require('../api/clickupApiTime.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhotoCheck = require('../keyboards/scenes/sendMessageUazPhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const postAttachment = require('../features/postAttachments.feature');

const initStepRoute2 = new Composer()

initStepRoute2.on('photo', async (ctx) => {
    await postAttachment(ctx, ctx.primeTaskClean_id)

})

initStepRoute2.on('message', async (ctx) => {
    await sendMessageUazPhotoCheck(ctx)

})

initStepRoute2.action('point_1', async (ctx) => {
    await ctx.scene.enter('POINTS_CLEAN_WIZARD_ID')
})

initStepRoute2.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(ctx.team_id, ctx.primeTaskClean_id)
    await GetTasksService.setTaskStatus(ctx.primeTaskClean_id, 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    ctx.state = {}
    return await ctx.scene.leave()


})

module.exports = initStepRoute2