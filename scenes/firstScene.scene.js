const
    { Composer, Markup } = require('telegraf'),
    { getMessageRouteSupplyFromClickAPI, getMessageRouteCleaningFromClickAPI } = require('../features/getRoute'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    { default: Timer } = require('easytimer.js')
sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const timer = new Timer()

const firstStep = new Composer()

firstStep.action('leaveScene', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave();
})

firstStep.action(`openRoute1`, async (ctx) => {
    timer.start()
    await ctx.deleteMessage()
    await getMessageRouteSupplyFromClickAPI(ctx)
    await GetTasksService.setTaskStatus('2bukvwe', 'in progress')
    await GetTimeService.startTimeEntry(24409308, '2bukvwe')
    await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'), Markup.inlineKeyboard([
        Markup.button.callback('Выйти', 'leave')
    ]))

    return await ctx.wizard.next();
})

firstStep.action(`openRoute2`, async (ctx) => {
    await ctx.deleteMessage()
    await getMessageRouteCleaningFromClickAPI(ctx)
    await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'), Markup.inlineKeyboard([
        Markup.button.callback('Выйти', 'leave')
    ]))
    return await ctx.wizard.selectStep(2);
})

module.exports = firstStep