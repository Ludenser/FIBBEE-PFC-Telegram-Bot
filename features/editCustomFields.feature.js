const Clickup = require('../api/index');
const _ = require('lodash');
const { sendProses } = require('../utils/sendLoadings');

const getCustomFieldIdFromCurrentTask = async (list_id, ClickAPI) => {

  const custom_fields = await ClickAPI.Custom_fields.getAllCustomFields(list_id)

  const custom_field = _(custom_fields.fields)
    .filter(item => _.includes(item.name, 'Supply'))
    .value()

  return custom_field[0].id
}


const editCustom_field = async (ctx, task_id) => {
  const ClickAPI = new Clickup(ctx.session.user.CU_Token)
  const customField_id = await getCustomFieldIdFromCurrentTask(ctx.session.all_lists[ctx.session.currentRouteNumber].list_id, ClickAPI)
  await ClickAPI.Custom_fields.setValue(task_id, customField_id, ctx.update.message.text)
  await sendProses(ctx, ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditAction_editDone'))

}

const removeCustom_field = async (ctx, task_id) => {
  const ClickAPI = new Clickup(ctx.session.user.CU_Token)
  const customField_id = await getCustomFieldIdFromCurrentTask(ctx.session.all_lists[ctx.session.currentRouteNumber].list_id, ClickAPI)
  await ClickAPI.Custom_fields.removeValue(task_id, customField_id)
  await sendProses(ctx, ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_eraseDone'))
}

module.exports = {
  editCustom_field,
  removeCustom_field
}