const { Composer } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const { Task, Time } = require('../api/clickUpApi.service');
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
    // await Task.setTaskStatus(ctx.primeTaskSupply_id, 'in progress')
    // await Time.startTimeEntry(ctx.team_id, ctx.primeTaskSupply_id)
    await sendMessageUazPhoto(ctx)

    return await ctx.wizard.next();
})

divisionStep.action(`openRoute2`, async (ctx) => {

    await ctx.deleteMessage()
    await getMessageRouteFromClickAPI(ctx, listIdCleaning)
    await Task.setTaskStatus(ctx.primeTaskClean_id, 'in progress')
    await Time.startTimeEntry(ctx.team_id, ctx.primeTaskClean_id)
    await sendMessageUazPhoto(ctx)
    return await ctx.wizard.selectStep(2);
})

divisionStep.action('leaveScene', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await deleteMessagePrev(ctx, 2)
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    } catch (e) {
        await sendMessageError(ctx, e)
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    }
})
module.exports = divisionStep