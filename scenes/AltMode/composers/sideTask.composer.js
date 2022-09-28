const { Composer } = require('telegraf');
const sendMessageRouteEnterScene = require('../keyboards/sendMessageRouteEnter.keyboard');
const sendMessageSideTaskMenuScene = require('../keyboards/sendMessageSideTaskMenu.keyboard');
const sendMessageSideTaskSelectScene = require('../keyboards/sendMessageSideTaskSelect.keyboard');
const sendMessagePhotoScene = require('../keyboards/sendMessagePhoto.keyboard');
const sendMessageCommentScene = require('../keyboards/sendMessageComment.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const setAssigneeFeature = require('../../../features/setAssignee.feature');
const { postCommentFromPhoto } = require('../../../features/postComment.feature');
const { sideTaskComposerActions: Actions } = require('../actions');

module.exports = (ctx, task_id, task_name, task) => {

  const current_list = ctx.session.all_lists.find(o => o.list_id === task.list.id)
  const currentSideTasks = task.custom_fields.find(o => o.name === 'Комплекс').value

  const existSideTasks = current_list.sideTasks.filter(o => {
    for (element of o.custom_fields) {
      if (element.hasOwnProperty('value') && Array.isArray(element.value)) {
        return element.value.includes(currentSideTasks.join())
      }
    }
  })

  // console.log(currentSideTasks, '-Все валуе Из текущего таска', exisSideTasks, '- находим ');
  const composer = new Composer()

  composer.action(`${Actions.SIDETASK_MENU}${task_id}`, async (ctx) => {
    try {
      ctx.session.states.current.menu_state = 'sideTask'
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      }
      await ctx.deleteMessage();
      await sendMessageSideTaskSelectScene(ctx, existSideTasks)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  })
  existSideTasks.forEach(sideTask => {
    composer.action(`${sideTask.id}`, async (ctx) => {
      try {
        await setAssigneeFeature(ctx.session.userName, sideTask.id, ctx.session.user.CU_Token)
        ctx.deleteMessage()

        ctx.session.states.current.side_task.id = sideTask.id
        ctx.session.states.current.side_task.name = sideTask.name
        await sendMessageSideTaskMenuScene(ctx)
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnterScene(ctx, task_name, task_id);
      }
    })
  })


  composer.action(Actions.SIDETASK_UPL_PHOTO, async (ctx) => {
    try {
      ctx.deleteMessage()
      ctx.session.states.current.menu_state = 'sideTask_photo'
      await sendMessagePhotoScene(ctx, ctx.session.states.current.side_task.name)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  })

  composer.action(Actions.SIDETASK_UPL_PHOTO_DONE, async (ctx) => {
    try {
      ctx.deleteMessage()
      ctx.session.states.current.menu_state = 'sideTask_photo'
      await postCommentFromPhoto(ctx, ctx.session.states.current.side_task.id, ctx.session.states.current.task.locationName)
      await sendMessageSideTaskMenuScene(ctx)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  })

  composer.action(Actions.SIDETASK_UPL_COMMENT, async (ctx) => {
    try {
      ctx.session.states.current.menu_state = 'sideTask_comment'
      await ctx.deleteMessage()
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  })
  return composer
}
