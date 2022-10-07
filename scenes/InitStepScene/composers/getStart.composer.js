const { Composer } = require("telegraf");
const { sendError } = require("../../../utils/sendLoadings");
const sendMessageInitKeyboardInitStep = require('../keyboards/sendMessageInitKeyboard.keyboard');
const { getStartComposerActions: Actions } = require("../actions");

const composer = new Composer()

composer.action(Actions.GET_START, async (ctx) => {
  try {
    ctx.session.states.current.menu_state = 'start_step'
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