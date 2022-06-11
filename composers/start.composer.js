const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const sendMessageError = require('../utils/sendMessageError');
const addTasksToCtx = require('../features/addTasksToCtx.feature');

/**
  * Обработчик стартовых команд.
  * Добавление в контекст инфы о тасках из ClickUp
  */
const composer = new Composer();

composer.start(async (ctx) => {

  composer.use(async (ctx, next) => {
    await addTasksToCtx(ctx)
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
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

composer.action(['start', 'exit'], async (ctx) => {
  composer.use(async (ctx, next) => {
    await addTasksToCtx(ctx)
    await next()
  })
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

module.exports = composer