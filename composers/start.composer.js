const { Composer } = require('telegraf'),
  sendMessageStart = require('../keyboards/mainMenu/sendMessageStart'),
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.start((ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }
})

composer.command('/start', (ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }
})

composer.action('start', (ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer