const { getMessageRoutes } = require('../features/getRoute'),
    setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
    {
        listIdSupply,
        listIdCleaning
    } = setting;

module.exports = async (ctx) => {

    await ctx.reply(getMessageRoutes(ctx, ctx.routeNumber), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Начать работу!🚀', callback_data: 'openChecklist' }
                ],
                [
                    { text: 'Назад!↩️', callback_data: 'driverMenu' }
                ]
            ]
        },
        parse_mode: "Markdown"

    })
}