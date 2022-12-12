import { Composer } from 'telegraf';
import convertTranslit from 'cyrillic-to-translit-js';
import _ from 'lodash';
import { dbConfig, userModel } from '../../../db/index';
import sendMessageStart from '../keyboards/sendMessageStart.keyboard';
import { sendError, sendProses } from '../../../utils/sendLoadings';
import { addTasksToCtx } from '../../../features/addTasksToCtx.feature';
import authUserFeature from '../../../features/authUser.feature';
import globalPhotoHandler from '../handlers/photo.handler';
import globalTextHandler from '../handlers/text.handler';
import altModeComposer from '../../AltMode/composers/altMode.composer';
import { menu_states } from '../../../config/otherSettings';
import { startComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

/**
  * Обработчик стартовых команд.
  * Аутентификация пользователя. 
  */

export const startComposer = new Composer<SessionCtx>();

startComposer.start(async (ctx) => {
  try {

    await ctx.deleteMessage()
    await dbConfig.authenticate()
    await dbConfig.sync()
    startComposer.use(globalPhotoHandler())
    startComposer.use(globalTextHandler())

    const userName = `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`
    ctx.session.userName = convertTranslit().transform(userName)
    ctx.session.isAuthUser = false
    const userDb = await userModel.findOne({ where: { tg_username: userName } })
    console.log(userDb, userName);
    if (!userDb) {
      await authUserFeature(ctx)
    } else {
      const {
        clickup_user_id,
        tg_username,
        clickup_token,
        isOverskilled,
      } = userDb
      ctx.session.user = {
        id: clickup_user_id,
        username: tg_username,
        isOverskilled,
        CU_Token: clickup_token,
      }
      ctx.session.isAuthUser = true
    }
    ctx.session.isAlreadyFilled = false
    await sendMessageStart(ctx)

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      await addTasksToCtx(ctx)
      startComposer.use(altModeComposer(ctx))
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

startComposer.action(Actions.START, async (ctx) => {
  try {
    ctx.session.states.current.menu_state = menu_states.MAIN
    await ctx.deleteMessage()
    await sendMessageStart(ctx)

    startComposer.use(async (ctx, next) => {
      ctx.session.isAlreadyFilled = false
      if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {
        await addTasksToCtx(ctx)
        startComposer.use(altModeComposer(ctx))
      }
      await next()
    })
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

startComposer.command(Actions.UPDATE, async (ctx) => {
  try {
    ctx.session.all_lists = []
    ctx.session.isAlreadyFilled = false
    if (ctx.session.isAuthUser) {
      await addTasksToCtx(ctx)
      // startComposer.use(altModeComposer(ctx))
      await ctx.deleteMessage()
    } else {
      await sendProses(ctx, ctx.i18n.t('noAccessError_message'))
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

startComposer.command(Actions.RESTART, async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.user.username === "Сергей Веденеев") {
      ctx.session.all_lists = []
      ctx.session.isAlreadyFilled = false
      process.exit()
    } else {
      await sendProses(ctx, ctx.i18n.t('noAccessError_message'))
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})
