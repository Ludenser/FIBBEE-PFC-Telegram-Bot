const fs = require('fs');
const setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))
const { ownerbot } = setting

module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('start_keyBoard_header', { ctx, ownerbot }),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: ctx.i18n.t('start_keyBoard_info'), callback_data: 'info' },
          ],
          [
            { text: ctx.i18n.t('start_keyBoard_docs'), callback_data: 'docs' }
          ],
          [
            { text: ctx.i18n.t('start_keyBoard_driverMenu'), callback_data: 'driverMenu' }
          ]
        ]
      },
      parse_mode: "Markdown",
      disable_web_page_preview: "true"
    })
}