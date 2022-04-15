const { default: Timer } = require('easytimer.js');
const GetService = require('../api/clickupApi.service');
const { getMessageRouteSupplyFromClickAPI, getMessageRouteCleaningFromClickAPI } = require('../features/getRoute')
const { Scenes, Composer, Markup } = require('telegraf'),

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

// async function messagePoints(ctx, listId) {
//   const response = await GetService.getAll(listId)
//   const nameValues = response.data.tasks.reverse().map((value, index) => {
//     return `${index + 1}-${value.name}`
//   })
//   await ctx.reply(nameValues.join("\n\n"))
// }

firstStep.action(`openRoute1`, async (ctx) => {
  timer.start()
  await ctx.deleteMessage()
  await getMessageRouteSupplyFromClickAPI(ctx)
  await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'), Markup.inlineKeyboard([
    Markup.button.callback('Выйти', 'leave')
  ]))

  return await ctx.wizard.next();
})

firstStep.action(`openRoute2`, async (ctx) => {
  timer.start()
  await ctx.deleteMessage()
  await getMessageRouteCleaningFromClickAPI(ctx)
  await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'), Markup.inlineKeyboard([
    Markup.button.callback('Выйти', 'leave')
  ]))
  return await ctx.wizard.selectStep(2);
})

const stepRoute1 = new Composer()

stepRoute1.action('leave', async (ctx) => {
  timer.stop()
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave()
})

const stepRoute2 = new Composer()

stepRoute2.action('leave', async (ctx) => {
  timer.stop()
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave()

})

const routeScene = new Scenes.WizardScene('ROUTE_WIZARD_ID', firstStep, stepRoute1, stepRoute2)

module.exports = routeScene