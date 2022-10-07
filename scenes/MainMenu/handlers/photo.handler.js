const { Composer } = require('telegraf');
const { menu_states } = require('../../../config/otherSettings');
const { postAttachments } = require('../../../features/postAttachments.feature');
const { sendProses, sendError } = require('../../../utils/sendLoadings');
const { allComposerActions: Actions } = require('../actions');


const globalPhotoHandler = () => {
  const composer = new Composer()

  composer.on(Actions.PHOTO, async (ctx) => {
    switch (ctx.session.states.current.menu_state) {
      case menu_states.MAIN:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.COMMENT:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.PHOTO:
        try {
          await postAttachments(ctx, ctx.session.states.current.task.id);
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.CUSTOM_FIELD:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.SIDETASK:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.SIDETASK_COMMENT:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.SIDETASK_PHOTO:
        try {
          await postAttachments(ctx, ctx.session.states.current.side_task.id)
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.INIT_SCENE:
        try {
          await postAttachments(ctx, ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.DIVISION_SCENE:
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


module.exports = globalPhotoHandler
