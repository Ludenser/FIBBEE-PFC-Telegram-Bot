import { Composer } from 'telegraf';
import sendMessageCommentScene from '../keyboards/sendMessageComment.keyboard';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { commentComposerActions as comment_Actions } from '../actions';
import { SessionCtx, Task } from '../../../global';

/**
    * Обработчик выбора меню комментариев
    * @param {Task} task - объект текущего таска
    * @param {string} task_id - id текущего таска
    */
const complexSceneCommentHandler = (task: Task, task_id: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(`${comment_Actions.UPL_COMMENT}${task_id}`, async (ctx) => {

    try {
      ctx.session.states.current.menu_state = 'comment'
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      await ctx.deleteMessage();
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, ctx.session.states.current.task.locationName,);
    }
  });

  return composer
}

export default complexSceneCommentHandler