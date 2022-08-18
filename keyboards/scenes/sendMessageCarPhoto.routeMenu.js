const { Markup } = require("telegraf")

module.exports = async (ctx) => {
    const msg = "Жду, пока загрузишь машину. Перед выездом, отправь сюда фотки авто с 4-х сторон и нажми кнопку 'Загрузил'."
    await ctx.reply(msg,
        Markup.inlineKeyboard([
            Markup.button.callback(`Загрузил.`, 'get_start'),
            Markup.button.callback(`Пропустить`, 'get_start'),
            Markup.button.callback(`Отмена`, 'leaveScene')
        ]))
}