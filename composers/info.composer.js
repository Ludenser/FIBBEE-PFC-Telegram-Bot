const { Composer } = require('telegraf');
const sendMessageInfo = require('../commands/sendMessageInfo.command')

const composer = new Composer();

composer.action('info', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageInfo(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer