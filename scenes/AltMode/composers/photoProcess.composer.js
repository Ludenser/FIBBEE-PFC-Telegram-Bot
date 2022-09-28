const { Composer } = require('telegraf');
const sendMessagePhotoScene = require('../keyboards/sendMessagePhoto.keyboard');
const sendMessageRouteEnterScene = require('../keyboards/sendMessageRouteEnter.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const { photoProcessComposerActions: Actions } = require('../actions');

const complexScenePhotoProcess = (task_id, task_name) => {
  const composer = new Composer()

  composer.action(`${Actions.UPL_PHOTO}${task_id}`, async (ctx) => {

    try {
      ctx.session.states.current.menu_state = 'photo'
      ctx.session.states.current.task.id = task_id
      await ctx.deleteMessage();
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      await sendMessagePhotoScene(ctx, task_name)

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }
  });

  return composer
}

module.exports = complexScenePhotoProcess