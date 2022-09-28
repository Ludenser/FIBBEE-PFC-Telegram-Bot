const { Composer } = require('telegraf');
const sendMessageCommentScene = require('../keyboards/sendMessageComment.keyboard');
const sendMessageRouteEnterScene = require('../keyboards/sendMessageRouteEnter.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const { commentComposerActions: Actions } = require('../actions');

const complexSceneCommentHandler = (task_id) => {
  const composer = new Composer()

  composer.action(`${Actions.UPL_COMMENT}${task_id}`, async (ctx) => {

    try {
      ctx.session.states.current.menu_state = 'comment'
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      await ctx.deleteMessage();
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, ctx.session.states.current.task.locationName, ctx.session.states.current.task.id);
    }
  });

  return composer
}

module.exports = complexSceneCommentHandler