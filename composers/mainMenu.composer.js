const { Composer } = require('telegraf'),
  sendMessageInfo = require('../keyboards/mainMenu/sendMessageInfo'),
  sendMessageDocs = require('../keyboards/mainMenu/sendMessageDocs'),
  sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu'),
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.action('info', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageInfo(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})

composer.action('docs', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageDocs(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})

composer.action('driverMenu', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageDriverMenu(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})


module.exports = composer