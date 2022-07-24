const list_ids = require('../../lib/list_idsFromClickUp')
const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  function routesKeyboard() {
    let buttonsArray = []
    list_ids.forEach((el, i) => {
      buttonsArray.push(Markup.button.callback(i + 1, `route${i + 1}`))
    })
    return buttonsArray
  }

  await ctx.reply(ctx.i18n.t('helper'),
    Markup.inlineKeyboard(
      [
        ...routesKeyboard(list_ids),
        Markup.button.callback('ℹ Обзор всех тасков ℹ️', 'routesInfo'),
        Markup.button.callback('Назад!↩️', 'start')
      ], {
      columns: 2,
      wrap: (btn, index, currentRow) => index != currentRow.length - 1
    }
    )
  )
}