import { Composer } from 'telegraf';
import sendMessageCommentScene from '../keyboards/sendMessageComment.keyboard';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { commentComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';
import { menu_states } from '../../../config/otherSettings';

export const complexSceneCommentHandler = (task_id: string, task_name: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(Actions.UPL_COMMENT, async (ctx) => {

    try {

      ctx.session.states.current.menu_state = menu_states.COMMENT
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      await ctx.deleteMessage();
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }

  });

  return composer
}
