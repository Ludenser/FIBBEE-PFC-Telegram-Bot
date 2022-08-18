const { Markup } = require('telegraf')

module.exports = async (ctx) => {
  const msg = 'Напиши комментарий к таску, если нужно кого-то тегнуть, добавь в конце комментария "@имя фамилия пользователя из клика.'

  await ctx.reply(msg,

    Markup
      .inlineKeyboard([
        Markup.button.callback('Вернуться в меню обслуживания комплекса', 'reenter'),
      ]))
}