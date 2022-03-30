const { Composer } = require('telegraf');
const sendMessageStart = require('../menu/sendMessageStart')

const composer = new Composer();

composer.start((ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (error) {
    ctx.reply(error)
  }
})

composer.command('/start', (ctx) => {
  try {
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