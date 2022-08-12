const { Markup } = require("telegraf")

module.exports = async (ctx, current_complex, next_complex) => {
  await ctx.reply(`Заканчиваем ${current_complex}, следующий комплекс - ${next_complex}`,
    Markup.inlineKeyboard([
      Markup.button.callback(`Приехал. Приступаем.`, 'enter'),
    ]))
}