const { Composer } = require('telegraf');
const sequelize = require('../db/index')
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const { sendError, sendProses } = require('../utils/sendLoadings');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const convertTranslit = require('cyrillic-to-translit-js')
const _ = require('lodash');
const authUserFeature = require('../features/authUser.feature');
const totalSceneInitComposer = require('./totalSceneInit.composer');
const selectRouteComposer = require('./selectRoute.composer');
const globalPhotoHandler = require('./handlers/photo.handler');
const globalTextHandler = require('./handlers/text.handler');
const userModel = require('../db/models');
const { where } = require('../db/index');

const START = 'start'
const UPDATE = 'update'

/**
  * Обработчик стартовых команд.
  * Простая аутентификация пользователя. 
  * Если пройдена - добавление в контекст инфы о тасках из ClickUp. И добавление композера регистрации сцен.
  */

const composer = new Composer();

const cyrillicToTranslit = new convertTranslit();

composer.start(async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sequelize.authenticate()
    await sequelize.sync()
    composer.use(globalPhotoHandler())
    composer.use(globalTextHandler())

    const userName = `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`
    ctx.session.userName = cyrillicToTranslit.transform(userName)
    ctx.session.isAuthUser = false
    const userId = await userModel.findOne({ where: { tg_username: userName } })
    console.log(userId);
    if (!userId) {
      await authUserFeature(ctx)
    } else {
      ctx.session.user = {
        id: userId.clickup_user_id,
        username: userId.tg_username,
        CU_Token: userId.clickup_token
      }
      ctx.session.isAuthUser = true
    }

    await sendMessageStart(ctx)

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      await addTasksToCtx(ctx)
      ctx.session.all_lists.forEach(el => {
        if (Object.hasOwn(el, 'driverTask') && Object.hasOwn(el, 'tasksWithoutDriverTaskAndSide')) {
          composer.use(totalSceneInitComposer(ctx))
          composer.use(...selectRouteComposer(ctx))
        }
      })
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

composer.action(START, async (ctx) => {
  try {
    ctx.session.states.currentMenuState = 'main_menu'
    await ctx.deleteMessage()
    await sendMessageStart(ctx)

    composer.use(async (ctx, next) => {
      if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {
        await addTasksToCtx(ctx)
        ctx.session.all_lists.forEach(el => {
          if (Object.hasOwn(el, 'driverTask') && Object.hasOwn(el, 'tasksWithoutDriverTaskAndSide')) {
            composer.use(totalSceneInitComposer(ctx))
            composer.use(...selectRouteComposer(ctx))
          }
        })
      }
      await next()
    })
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

composer.command(UPDATE, async (ctx) => {
  try {
    ctx.session.all_lists = []
    ctx.session.isAlreadyFilled = false
    if (ctx.session.isAuthUser) {
      await addTasksToCtx(ctx)
      ctx.session.all_lists.forEach(el => {
        if (Object.hasOwn(el, 'driverTask') && Object.hasOwn(el, 'tasksWithoutDriverTaskAndSide')) {
          composer.use(totalSceneInitComposer(ctx))
          composer.use(...selectRouteComposer(ctx))
        }
      })
      await ctx.deleteMessage()
    } else {
      await sendProses(ctx, ctx.i18n.t('noAccessError_message'))
    }
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
})

module.exports = composer