const { Composer } = require('telegraf');
const { removeCustom_field } = require('../../../features/editCustomFields.feature');
const sendMessageCustomFieldEditScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageCustomFieldEdit.scene');
const sendMessageEditCustomFieldHelperScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageEditCustomFieldHelper.scene');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendProses } = require('../../../utils/sendLoadings');

const CUSTOM_FIELD_EDIT_ACT = 'custom_field_edit_act'
const EDIT_CF = 'edit_CF'
const ERASE_CF = 'erase_CF'


const complexSceneCustomFieldsActionsHandler = (task_id) => {
  const composer = new Composer()

  composer.action(CUSTOM_FIELD_EDIT_ACT, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      await sendMessageCustomFieldEditScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }

  })

  composer.action(EDIT_CF, async (ctx) => {
    try {
      await ctx.deleteMessage()
      ctx.session.states.currentMenuState = 'custom_field'
      await sendMessageEditCustomFieldHelperScene(ctx)
    } catch (e) {
      await sendProses(ctx, e)
      console.log(e)
    }


  })

  composer.action(ERASE_CF, async (ctx) => {
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