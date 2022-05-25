const { Composer } = require('telegraf');
const sendMessageRoutesInfo = require('../keyboards/mainMenu/sendMessageRoutesInfo');
const sendMessageError = require('../utils/sendMessageError');

/**
  * Обработчик меню с информацией 
  */
const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageRoutesInfo(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer