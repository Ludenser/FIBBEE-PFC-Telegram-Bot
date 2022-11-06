import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'
import { enterComposerActions as shared_Actions, customFieldsComposerActions as cf_Actions } from "../actions";

/**
    * Клавиатура сцены изменения custom-field
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default async (ctx: SessionCtx) => {
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(
        ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_editButton'),
        cf_Actions.EDIT_CF),
      Markup.button.callback(
        ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_eraseButton'),
        cf_Actions.ERASE_CF),
      Markup.button.callback(
        ctx.i18n.t('return_button'),
        `${shared_Actions.REENTER}${ctx.session.states.current.task.id}`),
    ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }))
}