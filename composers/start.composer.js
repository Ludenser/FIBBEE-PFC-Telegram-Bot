const { Composer } = require('telegraf');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');
const { sendError } = require('../utils/sendLoadings');
const addTasksToCtx = require('../features/addTasksToCtx.feature');
const convertTranslit = require('cyrillic-to-translit-js')
const chalk = require('chalk');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const _ = require('lodash');

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
  ctx.session.isAuthUser = false
  const userIdMatch = _(supplyTeam_ids)
    .find(['username', ctx.session.userName])
  ctx.session.user = userIdMatch
  if (ctx.session.user) {
    ctx.session.isAuthUser = true
  }

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
  ctx.session = null
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }
})

module.exports = composer