const { Composer } = require("telegraf");
const sendMessageDriverMenu = require("../../MainMenu/keyboards/sendMessageDriverMenu.keyboard");
const { sendError } = require("../../../utils/sendLoadings");
const { leaveSceneComposerActions: Actions } = require("../actions");

const composer = new Composer()

composer.action(Actions.LEAVESCENE, async (ctx) => {
  try {
    await ctx.deleteMessage();
    await sendMessageDriverMenu(ctx);
    ctx.session.currentRouteNumber = null;
    await ctx.scene.leave();
  } catch (e) {
    await sendError(ctx, e);
    await ctx.scene.leave();
  }
});


module.exports = composer