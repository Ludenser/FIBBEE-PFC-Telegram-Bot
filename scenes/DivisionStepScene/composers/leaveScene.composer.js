const { Composer } = require("telegraf");
const sendMessageDriverMenu = require("../../MainMenu/keyboards/sendMessageDriverMenu.keyboard");
const deleteMessagesById = require("../../../utils/deleteMessagesById");
const { sendError } = require("../../../utils/sendLoadings");
const { leaveSceneComposerActions: Actions } = require("../actions");


const composer = new Composer()

composer.action(Actions.LEAVE_SCENE, async (ctx) => {
  try {
    if (!ctx.session.states.route_msg.isDeleted) {
      ctx.session.states.route_msg.id = await deleteMessagesById(ctx, ctx.session.states.route_msg.id, ctx.session.states.route_msg.isDeleted)
    }
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