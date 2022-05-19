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

const divisionStep = new Composer()
divisionStep.action('leaveScene', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    ctx.state = {}
    return await ctx.scene.leave();
})

divisionStep.action(`openRoute1`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteFromClickAPI(ctx, listIdSupply)
    await GetTasksService.setTaskStatus(ctx.primeTaskSupply_id, 'in progress')
    await GetTimeService.startTimeEntry(ctx.team_id, ctx.primeTaskSupply_id)
    await sendMessageUazPhoto(ctx)

    return await ctx.wizard.next();
})

divisionStep.action(`openRoute2`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteFromClickAPI(ctx, listIdCleaning)
    await GetTasksService.setTaskStatus(ctx.primeTaskClean_id, 'in progress')
    await GetTimeService.startTimeEntry(ctx.team_id, ctx.primeTaskClean_id)
    await sendMessageUazPhoto(ctx)
    return await ctx.wizard.selectStep(2);
})

module.exports = divisionStep