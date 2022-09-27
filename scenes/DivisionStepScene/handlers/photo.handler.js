const { Composer } = require('telegraf');
const { menu_states } = require('../../../config/otherSettings');
const { sendProses, sendError } = require('../../../utils/sendLoadings');
const { preventHandlersComposersActions: Actions } = require('../actions');

const divisionScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on(Actions.PHOTO, async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
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

module.exports = divisionScenePhotoHandler
