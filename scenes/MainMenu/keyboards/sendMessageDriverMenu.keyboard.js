const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  function routesKeyboard() {
    let buttonsArray = []
    if (ctx.session.all_lists.length) {
      ctx.session.all_lists.forEach((el, i) => {
        !el.isOpened ? buttonsArray.push(Markup.button.callback(`${i + 1} Маршрут`, `selectRoute${i}`)) : buttonsArray.push(Markup.button.callback(`${i + 1} Маршрут. Сейчас в работе.⚠️`, `selectRoute${i}`))
      })
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('driverMenu_keyBoard_tasksOverview'), 'routesInfo'))
      buttonsArray.push(Markup.button.callback('Режим выбора комплекса', 'modeChange'))
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'start'))
    } else {
      buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'start'))
    }

    return buttonsArray
  }

  await ctx.reply(ctx.session.all_lists.length ? ctx.i18n.t('driverMenu_keyBoard_header') : ctx.i18n.t('driverMenu_keyBoard_noActualTasks'),
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