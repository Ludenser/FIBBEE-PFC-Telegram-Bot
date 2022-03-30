const { Composer } = require('telegraf');
const
  sendMessageInfo = require('../menu/sendMessageInfo'),
  sendMessageDocs = require('../menu/sendMessageDocs'),
  sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
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