const { Composer } = require('telegraf');
const sendMessageCommentScene = require('../keyboards/sendMessageComment.keyboard');
const sendMessageRouteEnterScene = require('../keyboards/sendMessageRouteEnter.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const { commentComposerActions: Actions } = require('../actions');

const complexSceneCommentHandler = (task_id, task_name) => {
  const composer = new Composer()

  composer.action(Actions.UPL_COMMENT, async (ctx) => {

    try {
      ctx.session.states.currentMenuState = 'comment'
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
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