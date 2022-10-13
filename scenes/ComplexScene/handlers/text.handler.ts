import { Composer } from 'telegraf';
import { editCustom_field } from '../../../features/editCustomFields.feature';
import { sendProses, sendError } from '../../../utils/sendLoadings';
import { postCommentFromMsg } from '../../../features/postComment.feature';
import { menu_states } from '../../../config/otherSettings';
import { preventHandlersComposersActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

export default () => {
  const composer = new Composer<SessionCtx>()

  composer.on(Actions.TEXT, async (ctx) => {
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
          await postCommentFromMsg(ctx, ctx.session.states.current.task.id);
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.PHOTO:
        try {
          await ctx.deleteMessage()
          await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.CUSTOM_FIELD:
        try {
          await ctx.deleteMessage()
          await editCustom_field(ctx, ctx.session.states.current.task.id)
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
          await postCommentFromMsg(ctx, ctx.session.states.current.side_task.id)
        } catch (e) {
          await sendError(ctx, e)
          console.log(e)
        }
        break;

      case menu_states.SIDETASK_PHOTO:
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
