import { SessionCtx } from '../../../global';

import { Composer } from "telegraf";
import sendMessageDriverMenu from "../../MainMenu/keyboards/sendMessageDriverMenu.keyboard";
import { sendError } from "../../../utils/sendLoadings";
import { leaveSceneComposerActions as Actions } from "../actions";
import deleteMessagesById from '../../../utils/deleteMessagesById';


const composer = new Composer<SessionCtx>()

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

export default composer