import { Composer } from "telegraf";
import { sendError } from "../../../utils/sendLoadings";
import sendMessageInitKeyboardInitStep from '../keyboards/sendMessageInitKeyboard.keyboard';
import { getStartComposerActions as Actions } from "../actions";
import { SessionCtx } from '../../../global';

const composer = new Composer<SessionCtx>()

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

export default composer