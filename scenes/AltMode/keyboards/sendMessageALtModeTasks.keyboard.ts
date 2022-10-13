import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx) => {

    function routesKeyboard() {
        let buttonsArray = []
        if (ctx.session.all_lists.length) {

            ctx.session.all_lists[ctx.session.currentRouteNumber].allTasksWithoutSide.forEach(task => {
                buttonsArray.push(Markup.button.callback(`${task.name}`, `${task.id}`))
            })
            buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'modeChange'))
        } else {
            buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'modeChange'))
        }
        return buttonsArray
    }


    await ctx.reply(ctx.i18n.t('selectTaskMenu_keyboard_header'),
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