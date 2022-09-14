const { Composer } = require('telegraf');
const { postAttachments } = require('../../../features/postAttachments.feature');
const { sendError } = require('../../../utils/sendLoadings');

const INIT_SCENE = 'init_scene'

const initScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on('photo', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case INIT_SCENE:
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
