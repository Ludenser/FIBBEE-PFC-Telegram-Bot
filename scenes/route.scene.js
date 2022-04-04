const { Scenes, Composer } = require('telegraf'),
  sendMessageError = require('../utils/sendMessageError'),
  sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu'),
  sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const firstStep = new Composer()

firstStep.action('leaveScene', async (ctx) => {
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave();
})

firstStep.action(`openRoute1`, async (ctx) => {
  await ctx.reply(ctx.i18n.t('helperSceneLeave'))
  setTimeout(() => {
    ctx.deleteMessage()
  }, 5000);
  return await ctx.wizard.next();
})

firstStep.action(`openRoute2`, async (ctx) => {
  await ctx.reply(ctx.i18n.t('helperSceneLeave'))
  setTimeout(() => {
    ctx.deleteMessage()
  }, 5000);
  return await ctx.wizard.selectStep(3);
})

const stepRoute1 = new Composer()

stepRoute1.command('leave', async (ctx) => {
  await ctx.deleteMessage()
  await sendMessageDriverMenu(ctx)
  return await ctx.scene.leave()
})

const stepRoute2 = new Composer()

stepRoute2.on('text', async (ctx) => {
  if (ctx.message.text == 'выход') {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
  }
})


const routeScene = new Scenes.WizardScene('ROUTE_WIZARD_ID', firstStep, stepRoute1, stepRoute2)

module.exports = routeScene