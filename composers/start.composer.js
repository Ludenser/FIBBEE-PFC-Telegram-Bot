const { Composer } = require('telegraf');
const sendMessageStart = require('../commands/sendMessageStart.command')

const composer = new Composer();

composer.start(async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageStart(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})
composer.action('start', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageStart(ctx, composer)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer