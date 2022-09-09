const { Composer } = require('telegraf');
const { sendProses } = require('../../../utils/sendLoadings');

const DIVISION_SCENE = 'division_scene'

const divisionScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on('photo', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case DIVISION_SCENE:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
    }

  })
  return composer
}

module.exports = divisionScenePhotoHandler
