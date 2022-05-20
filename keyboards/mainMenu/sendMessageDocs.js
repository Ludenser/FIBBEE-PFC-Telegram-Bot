const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
  urlFact,
  urlNewInfo,
  urlShedule,
  urlSupplyDemand
} = setting

module.exports = async (ctx) => {
  await ctx.reply(ctx.i18n.t('docs'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Новая информация⚠️', url: urlNewInfo },
            { text: 'Рабочий график📆', url: urlShedule }
          ],
          [
            { text: 'Заказы комплексов🧾', url: urlSupplyDemand },
            { text: 'Факт📊', url: urlFact }
          ],
          [
            { text: 'Назад!↩️', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}