const { Composer } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const sendMessageError = require('../utils/sendMessageError');
const fs = require('fs');
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
    await getMessageRouteFromClickAPI(ctx, listIdArray)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer