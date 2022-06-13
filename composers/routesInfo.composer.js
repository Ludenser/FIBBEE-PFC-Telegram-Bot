const { Composer } = require('telegraf');
const { getMessageAnyRoute } = require('../features/getRoute.feature');
const fs = require('fs');
const { sendError } = require('../utils/sendLoadings');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
  listIdSupply,
  listIdCleaning
} = setting;
const listIdArray = [listIdSupply,
  listIdCleaning]

/**
  * Обработчик меню с информацией о маршрутах
  */
const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    await getMessageAnyRoute(ctx, listIdArray)
  } catch (e) {
    await sendError(ctx, e)
  }

})

module.exports = composer