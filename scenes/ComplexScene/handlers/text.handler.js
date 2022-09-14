const { Composer } = require('telegraf');
const { editCustom_field } = require('../../../features/editCustomFields.feature');
const { sendProses } = require('../../../utils/sendLoadings');
const { postCommentFromMsg } = require('../../../features/postComment.feature')


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
          await postCommentFromMsg(ctx, task_id);
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case PHOTO:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case CUSTOM_FIELD:
        try {
          await ctx.deleteMessage()
          await editCustom_field(ctx, task_id)
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
          await postCommentFromMsg(ctx, ctx.session.states.currentSideTask.id)
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case SIDETASK_PHOTO:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
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


module.exports = complexSceneTextHandler