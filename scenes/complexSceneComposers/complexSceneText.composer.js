const { Composer } = require('telegraf');
const { editCustom_field } = require('../../features/editCustomFields.feature');
const postCommentFeature = require('../../features/postComment.feature');
const { sendProses } = require('../../utils/sendLoadings');

const complexSceneTextHandler = (task_id) => {
  const composer = new Composer()

  composer.on('text', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case 'main':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'comment':
        await ctx.deleteMessage()
        await postCommentFeature(ctx, task_id);
        break;
      case 'photo':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'custom_field':
        await ctx.deleteMessage()
        await editCustom_field(ctx, task_id)
        break;
    }

  })
  return composer
}


module.exports = complexSceneTextHandler