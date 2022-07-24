const { Composer } = require('telegraf');
const { getMessageAnyRoute } = require('../features/getRoute.feature');
const { sendError } = require('../utils/sendLoadings');
const stringToNumber = require('../features/stringToNumber.feature')
const list_ids = require('../lib/list_idsFromClickUp')

/**
  * Обработчик меню с информацией о маршрутах
  */
const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await getMessageAnyRoute(ctx, stringToNumber(list_ids))
  } catch (e) {
    console.log(e)
    await sendError(ctx, e)
  }

})

module.exports = composer