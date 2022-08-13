const { Composer } = require('telegraf');
const sendMessageInfo = require('../keyboards/mainMenu/sendMessageInfo');
const sendMessageDocs = require('../keyboards/mainMenu/sendMessageDocs');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const { sendError, sendProses } = require('../utils/sendLoadings');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');

/**
  * Обработчик главного меню
  */
const composer = new Composer();

composer.action('info', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageInfo(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

})

composer.action('docs', async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.isAuthUser === false) {
      await sendProses(ctx, 'Уважаемый, вы не уполномочены, покиньте чатик.')
      await sendMessageStart(ctx)
    } else {
      await sendMessageDocs(ctx)
    }
  } catch (e) {
    await sendError(ctx, e)
  }

})

composer.action('driverMenu', async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.isAuthUser === false) {
      await sendProses(ctx, 'Уважаемый, вы не уполномочены, покиньте чатик.')
      await sendMessageStart(ctx)
    } else {
      await sendMessageDriverMenu(ctx)
    }
  } catch (e) {
    await sendError(ctx, e)
  }

})


module.exports = composer