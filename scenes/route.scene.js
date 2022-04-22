const
  { default: Timer } = require('easytimer.js'),
  { getMessageRouteSupplyFromClickAPI, getMessageRouteCleaningFromClickAPI } = require('../features/getRoute'),
  { Scenes, Composer, Markup } = require('telegraf'),
  GetTasksService = require('../api/clickupApiTasks.service'),
  GetTimeService = require('../api/clickupApiTime.service')
sendMessageError = require('../utils/sendMessageError'),
  sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu'),
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

const stepRoute1 = new Composer()

stepRoute1.action('leave', async (ctx) => {
  await GetTimeService.stopTimeEntry(24409308)
  await GetTasksService.setTaskStatus('2bukvwe', 'to do')
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave()
})

const stepRoute2 = new Composer()

stepRoute2.action('leave', async (ctx) => {
  await GetTimeService.stopTimeEntry(24409308)
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave()

})

const routeScene = new Scenes.WizardScene('ROUTE_WIZARD_ID', firstStep, stepRoute1, stepRoute2)

module.exports = routeScene