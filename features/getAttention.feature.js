const _ = require('lodash');
/**
   * Функция для выдачи сообщения с информацией об актуальных особенностях комплекса.
   * @param {Ctx} ctx - объект контекста telegraf
   * @param {Array} fields_array - массив с элементами всех custom-fields в таске ClickUp
   */
module.exports = async (ctx, fields_array) => {
    const reqArr = _(fields_array)
        .find(['name', 'Обратить внимание!'])

    reqArr && reqArr.value ? await ctx.replyWithHTML(`<b>ОБРАТИ ВНИМАНИЕ:</b> \n${reqArr.value}`) : await ctx.reply('Тут все штатно')

}