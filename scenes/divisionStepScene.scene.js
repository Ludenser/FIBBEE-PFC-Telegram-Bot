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
    await ctx.all_tasks.forEach(element => {
        if (element.name.includes('Водителя' || 'оператора')) {
            ctx.primeTask_id = element.id
        }
    })
    await GetTasksService.setTaskStatus(ctx.primeTask_id, 'in progress')
    await GetTimeService.startTimeEntry(24409308, ctx.primeTask_id)
    await sendMessageUazPhoto(ctx)

    return await ctx.wizard.next();
})

divisionStep.action(`openRoute2`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteCleaningFromClickAPI(ctx, listIdCleaning)
    await sendMessageUazPhoto(ctx)
    return await ctx.wizard.selectStep(2);
})

module.exports = divisionStep