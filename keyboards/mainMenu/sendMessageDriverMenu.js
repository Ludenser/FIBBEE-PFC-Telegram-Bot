const list_ids = require('../../lib/list_idsFromClickUp')
const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  function routesKeyboard() {
    let buttonsArray = []
    if (ctx.session.all_lists.length) {
      ctx.session.all_lists.forEach((el, i) => {
        !el.isOpened ? buttonsArray.push(Markup.button.callback(`${i + 1} Маршрут`, `route${i}`)) : buttonsArray.push(Markup.button.callback(`${i + 1} Маршрут. Сейчас в работе.⚠️`, `route${i}`))
      })
      buttonsArray.push(Markup.button.callback('ℹ Обзор всех маршрутов ℹ️', 'routesInfo'))
      buttonsArray.push(Markup.button.callback('Назад!↩️', 'start'))
    } else {
      buttonsArray.push(Markup.button.callback('Назад!↩️', 'start'))
    }

    return buttonsArray
  }

  await ctx.reply(ctx.session.all_lists.length ? ctx.i18n.t('helper') : 'Актуальных тасков нет',
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