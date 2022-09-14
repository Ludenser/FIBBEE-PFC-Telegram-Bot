const { Composer } = require('telegraf');
const { sendProses } = require('../../../utils/sendLoadings');

const DIVISION_SCENE = 'division_scene'

const divisionSceneTextHandler = () => {
  const composer = new Composer()

  composer.on('text', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case DIVISION_SCENE:
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