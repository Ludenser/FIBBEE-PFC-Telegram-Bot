const { Composer } = require('telegraf');
const sendMessageDocs = require('../commands/sendMessageDocs.command')

const composer = new Composer();

composer.action('docs', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageDocs(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer