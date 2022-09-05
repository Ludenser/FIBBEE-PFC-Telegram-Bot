const { Composer } = require('telegraf');
const sendMessagePhotoScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessagePhoto.scene');
const sendMessageRouteEnterScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const deleteMessagesById = require('../../utils/deleteMessagesById');
const { sendError } = require('../../utils/sendLoadings');

const complexScenePhotoAction = (task_id, task_name) => {
  const composer = new Composer()

  composer.action('upl_photo', async (ctx) => {

    try {
      ctx.session.states.currentMenuState = 'photo'
      ctx.session.states.currentTask_id = task_id
      await ctx.deleteMessage();
      ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
      await sendMessagePhotoScene(ctx, task_name)

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  });

  return composer
}

module.exports = complexScenePhotoAction