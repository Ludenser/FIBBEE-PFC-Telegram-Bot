const { Composer } = require('telegraf');
const
  sendMessageInfo = require('../menu/sendMessageInfo'),
  sendMessageDocs = require('../menu/sendMessageDocs'),
  sendMessageDriverMenu = require('../menu/sendMessageDriverMenu');

const composer = new Composer();

composer.action('info', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageInfo(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

composer.action('docs', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageDocs(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

composer.action('driverMenu', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageDriverMenu(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})


module.exports = composer