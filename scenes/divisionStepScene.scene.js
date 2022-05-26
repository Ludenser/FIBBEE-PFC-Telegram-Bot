const { Composer } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const { Task, Time } = require('../api/clickUpApi.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhoto = require('../keyboards/scenes/sendMessageUazPhoto.routeMenu');
const fs = require('fs');
const setAssigneeFeature = require('../features/setAssignee.feature');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const { sendError } = require('../utils/sendLoadings')
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning
} = setting;

/**
  * Сцена распределения роутов.
  * 
  * Запуск таймера главного чек/листа, получение его id
  */
const divisionStep = new Composer()

divisionStep.action(`openRoute1`, async (ctx) => {
    try {
        await ctx.deleteMessage()
        await getMessageRouteFromClickAPI(ctx, { one: listIdSupply })
        await Task.setStatus(ctx.primeTaskSupply_id, 'in progress')
        await setAssigneeFeature(ctx.primeTaskSupply_id)
        const response = await Time.startEntry(ctx.team_id, ctx.primeTaskSupply_id)
        ctx.main_timer_id = response.data.data.id
        await sendMessageUazPhoto(ctx)
        return await ctx.wizard.next();

    } catch (e) {

        await sendError(ctx, e)
    }

})

divisionStep.action(`openRoute2`, async (ctx) => {
    try {
        await ctx.deleteMessage()
        await getMessageRouteFromClickAPI(ctx, { one: listIdCleaning })
        await Task.setStatus(ctx.primeTaskClean_id, 'in progress')
        await setAssigneeFeature(ctx.primeTaskClean_id)
        await Time.startEntry(ctx.team_id, ctx.primeTaskClean_id)
        await sendMessageUazPhoto(ctx)
        return await ctx.wizard.selectStep(2);
    } catch (e) {
        await sendError(ctx, e)
    }

})

divisionStep.action('leaveScene', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    } catch (e) {
        await sendError(ctx, e)
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    }
})
module.exports = divisionStep