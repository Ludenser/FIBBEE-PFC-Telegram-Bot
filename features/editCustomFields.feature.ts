import { Clickup } from '../api/index';
import _ from 'lodash';
import { sendProses } from '../utils/sendLoadings';
import { SessionCtx } from '../global';


const getCustomFieldIdFromCurrentTask = async (list_id: string, ClickAPI: Clickup) => {

  const custom_fields = await ClickAPI.Custom_fields.getAllCustomFields(list_id)

  const custom_field = _(custom_fields.fields)
    .filter(item => _.includes(item.name, 'Supply'))
    .value()

  return custom_field[0].id
}
/**
   * Изменение поля custom_field "Обратить внимание!"
   * @param {SessionCtx} ctx - объект контекста telegraf
   * @param {String} task_id - id текущего task в ClickUp
   */

export const editCustom_field = async (ctx: SessionCtx, task_id: string) => {
  const ClickAPI = new Clickup(ctx.session.user.CU_Token)
  const customField_id = await getCustomFieldIdFromCurrentTask(ctx.session.all_lists[ctx.session.currentRouteNumber].list_id, ClickAPI)
  if ('message' in ctx.update && 'text' in ctx.update.message) {
    await ClickAPI.Custom_fields.setValue(task_id, customField_id, ctx.update.message.text)
  }
  await sendProses(ctx, ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditAction_editDone'))

}
/**
   * Очистка поля custom_field "Обратить внимание!"
   * @param {SessionCtx} ctx - объект контекста telegraf
   * @param {String} task_id - id текущего task в ClickUp
   */
export const removeCustom_field = async (ctx: SessionCtx, task_id: string) => {
  const ClickAPI = new Clickup(ctx.session.user.CU_Token)
  const customField_id = await getCustomFieldIdFromCurrentTask(ctx.session.all_lists[ctx.session.currentRouteNumber].list_id, ClickAPI)
  await ClickAPI.Custom_fields.removeValue(task_id, customField_id)
  await sendProses(ctx, ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_eraseDone'))
}
