module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('helper'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1️⃣Снабжение1️⃣', callback_data: 'route1' },
            { text: '2️⃣Клининг2️⃣', callback_data: 'route2' }
          ],
          [
            { text: '❔Информация по маршрутам❔', callback_data: 'routesInfo' }
          ],
          [
            { text: 'Назад!↩️', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"

    })
}