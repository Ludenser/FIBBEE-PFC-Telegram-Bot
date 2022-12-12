import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'
import {
  altModeComposerActions,
  routesInfoComposerActions,
  startComposerActions,
} from '../actions'

export default async (ctx: SessionCtx) => {

  function routesKeyboard() {
    let buttonsArray = []
    buttonsArray.push(Markup.button.callback(
      'Меню выбора маршрута',
      altModeComposerActions.MODE_CHANGE
    ))
    buttonsArray.push(Markup.button.callback(
      ctx.i18n.t('driverMenu_keyBoard_tasksOverview'),
      routesInfoComposerActions.ROUTESINFO
    ))
    buttonsArray.push(Markup.button.callback(
      ctx.i18n.t('return_button'),
      startComposerActions.START
    ))

    return buttonsArray
  }

  await ctx.reply(
    ctx.session.all_lists.length
      ? ctx.i18n.t('driverMenu_keyBoard_header')
      : ctx.i18n.t('driverMenu_keyBoard_noActualTasks'),
    Markup.inlineKeyboard(
      [
        ...routesKeyboard()
      ], {
      columns: 2,
      wrap: (btn, index, currentRow) => index != currentRow.length - 1
    }
    )
  )
}