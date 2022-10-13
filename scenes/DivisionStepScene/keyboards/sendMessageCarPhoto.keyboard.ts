import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx) => {

    await ctx.reply(ctx.i18n.t('carPhotoCheck_scene_message'),
        Markup.inlineKeyboard([
            Markup.button.callback(ctx.i18n.t('doneUplButton'), 'get_start'),
            Markup.button.callback(ctx.i18n.t('return_button'), 'leaveScene')
        ]))
}