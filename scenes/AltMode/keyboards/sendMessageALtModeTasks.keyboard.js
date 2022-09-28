const { Markup } = require('telegraf')

module.exports = async (ctx) => {

    function routesKeyboard() {
        let buttonsArray = []
        if (ctx.session.all_lists.length) {

            ctx.session.all_lists[ctx.session.currentRouteNumber].tasksWithoutDriverTaskAndSide.forEach(task => {
                buttonsArray.push(Markup.button.callback(`${task.name}`, `${task.id}`))
            })


            buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'modeChange'))
        } else {
            buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'modeChange'))
        }
        return buttonsArray
    }


    await ctx.reply('РЕЖИМ: ВЫБОР КОМПЛЕКСА. Выбери нужный таск:',
        Markup.inlineKeyboard(
            [
                ...routesKeyboard()
            ], {
            columns: 2,
            wrap: (btn, index, currentRow) => index != currentRow.length - 1
        }
        )
    )
}