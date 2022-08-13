const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const { sendError, sendProses } = require('../utils/sendLoadings');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const convertTranslit = require('cyrillic-to-translit-js')
const chalk = require('chalk');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const _ = require('lodash');
const authUserFeature = require('../features/authUser.feature');
const totalSceneInitComposer = require('./totalSceneInit.composer');
const selectRouteComposer = require('./selectRoute.composer');

/**
  * Обработчик стартовых команд.
  * Добавление в контекст инфы о тасках из ClickUp
  */

const composer = new Composer();

const cyrillicToTranslit = new convertTranslit();

composer.start(async (ctx) => {

  ctx.session = null
  await ctx.deleteMessage()
  const userName = `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`
  ctx.session.userName = cyrillicToTranslit.transform(userName)

  ctx.session.isAuthUser = false
  await authUserFeature(ctx.session)

  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

  composer.use(async (ctx, next) => {

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
      await addTasksToCtx(ctx)
      console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
      composer.use(totalSceneInitComposer(ctx))
      composer.use(...selectRouteComposer(ctx))
    }
    await next()
  })

})

composer.action('start', async (ctx) => {
  ctx.session = null
  await ctx.deleteMessage()
  const userName = `${ctx.update.callback_query.from.first_name} ${ctx.update.callback_query.from.last_name}`
  ctx.session.userName = cyrillicToTranslit.transform(userName)

  ctx.session.isAuthUser = false
  await authUserFeature(ctx.session)

  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

  composer.use(async (ctx, next) => {

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
      await addTasksToCtx(ctx)
      console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
      composer.use(totalSceneInitComposer(ctx))
      composer.use(...selectRouteComposer(ctx))
    }
    await next()
  })

})

composer.on('text', async (ctx) => {
  await ctx.deleteMessage()
  await sendProses(ctx, 'Тут такое не приветствуется.')
})

module.exports = composer