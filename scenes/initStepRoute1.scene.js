const { Composer } = require('telegraf');
const GetTasksService = require('../api/clickupApiTasks.service');
const GetTimeService = require('../api/clickupApiTime.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhotoCheck = require('../keyboards/scenes/sendMessageUazPhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const postAttachment = require('../features/postAttachments.feature');
const initStepRoute1 = new Composer()

initStepRoute1.on('photo', async (ctx) => {
    await postAttachment(ctx, ctx.primeTaskSupply_id)
})

initStepRoute1.on('message', async (ctx) => {
    await sendMessageUazPhotoCheck(ctx)
})

initStepRoute1.action('point_1', async (ctx) => {
    await ctx.scene.enter('POINTS_SUPPLY_WIZARD_ID')
})

initStepRoute1.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(ctx.team_id, ctx.primeTaskSupply_id)
    await GetTasksService.setTaskStatus(ctx.primeTaskSupply_id, 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    ctx.state = {}
    return await ctx.scene.leave()
})

module.exports = initStepRoute1