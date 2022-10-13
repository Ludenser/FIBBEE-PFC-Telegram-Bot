import { Settings } from '../../../config/setting';
import { SessionCtx } from '../../../global';

export default async (ctx: SessionCtx) => {
  await ctx.reply(ctx.i18n.t('docs_keyBoard_header'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: ctx.i18n.t('docs_keyBoard_newInfo'), url: Settings.URL_NEWINFO },
            { text: ctx.i18n.t('docs_keyBoard_workShedule'), url: Settings.URL_SCHEDULE }
          ],
          [
            { text: ctx.i18n.t('docs_keyBoard_complexOrders'), url: Settings.URL_SUPPLYDEMAND },
            { text: ctx.i18n.t('docs_keyBoard_fact'), url: Settings.URL_FACT }
          ],
          [
            { text: ctx.i18n.t('return_button'), callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}