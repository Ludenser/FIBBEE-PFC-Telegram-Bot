const { menu } = require('../lib/menu');
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))
const { ownerbot } = setting

module.exports = async (ctx) => {
  await ctx.reply(menu(ctx, ownerbot),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '❔Информация❔', callback_data: 'info' },
          ],
          [
            { text: '📚Рабочие документы📚', callback_data: 'docs' }
          ],
          [
            { text: '🚀Начать обслуживание🚀', callback_data: 'launchChecklist' }
          ]
        ]
      },
      parse_mode: "Markdown",
      disable_web_page_preview: "true"
    })
}