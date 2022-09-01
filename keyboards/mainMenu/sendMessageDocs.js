const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
  urlFact,
  urlNewInfo,
  urlShedule,
  urlSupplyDemand
} = setting

module.exports = async (ctx) => {
  await ctx.reply(ctx.i18n.t('docs_keyBoard_header'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: ctx.i18n.t('docs_keyBoard_newInfo'), url: urlNewInfo },
            { text: ctx.i18n.t('docs_keyBoard_workShedule'), url: urlShedule }
          ],
          [
            { text: ctx.i18n.t('docs_keyBoard_complexOrders'), url: urlSupplyDemand },
            { text: ctx.i18n.t('docs_keyBoard_fact'), url: urlFact }
          ],
          [
            { text: ctx.i18n.t('return_button'), callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}