const { Composer, Scenes, session } = require('telegraf'),
  sendMessageStart = require('../keyboards/mainMenu/sendMessageStart'),
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.start(async (ctx) => {
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

composer.command('/start', (ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
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