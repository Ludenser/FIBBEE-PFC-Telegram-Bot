import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'
import { enterComposerActions as shared_Actions } from '../actions'


export default async (ctx: SessionCtx) => {

    function routesKeyboard() {
        let buttonsArray = []
        if (ctx.session.all_lists.length) {

            ctx.session.all_lists[ctx.session.currentRouteNumber].tasksWithoutDriverTaskAndSide
                .forEach(task => {
                    buttonsArray.push(Markup.button.callback(task.name, task.id))
                })
            buttonsArray.push(Markup.button.callback(
                ctx.i18n.t('return_button'),
                shared_Actions.MODE_CHANGE
            ))
        } else {
            buttonsArray.push(Markup.button.callback(
                ctx.i18n.t('return_button'),
                shared_Actions.MODE_CHANGE
            ))
        }
        return buttonsArray
    }

    await ctx.reply(
        'Выбери нужный таск:',
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