const
    { Composer, Markup } = require('telegraf'),
    { getMessageRouteFromClickAPI } = require('../features/getRoute.feature'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu'),
    sendMessageUazPhoto = require('../keyboards/scenes/sendMessageUazPhoto.routeMenu'),
    fs = require('fs'),
    setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
    {
        listIdSupply,
        listIdCleaning
    } = setting;

const firstStep = new Composer()

firstStep.action('leaveScene', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave();
})

firstStep.action(`openRoute1`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteFromClickAPI(ctx, listIdSupply)
    // await GetTasksService.setTaskStatus('2eaj9tf', 'in progress')
    // await GetTimeService.startTimeEntry(24409308, '2eaj9tf')
    await sendMessageUazPhoto(ctx)

    return await ctx.wizard.next();
})

firstStep.action(`openRoute2`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteCleaningFromClickAPI(ctx, listIdCleaning)
    await sendMessageUazPhoto(ctx)
    return await ctx.wizard.selectStep(2);
})

module.exports = firstStep