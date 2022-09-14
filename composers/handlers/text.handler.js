const { Composer } = require('telegraf');
const { sendProses } = require('../../utils/sendLoadings');

const MAIN_MENU = 'main_menu'

const globalTextHandler = () => {
  const composer = new Composer()

  composer.on('text', async (ctx, next) => {
    switch (ctx.session.states.currentMenuState) {
      case MAIN_MENU:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      default:
        await next()
        break;
    }

  })
  return composer
}


module.exports = globalTextHandler