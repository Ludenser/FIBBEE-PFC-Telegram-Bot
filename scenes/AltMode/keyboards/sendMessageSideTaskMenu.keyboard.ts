import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'

/**
    * Клавиатура меню действий в доп.задаче
    * @param {SessionCtx} ctx - объект контекста telegraf
    */

export default async (ctx: SessionCtx) => {
  let buttons = [
    Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'), 'sideTask_upl_photo'),
    Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_comment'), 'sideTask_upl_comment'),
    Markup.button.callback(ctx.i18n.t('return_button'), `sideTask_menu${ctx.session.states.current.task.id}`),
  ]

  await ctx.replyWithHTML(ctx.i18n.t('mainComplex_scene_keyBoard_sideTaskMenu_actions_header'),
    Markup.inlineKeyboard(
      buttons
      , {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
      })
  )

}