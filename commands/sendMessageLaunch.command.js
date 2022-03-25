
const { helper } = require('../lib/menu')

module.exports = async (ctx) => {

  await ctx.reply(helper(),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1️⃣', callback_data: 'route1' },
            { text: '2️⃣', callback_data: 'route2' }
          ],
          [
            { text: '❔Информация по маршрутам❔', callback_data: 'routesInfo' }
          ],
          [
            { text: 'Back!🔙', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"

    })
}