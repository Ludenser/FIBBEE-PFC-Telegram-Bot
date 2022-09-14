const { Composer } = require("telegraf");
const { sendError } = require("../../../utils/sendLoadings");
const sendMessageInitKeyboardInitStep = require('../../../keyboards/scenes/initStepSceneKeyboards/sendMessageInitKeyboard.initStep')

const GET_START = 'get_start'

const composer = new Composer()

composer.action(GET_START, async (ctx) => {
  try {
    await ctx.deleteMessage();
    await sendMessageInitKeyboardInitStep(ctx);
    ctx.scene.reset()
    await ctx.scene.enter(
      `${ctx.session.currentRouteNumber}`
    );
  } catch (e) {
    await sendError(ctx, e)
    await sendMessageInitKeyboardInitStep(ctx);
  }

})

module.exports = composer