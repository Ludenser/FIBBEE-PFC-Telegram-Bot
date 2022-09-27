const { Composer } = require('telegraf');
const { removeCustom_field } = require('../../../features/editCustomFields.feature');
const sendMessageCustomFieldEditScene = require('../keyboards/sendMessageCustomFieldEdit.keyboard');
const sendMessageEditCustomFieldHelperScene = require('../keyboards/sendMessageEditCustomFieldHelper.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendProses } = require('../../../utils/sendLoadings');
const { customFieldsComposerActions: Actions } = require('../actions');

const complexSceneCustomFieldsActionsHandler = (task_id) => {
  const composer = new Composer()

  composer.action(Actions.CUSTOM_FIELD_EDIT_ACT, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      await sendMessageCustomFieldEditScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }
  })

  composer.action(Actions.EDIT_CF, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.currentMenuState = 'custom_field'
      await sendMessageEditCustomFieldHelperScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }
  })

  composer.action(Actions.ERASE_CF, async (ctx) => {
    try {
      await removeCustom_field(ctx, task_id)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }

  })
  return composer
}

module.exports = complexSceneCustomFieldsActionsHandler