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
        await getMessageRouteFromClickAPI(ctx, [listIdSupply])
        ctx.session.primeTask = ctx.primeTaskSupply_id

        await Task.setStatus(ctx.session.primeTask, 'in progress')
        await setAssigneeFeature(ctx.session.primeTask)
        const response = await Time.startEntry(ctx.team_id, ctx.session.primeTask)
        // ctx.main_timer_id = response.data.data.id

        await sendMessageUazPhoto(ctx)
        return await ctx.wizard.next();

    } catch (e) {
        console.log(e)
        await sendError(ctx, e)
    }

})

divisionStep.action(`openRoute2`, async (ctx) => {
    try {
        await ctx.deleteMessage()
        await getMessageRouteFromClickAPI(ctx, [listIdCleaning])
        ctx.session.primeTask = ctx.primeTaskClean_id
        await Task.setStatus(ctx.session.primeTask, 'in progress')
        await setAssigneeFeature(ctx.session.primeTask)
        await Time.startEntry(ctx.team_id, ctx.session.primeTask)

        await sendMessageUazPhoto(ctx)
        return await ctx.wizard.selectStep(2);
    } catch (e) {
        await sendError(ctx, e)
    }

})

divisionStep.action('closeRoute', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await sendMessageDriverMenu(ctx)

        await Task.setStatus(ctx.primeTaskClean_id, 'done')
        await Time.startEntry(ctx.team_id, ctx.primeTaskClean_id)

        await ctx.scene.leave();
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
        await ctx.scene.leave()
    }
})
module.exports = divisionStep