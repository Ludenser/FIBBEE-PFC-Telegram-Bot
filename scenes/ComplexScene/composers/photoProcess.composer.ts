import { Composer } from 'telegraf';
import sendMessagePhotoScene from '../keyboards/sendMessagePhoto.keyboard';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { photoProcessComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

export const complexScenePhotoProcess = (task_id: string, task_name: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(Actions.UPL_PHOTO, async (ctx) => {

    try {
      ctx.session.states.current.menu_state = 'photo'
      ctx.session.states.current.task.id = task_id
      await ctx.deleteMessage();
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      await sendMessagePhotoScene(ctx, task_name)

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  });

  return composer
}
