const { Composer } = require("telegraf");
const sendMessageDriverMenu = require("../../../keyboards/mainMenu/sendMessageDriverMenu");
const { sendError } = require("../../../utils/sendLoadings");

const LEAVESCENE = 'leaveScene'

const composer = new Composer()

composer.action(LEAVESCENE, async (ctx) => {
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