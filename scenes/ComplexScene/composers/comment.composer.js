const { Composer } = require('telegraf');
const sendMessageCommentScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageComment.scene');
const sendMessageRouteEnterScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');

const UPL_COMMENT = 'upl_comment'

const complexSceneCommentHandler = (task_id, task_name) => {
  const composer = new Composer()

  composer.action(UPL_COMMENT, async (ctx) => {

    try {
      ctx.session.states.currentMenuState = 'comment'
      ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
      await ctx.deleteMessage();
      await sendMessageCommentScene(ctx);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task_name, task_id);
    }

  });

  return composer
}

module.exports = complexSceneCommentHandler