const { Composer } = require('telegraf');
const { removeCustom_field } = require('../../features/editCustomFields.feature');
const sendMessageCustomFieldEditScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessageCustomFieldEdit.scene');
const sendMessageEditCustomFieldHelperScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessageEditCustomFieldHelper.scene');
const deleteMessagesById = require('../../utils/deleteMessagesById');

const complexSceneCustomFieldsActionsHandler = (task_id) => {
  const composer = new Composer()

  composer.action('custom_field_edit_act', async (ctx) => {
    await ctx.deleteMessage()
    ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
    await sendMessageCustomFieldEditScene(ctx)
  })

  composer.action('editCF', async (ctx) => {
    await ctx.deleteMessage()
    ctx.session.states.currentMenuState = 'custom_field'
    await sendMessageEditCustomFieldHelperScene(ctx)

  })

  composer.action('eraseCF', async (ctx) => {
    await ctx.deleteMessage()
    await removeCustom_field(ctx, task_id)
  })
  return composer
}

module.exports = complexSceneCustomFieldsActionsHandler