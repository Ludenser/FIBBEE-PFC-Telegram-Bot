const
  fs = require('fs'),
  { docs } = require('../lib/menu'),
  setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
  {
    ownerbot,
    urlFact,
    urlNewInfo,
    urlShedule,
    urlSupplyDemand
  } = setting

module.exports = async (ctx) => {
  await ctx.reply(docs(ownerbot),
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
            { text: 'Back!🔙', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}