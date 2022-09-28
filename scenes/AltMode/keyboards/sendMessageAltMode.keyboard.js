const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  function routesKeyboard() {
    let buttonsArray = []
    if (ctx.session.all_lists.length) {
      ctx.session.all_lists.forEach((list, i) => {
        buttonsArray.push(Markup.button.callback(`${i + 1} Маршрут`, `${list.list_id}`))
      })
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('driverMenu_keyBoard_tasksOverview'), 'routesInfo'))
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'start'))
    } else {
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'start'))
    }
    return buttonsArray
  }

  await ctx.reply('РЕЖИМ: ВЫБОР КОМПЛЕКСА. Выбери номер маршрута:',
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