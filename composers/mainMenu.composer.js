const { Composer } = require('telegraf');
const sendMessageInfo = require('../keyboards/mainMenu/sendMessageInfo');
const sendMessageDocs = require('../keyboards/mainMenu/sendMessageDocs');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageError = require('../utils/sendMessageError');

/**
  * Обработчик главного меню
  */
const composer = new Composer();

composer.action('info', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageInfo(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }

})

composer.action('docs', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageDocs(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }

})

composer.action('driverMenu', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageDriverMenu(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }

})


module.exports = composer