import { Composer } from 'telegraf';
import { removeCustom_field } from '../../../features/editCustomFields.feature';
import sendMessageCustomFieldEditScene from '../keyboards/sendMessageCustomFieldEdit.keyboard';
import sendMessageEditCustomFieldHelperScene from '../keyboards/sendMessageEditCustomFieldHelper.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendProses } from '../../../utils/sendLoadings';
import { customFieldsComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

const complexSceneCustomFieldsActionsHandler = (task_id: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(`${Actions.CUSTOM_FIELD_EDIT_ACT}${task_id}`, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      await sendMessageCustomFieldEditScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }
  })

  composer.action(Actions.EDIT_CF, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.current.menu_state = 'custom_field'
      await sendMessageEditCustomFieldHelperScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }
  })

  composer.action(Actions.ERASE_CF, async (ctx) => {
    try {
      await removeCustom_field(ctx, ctx.session.states.current.task.id)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }
  })
  return composer
}

export default complexSceneCustomFieldsActionsHandler