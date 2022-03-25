const { getMessageRoutes } = require('../features/getRoute')

module.exports = async (ctx) => {

  await ctx.reply(getMessageRoutes(), {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Back!🔙', callback_data: 'launchChecklist' }
        ]
      ]
    },
    parse_mode: "Markdown"

  })
}