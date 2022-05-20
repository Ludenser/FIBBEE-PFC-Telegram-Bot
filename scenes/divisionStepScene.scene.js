const { Composer, Markup } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const GetTasksService = require('../api/clickupApiTasks.service');
const GetTimeService = require('../api/clickupApiTime.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhoto = require('../keyboards/scenes/sendMessageUazPhoto.routeMenu');
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning
} = setting;

const divisionStep = new Composer()

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

divisionStep.action('leaveScene', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    ctx.state = {}
    return await ctx.scene.leave();
})
module.exports = divisionStep