const { Composer } = require('telegraf');
const { menu_states } = require('../../../config/otherSettings');
const { sendProses } = require('../../../utils/sendLoadings');
const { preventHandlersComposersActions: Actions } = require('../actions');

const globalTextHandler = () => {
  const composer = new Composer()

  composer.on(Actions.TEXT, async (ctx, next) => {
    switch (ctx.session.states.currentMenuState) {
      case menu_states.MAIN:
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