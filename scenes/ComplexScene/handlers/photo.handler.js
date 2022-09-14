const { Composer } = require('telegraf');
const { postAttachments } = require('../../../features/postAttachments.feature');
const { sendProses, sendError } = require('../../../utils/sendLoadings');

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
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case COMMENT:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case PHOTO:
        try {
          await postAttachments(ctx, ctx.session.states.currentTask_id);
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case CUSTOM_FIELD:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case SIDETASK:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case SIDETASK_COMMENT:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case SIDETASK_PHOTO:
        try {
          await postAttachments(ctx, ctx.session.states.currentSideTask.id)
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      default:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;
    }

  })
  return composer
}

module.exports = complexScenePhotoHandler
