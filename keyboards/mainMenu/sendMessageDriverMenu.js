module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('helper'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1️⃣ Снабжение 1️⃣', callback_data: 'route1' },
            { text: '2️⃣ Клининг 2️⃣', callback_data: 'route2' }
          ],
          [
            { text: 'ℹ Обзор всех тасков ℹ️', callback_data: 'routesInfo' }
          ],
          [
            { text: 'Назад!↩️', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"

    })
}