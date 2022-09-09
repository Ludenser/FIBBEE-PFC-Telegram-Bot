const { Composer } = require('telegraf');
const { editCustom_field } = require('../../../features/editCustomFields.feature');
const { sendProses } = require('../../../utils/sendLoadings');
const postCommentFeature = require('../../../features/postComment.feature')


const MAIN = 'main'
const COMMENT = 'comment'
const PHOTO = 'photo'
const CUSTOM_FIELD = 'custom_field'
const SIDETASK = 'sideTask'
const SIDETASK_COMMENT = 'sideTask_comment'
const SIDETASK_PHOTO = 'sideTask_photo'

const complexSceneTextHandler = (task_id) => {
  const composer = new Composer()

  composer.on('text', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case MAIN:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case COMMENT:
        await ctx.deleteMessage()
        await postCommentFeature(ctx, task_id);
        break;
      case PHOTO:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case CUSTOM_FIELD:
        await ctx.deleteMessage()
        await editCustom_field(ctx, task_id)
        break;
      case SIDETASK:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case SIDETASK_COMMENT:
        await ctx.deleteMessage()
        await postCommentFeature(ctx, ctx.session.states.currentSideTaskId)
        break;
      case SIDETASK_PHOTO:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
    }

  })
  return composer
}


module.exports = complexSceneTextHandler