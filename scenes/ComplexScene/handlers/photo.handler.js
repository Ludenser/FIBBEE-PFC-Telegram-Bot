const { Composer } = require('telegraf');
const { postAttachments } = require('../../../features/postAttachments.feature');
const { sendProses } = require('../../../utils/sendLoadings');

const MAIN = 'main'
const COMMENT = 'comment'
const PHOTO = 'photo'
const CUSTOM_FIELD = 'custom_field'
const SIDETASK = 'sideTask'
const SIDETASK_COMMENT = 'sideTask_comment'
const SIDETASK_PHOTO = 'sideTask_photo'

const complexScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on('photo', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case MAIN:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case COMMENT:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case PHOTO:
        await postAttachments(ctx, ctx.session.states.currentTask_id);
        break;
      case CUSTOM_FIELD:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case SIDETASK:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case SIDETASK_COMMENT:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case SIDETASK_PHOTO:
        await postAttachments(ctx, ctx.session.states.currentSideTask.id)
        break;
      default:
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
    }

  })
  return composer
}

module.exports = complexScenePhotoHandler
