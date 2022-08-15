const _ = require('lodash');

module.exports = async (ctx, fields_array) => {
    const reqArr = _(fields_array)
        .find(['name', 'Обратить внимание!'])

    reqArr && reqArr.value ? await ctx.replyWithHTML(`<b>ОБРАТИ ВНИМАНИЕ:</b> \n${reqArr.value}`) : await ctx.reply('Тут все штатно')

}