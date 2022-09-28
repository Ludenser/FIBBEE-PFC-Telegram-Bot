const { Composer } = require('telegraf');
const { menu_states } = require('../../../config/otherSettings');
const { sendProses } = require('../../../utils/sendLoadings');
const { preventHandlersComposersActions: Actions } = require('../actions');

const divisionSceneTextHandler = () => {
  const composer = new Composer()

  composer.on(Actions.TEXT, async (ctx) => {
    switch (ctx.session.states.current.menu_state) {
      case menu_states.DIVISION_SCENE:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          sendError(ctx, e)
          console.log(e)
        }
        break;
    }

  })
  return composer
}


module.exports = divisionSceneTextHandler