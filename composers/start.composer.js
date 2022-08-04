const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const sendMessageError = require('../utils/sendMessageError');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const chalk = require('chalk')

/**
  * Обработчик стартовых команд.
  * Добавление в контекст инфы о тасках из ClickUp
  */
const composer = new Composer();

composer.start(async (ctx) => {
  ctx.session = null
  composer.use(async (ctx, next) => {
    if (!ctx.session.isAlreadyFilled) {
      console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
      await addTasksToCtx(ctx)
      console.log(chalk.blackBright.bgGreen('ctx.session was filled'))
    }
    await next()
  })
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

composer.command('/start', async (ctx) => {
  try {
    ctx.session = null
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

composer.action('start', async (ctx) => {
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

module.exports = composer