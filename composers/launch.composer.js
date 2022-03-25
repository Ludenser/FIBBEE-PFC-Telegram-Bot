const { Composer } = require('telegraf');
const sendMessageLaunch = require('../commands/sendMessageLaunch.command')

const composer = new Composer();

composer.action('launchChecklist', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageLaunch(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer