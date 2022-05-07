const
    { Composer, Markup } = require('telegraf'),
    { getMessageRouteSupplyFromClickAPI, getMessageRouteCleaningFromClickAPI } = require('../features/getRoute'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    sendMessageUazPhoto = require('../routeMenu/sendMessageUazPhoto.routeMenu')

const firstStep = new Composer()

firstStep.action('leaveScene', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave();
})

firstStep.action(`openRoute1`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteSupplyFromClickAPI(ctx)
    // await GetTasksService.setTaskStatus('2bukvwe', 'in progress')
    // await GetTimeService.startTimeEntry(24409308, '2bukvwe')
    await sendMessageUazPhoto(ctx)

    return await ctx.wizard.next();
})

firstStep.action(`openRoute2`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteCleaningFromClickAPI(ctx)
    await sendMessageUazPhoto(ctx)
    return await ctx.wizard.selectStep(2);
})

module.exports = firstStep