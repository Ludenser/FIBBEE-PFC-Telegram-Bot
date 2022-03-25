const { Composer } = require('telegraf');
const sendMessageRoutesInfo = require('../commands/sendMessageRoutesInfo.command')

const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageRoutesInfo(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer