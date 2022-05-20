const { Composer, Scenes, session } = require('telegraf'),
  sendMessageStart = require('../keyboards/mainMenu/sendMessageStart'),
  getTasks = require('../api/clickupApiTasks.service'),
  fs = require('fs'),
  setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
  {
    listIdSupply,
    listIdCleaning
  } = setting,
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.start(async (ctx) => {
  composer.use(async (ctx, next) => {
    const all_tasksSupply = await getTasks.getAllTasks(listIdSupply)
    const all_tasksClean = await getTasks.getAllTasks(listIdCleaning)
    ctx.all_tasksSupply = all_tasksSupply.data.tasks
    ctx.all_tasksClean = all_tasksClean.data.tasks
    ctx.all_tasksSupply.forEach((element, i) => {
      if (element.name.includes('водителя' || 'оператора')) {
        ctx.primeTaskSupply_id = element.id
        const r = ctx.all_tasksSupply.splice(i, 1)
      }
    })
    ctx.all_tasksClean.forEach((element, i) => {
      if (element.name.includes('водителя' || 'оператора')) {
        ctx.primeTaskClean_id = element.id
        const r = ctx.all_tasksClean.splice(i, 1)
      }
    })
    await next()
  })
  try {
    await sendMessageStart(ctx)
  } catch (e) {
    await sendMessageError(ctx, e)
  }
})

composer.command('/start', (ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }
})

composer.action('start', (ctx) => {
  try {
    sendMessageStart(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer