const { info } = require('../lib/menu')

module.exports = async (ctx) => {
  await ctx.reply(info(),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'FIBBEE🆘', url: 'https://fibbee.com/' },
          ],
          [
            { text: 'Back!🔙', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}