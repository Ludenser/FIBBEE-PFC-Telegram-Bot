const { Composer } = require('telegraf');
const { postAttachments } = require('../../../features/postAttachments.feature');
const { menu_states } = require('../../../config/otherSettings');
const { sendError } = require('../../../utils/sendLoadings');
const { preventHandlersComposersActions: Actions } = require('../actions');

const initScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on(Actions.PHOTO, async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case menu_states.INIT_SCENE:
        try {
          await postAttachments(ctx, ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);
        } catch (e) {
          await sendError(ctx, e)
        }
        break;
    }

  })
  return composer
}

module.exports = initScenePhotoHandler
