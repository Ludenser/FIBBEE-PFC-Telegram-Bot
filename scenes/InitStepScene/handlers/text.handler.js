const { Composer } = require('telegraf');
const { sendProses } = require('../../../utils/sendLoadings');

const INIT_SCENE = 'init_scene'

const initSceneTextHandler = () => {
  const composer = new Composer()

  composer.on('text', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case INIT_SCENE:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
    }

  })
  return composer
}


module.exports = initSceneTextHandler