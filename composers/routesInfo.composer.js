const { Composer } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const sendMessageError = require('../utils/sendMessageError');

/**
  * Обработчик меню с информацией о маршрутах
  */
const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await getMessageRouteFromClickAPI(ctx, { one: '192501456', two: '192502344' }, 'driverInfo')
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer