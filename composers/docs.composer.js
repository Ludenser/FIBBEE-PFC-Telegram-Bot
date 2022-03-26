const { Composer } = require('telegraf');
const sendMessageDocs = require('../menu/sendMessageDocs')

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