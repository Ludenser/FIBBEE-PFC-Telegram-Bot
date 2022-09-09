const { Composer } = require('telegraf');
const Clickup = require('../../../api');
const sendMessageRouteEnterScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const sendMessageSideTaskMenuScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageSideTaskMenu.scene');
const sendMessageSideTaskSelectScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageSideTaskSelect.scene');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const sendMessagePhotoScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessagePhoto.scene');
const sendMessageCommentScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageComment.scene');
const setAssigneeFeature = require('../../../features/setAssignee.feature');

const SIDETASK_MENU = 'sideTask_menu'
const SIDETASK_UPL_PHOTO = 'sideTask_upl_photo'
const SIDETASK_UPL_COMMENT = 'sideTask_upl_comment'

module.exports = (ctx, task_id, task_name, task) => {

  const current_list = ctx.session.all_lists.find(o => o.list_id === task.list.id)

  const composerArr = _(current_list.sideTasks)
    .map((task) => {

      const composer = new Composer()

      composer.action(SIDETASK_MENU, async (ctx) => {
        try {
          ctx.session.states.currentMenuState = 'sideTask'
          if (!ctx.session.states.attention_msg_isDeleted) {
            ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
          }
          await ctx.deleteMessage();
          await sendMessageSideTaskSelectScene(ctx, current_list)
        } catch (e) {
          await sendError(ctx, e);
          await sendMessageRouteEnterScene(ctx, task_name, task_id);
        }
      })

      composer.action(`${task.id}`, async (ctx) => {
        try {
          await setAssigneeFeature(ctx.session.userName, task.id, ctx.session.user.CU_Token)
          ctx.deleteMessage()
          ctx.session.states.currentSideTaskId = task.id
          await sendMessageSideTaskMenuScene(ctx)
        } catch (e) {
          await sendError(ctx, e);
          await sendMessageRouteEnterScene(ctx, task_name, task_id);
        }
      })

      composer.action(SIDETASK_UPL_PHOTO, async (ctx) => {
        try {
          ctx.session.states.currentMenuState = 'sideTask_photo'
          await sendMessagePhotoScene(ctx, task.name)
        } catch (e) {
          await sendError(ctx, e);
          await sendMessageRouteEnterScene(ctx, task_name, task_id);
        }
      })

      composer.action(SIDETASK_UPL_COMMENT, async (ctx) => {
        try {
          ctx.session.states.currentMenuState = 'sideTask_comment'
          await ctx.deleteMessage()
          await sendMessageCommentScene(ctx);
        } catch (e) {
          await sendError(ctx, e);
          await sendMessageRouteEnterScene(ctx, task_name, task_id);
        }
      })
      return composer
    })
  return composerArr
}
