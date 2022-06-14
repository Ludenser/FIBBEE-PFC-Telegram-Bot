const { Composer } = require('telegraf');
const sendMessageInfo = require('../keyboards/mainMenu/sendMessageInfo');
const sendMessageDocs = require('../keyboards/mainMenu/sendMessageDocs');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageError = require('../utils/sendMessageError');

/**
  * Обработчик главного меню
  */
const composer = new Composer();

composer.action('info', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageInfo(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})

composer.action('docs', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageDocs(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})

composer.action('driverMenu', (ctx) => {
  try {
    ctx.deleteMessage()
    sendMessageDriverMenu(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})


module.exports = composer