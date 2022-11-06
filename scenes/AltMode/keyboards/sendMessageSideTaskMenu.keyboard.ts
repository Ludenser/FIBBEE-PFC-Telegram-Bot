import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'
import { sideTaskComposerActions as st_Actions } from '../actions';

/**
    * Клавиатура меню действий в доп.задаче
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default async (ctx: SessionCtx) => {
  let buttons = [
    Markup.button.callback(
      ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'),
      st_Actions.SIDETASK_UPL_PHOTO
    ),
    Markup.button.callback(
      ctx.i18n.t('mainComplex_scene_keyBoard_comment'),
      st_Actions.SIDETASK_UPL_COMMENT
    ),
    Markup.button.callback(
      ctx.i18n.t('return_button'),
      `${st_Actions.SIDETASK_MENU}${ctx.session.states.current.task.id}`
    ),
  ]

  await ctx.replyWithHTML(ctx.i18n.t('mainComplex_scene_keyBoard_sideTaskMenu_actions_header'),
    Markup.inlineKeyboard(
      buttons
      , {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
      })
  )

}