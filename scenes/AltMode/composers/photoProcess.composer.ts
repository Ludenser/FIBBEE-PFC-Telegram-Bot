import { Composer } from 'telegraf';
import sendMessagePhotoScene from '../keyboards/sendMessagePhoto.keyboard';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { photoProcessComposerActions as photo_Actions } from '../actions';
import { SessionCtx, Task } from '../../../global';


/**
    * Обработчик загрузки фото
    * @param {string} task_id - id текущего таска
    * @param {string} task_name: - название текущего таска
    * @param {Task} task: - обьект текущего таска
    */
const complexScenePhotoProcess = (task_id: string, task_name: string, task: Task) => {
  const composer = new Composer<SessionCtx>()

  composer.action(`${photo_Actions.UPL_PHOTO}${task_id}`, async (ctx) => {

    try {
      ctx.session.states.current.menu_state = 'photo'
      ctx.session.states.current.task.id = task_id
      await ctx.deleteMessage();
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      await sendMessagePhotoScene(ctx, task_name)

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  });

  return composer
}

export default complexScenePhotoProcess