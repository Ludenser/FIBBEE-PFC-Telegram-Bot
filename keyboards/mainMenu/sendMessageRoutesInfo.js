const { getMessageRoutes } = require('../../features/getRoute.feature');

module.exports = async (ctx) => {

  await ctx.reply(getMessageRoutes(ctx), {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Назад!↩️', callback_data: 'driverMenu' }
        ]
      ]
    },
    parse_mode: "Markdown"

  })
}