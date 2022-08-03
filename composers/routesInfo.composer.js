const { Composer } = require('telegraf');
const { getMessageFromAllLists } = require('../features/getRoute.feature');
const { sendError } = require('../utils/sendLoadings');

/**
  * Обработчик меню с информацией о маршрутах
  */
const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await getMessageFromAllLists(ctx)
  } catch (e) {
    console.log(e)
    await sendError(ctx, e)
  }

})

module.exports = composer