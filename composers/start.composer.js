const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const { sendError, sendProses } = require('../utils/sendLoadings');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const convertTranslit = require('cyrillic-to-translit-js')
const chalk = require('chalk');
const _ = require('lodash');
const authUserFeature = require('../features/authUser.feature');
const totalSceneInitComposer = require('./totalSceneInit.composer');
const selectRouteComposer = require('./selectRoute.composer');
const emptyStepScene = require('../scenes/emptyStep.scene');

/**
  * Обработчик стартовых команд.
  * Простая аутентификация пользователя. 
  * Если пройдена - добавление в контекст инфы о тасках из ClickUp. И добавление композера регистрации сцен.
  */

const composer = new Composer();

const cyrillicToTranslit = new convertTranslit();

composer.start(async (ctx) => {

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



  if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

    console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
    await addTasksToCtx(ctx)
    console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
    if (ctx.session.all_lists.length) {
      composer.use(totalSceneInitComposer(ctx))
      composer.use(...selectRouteComposer(ctx))
    }
  }

})



composer.action('start', async (ctx) => {

  await ctx.deleteMessage()

  await sendMessageStart(ctx)


  composer.use(async (ctx, next) => {

    if (!ctx.session.isAlreadyFilled && ctx.session.isAuthUser) {

      console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
      await addTasksToCtx(ctx)
      console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
      if (ctx.session.all_lists.length) {
        composer.use(totalSceneInitComposer(ctx))
        composer.use(...selectRouteComposer(ctx))
      }
    }
    await next()
  })

})

// composer.use(async (ctx, next) => {
//   if (ctx.session.all_lists) {
//     composer.use(totalSceneInitComposer(ctx))
//     composer.use(...selectRouteComposer(ctx))
//   }
//   await next()
// })

composer.command('update', async (ctx) => {

  ctx.session.all_lists = null
  ctx.session.isAlreadyFilled = false
  if (ctx.session.isAuthUser) {

    console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
    await addTasksToCtx(ctx)
    console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
    if (ctx.session.all_lists.length) {
      composer.use(totalSceneInitComposer(ctx))
      composer.use(...selectRouteComposer(ctx))
    }
    await ctx.deleteMessage()
  }
  await sendProses(ctx, 'Нет доступа')
})

composer.on('text', async (ctx) => {
  await ctx.deleteMessage()
  await sendProses(ctx, 'Тут такое не приветствуется.')
})

module.exports = composer