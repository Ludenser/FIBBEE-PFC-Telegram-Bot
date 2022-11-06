import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'
import { routesInfoComposerActions, mainMenuComposerActions } from '../actions'

/**
    * Клавиатура меню выбора маршрута
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default async (ctx: SessionCtx) => {

  function routesKeyboard() {
    let buttonsArray = []
    if (ctx.session.all_lists.length) {
      ctx.session.all_lists
        .forEach((list, i) => {
          buttonsArray.push(Markup.button.callback(
            `${i + 1} Маршрут`,
            `${list.list_id}`
          ))
        })
      buttonsArray.push(Markup.button.callback(
        ctx.i18n.t('return_button'),
        mainMenuComposerActions.DRIVERMENU
      ))
    } else {
      buttonsArray.push(Markup.button.callback(
        ctx.i18n.t('return_button'),
        mainMenuComposerActions.DRIVERMENU
      ))
    }
    return buttonsArray
  }

  await ctx.reply('Выбери номер маршрута:',
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