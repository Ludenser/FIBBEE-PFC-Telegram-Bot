const { Composer } = require('telegraf');
const convertTranslit = require('cyrillic-to-translit-js')
const _ = require('lodash');
const sequelize = require('../../../db/index')
const userModel = require('../../../db/models');
const sendMessageStart = require('../keyboards/sendMessageStart.keyboard');
const { sendError, sendProses } = require('../../../utils/sendLoadings');
const { addTasksToCtx } = require('../../../features/addTasksToCtx.feature');
const authUserFeature = require('../../../features/authUser.feature');
const totalSceneInitComposer = require('./totalSceneInit.composer');
const selectRouteComposer = require('./selectRoute.composer');
const globalPhotoHandler = require('../handlers/photo.handler');
const globalTextHandler = require('../handlers/text.handler');
const altModeComposer = require('../../AltMode/composers/altMode.composer');
const { menu_states } = require('../../../config/otherSettings');
const { startComposerActions: Actions } = require('../actions');

/**
  * Обработчик стартовых команд.
  * Простая аутентификация пользователя. 
  * Если пройдена - добавление в контекст инфы о тасках из ClickUp. И добавление композера регистрации сцен.
  */

const startComposer = new Composer();

const cyrillicToTranslit = new convertTranslit();

startComposer.start(async (ctx) => {
  try {

    await ctx.deleteMessage()
    await sequelize.authenticate()
    await sequelize.sync()
    startComposer.use(globalPhotoHandler())
    startComposer.use(globalTextHandler())


    const userName = `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`
    ctx.session.userName = cyrillicToTranslit.transform(userName)
    ctx.session.isAuthUser = false
    const userDb = await userModel.findOne({ where: { tg_username: userName } })
    console.log(userDb);
    if (!userDb) {
      await authUserFeature(ctx)
    } else {
      const { clickup_user_id, tg_username, clickup_token } = userDb
      ctx.session.user = {
        id: clickup_user_id,
        username: tg_username,
        CU_Token: clickup_token
      }
      ctx.session.isAuthUser = true
    }

    await sendMessageStart(ctx)

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      await addTasksToCtx(ctx)
      startComposer.use(altModeComposer(ctx))
      startComposer.use(totalSceneInitComposer(ctx))
      startComposer.use(...selectRouteComposer(ctx))
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
      if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {
        await addTasksToCtx(ctx)
        startComposer.use(altModeComposer(ctx))
        startComposer.use(totalSceneInitComposer(ctx))
        startComposer.use(...selectRouteComposer(ctx))
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
      startComposer.use(altModeComposer(ctx))
      startComposer.use(totalSceneInitComposer(ctx))
      startComposer.use(...selectRouteComposer(ctx))
      await ctx.deleteMessage()
    } else {
      await sendProses(ctx, ctx.i18n.t('noAccessError_message'))
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

module.exports = startComposer