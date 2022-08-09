const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const { sendError } = require('../utils/sendLoadings');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const convertTranslit = require('cyrillic-to-translit-js')
const chalk = require('chalk');

/**
  * Обработчик стартовых команд.
  * Добавление в контекст инфы о тасках из ClickUp
  */

const composer = new Composer();

const cyrillicToTranslit = new convertTranslit();

composer.start(async (ctx) => {
  ctx.session = null
  const userName = `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`
  ctx.session.userName = cyrillicToTranslit.transform(userName)
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

  composer.use(async (ctx, next) => {

    if (!ctx.session.isAlreadyFilled) {
      console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
      await addTasksToCtx(ctx)
      console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
    }
    await next()
  })

})

composer.command('/start', async (ctx) => {
  try {
    ctx.session = null
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }
})

composer.action('start', async (ctx) => {
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }
})

module.exports = composer