const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  await ctx.reply('?',
    Markup.inlineKeyboard(
      [
        Markup.button.callback('Открыть меню предыдущего комплекса', 'reenter'),
      ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    })
  )
}