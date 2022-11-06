import { Composer } from 'telegraf';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import sendMessageSideTaskMenuScene from '../keyboards/sendMessageSideTaskMenu.keyboard';
import sendMessageSideTaskSelectScene from '../keyboards/sendMessageSideTaskSelect.keyboard';
import sendMessagePhotoScene from '../keyboards/sendMessagePhoto.keyboard';
import sendMessageCommentScene from '../keyboards/sendMessageComment.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import setAssigneeFeature from '../../../features/setAssignee.feature';
import { postCommentFromPhoto } from '../../../features/postComment.feature';
import { sideTaskComposerActions as st_Actions } from '../actions';
import { SessionCtx, Task } from '../../../global';
import { menu_states } from '../../../config/otherSettings';

/**
    * Обработчик меню дополнительных тасков, если они есть.
    * @param {string} task_id - id текущего таска
    * @param {string} task_name: - название текущего таска
    * @param {Task} task: - обьект текущего таска
    */
export default (ctx: SessionCtx, task_id: string, task_name: string, task: Task) => {

  const current_list = ctx.session.all_lists.find(o => o.list_id === task.list.id)
  const currentSideTasks = task.custom_fields.find(o => o.name === 'Комплекс').value
  let existSideTasks: Task[] = []
  if (Array.isArray(currentSideTasks)) {
    existSideTasks = current_list.sideTasks.filter(o => {
      for (let element of o.custom_fields) {
        if (element.hasOwnProperty('value') && Array.isArray(element.value)) {
          return element.value.includes(currentSideTasks.join())
        }
      }
    })
  }
  const composer = new Composer<SessionCtx>()

  composer.action(`${st_Actions.SIDETASK_MENU}${task_id}`, async (ctx) => {
    try {
      ctx.session.states.current.menu_state = menu_states.SIDETASK
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      }
      await ctx.deleteMessage();
      await sendMessageSideTaskSelectScene(ctx, existSideTasks)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  })

  existSideTasks.forEach(sideTask => {
    composer.action(`${sideTask.id}`, async (ctx) => {
      try {
        await setAssigneeFeature(ctx.session.user.id, sideTask.id, ctx.session.user.CU_Token)
        ctx.deleteMessage()

        ctx.session.states.current.side_task.id = sideTask.id
        ctx.session.states.current.side_task.name = sideTask.name
        await sendMessageSideTaskMenuScene(ctx)
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnterScene(ctx, task, task_name);
      }
    })
  })

  composer.action(st_Actions.SIDETASK_UPL_PHOTO, async (ctx) => {
    try {
      ctx.deleteMessage()
      ctx.session.states.current.menu_state = menu_states.SIDETASK_PHOTO
      await sendMessagePhotoScene(ctx, ctx.session.states.current.side_task.name)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  })

  composer.action(st_Actions.SIDETASK_UPL_PHOTO_DONE, async (ctx) => {
    try {
      ctx.deleteMessage()
      ctx.session.states.current.menu_state = menu_states.SIDETASK_PHOTO
      await postCommentFromPhoto(ctx, ctx.session.states.current.side_task.id, ctx.session.states.current.task.locationName)
      await sendMessageSideTaskMenuScene(ctx)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  })

  composer.action(st_Actions.SIDETASK_UPL_COMMENT, async (ctx) => {
    try {
      ctx.session.states.current.menu_state = menu_states.SIDETASK_COMMENT
      await ctx.deleteMessage()
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  })

  return composer
}
