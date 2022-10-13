import { SessionCtx } from '../../../global'
import { Markup } from 'telegraf'

export default async (ctx: SessionCtx) => {

  await ctx.reply(ctx.i18n.t('helperInitRoute_scene_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('helperInitRoute_scene_initMessage'), `openRoute${ctx.session.currentRouteNumber}`),
      Markup.button.callback(ctx.i18n.t('return_button'), 'leaveScene')
    ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }
    )
  )
}