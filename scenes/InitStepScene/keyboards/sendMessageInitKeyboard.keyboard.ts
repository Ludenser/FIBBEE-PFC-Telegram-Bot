import { SessionCtx } from '../../../global';

import { Markup } from "telegraf";

export default async (ctx: SessionCtx) => {

  await ctx.reply(ctx.i18n.t('init_scene_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('init_scene_keyBoard_initButton'), 'enter'),
    ])
  );
}