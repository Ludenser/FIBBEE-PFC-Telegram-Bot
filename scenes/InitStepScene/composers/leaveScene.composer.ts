import { Composer } from "telegraf";
import sendMessageDriverMenu from "../../MainMenu/keyboards/sendMessageDriverMenu.keyboard";
import { sendError } from "../../../utils/sendLoadings";
import { leaveSceneComposerActions as Actions } from "../actions";
import { SessionCtx } from '../../../global';

const composer = new Composer<SessionCtx>()

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

export default composer