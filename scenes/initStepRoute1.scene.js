const { Composer, Markup } = require('telegraf');
const { Task, Time } = require('../api/clickUpApi.service');

const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessagePhotoCheck = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const postAttachment = require('../features/postAttachments.feature');
const { sendError } = require('../utils/sendLoadings');

/**
  * Сцена инициализации назначенного роута.
  * 
  * Обработка фото рабочего автомобиля. Открытие роута.
  */
const initStepRoute1 = new Composer()

initStepRoute1.on('photo', async (ctx) => {
    await postAttachment(ctx, ctx.session.primeTask)
})

initStepRoute1.hears('Подтвердить загрузку фото✅', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessagePhotoCheck('main', ctx)
})

initStepRoute1.action('get_start', async (ctx) => {

    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 2)
    await deleteMessagePrev(ctx, 3)

    await ctx.reply('Приступить к обслуживанию первого комплекса? ',
        Markup.inlineKeyboard([
            Markup.button.callback('🔘 Нажми, чтобы начать 🔘', 'enter')
        ])
    )

    await ctx.scene.enter('ROUTE_1_WIZARD_ID')
})

initStepRoute1.action('leaveScene', async (ctx) => {
    try {

        await Time.stopEntry(ctx.team_id, ctx.session.primeTask)
        await Task.setStatus(ctx.session.primeTask, 'to do')

        await ctx.deleteMessage()
        await deleteMessagePrev(ctx, 2)
        await deleteMessagePrev(ctx, 3)
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    } catch (e) {
        await sendError(ctx, e)
        await sendMessageDriverMenu(ctx)
        await ctx.scene.leave()
    }

})

module.exports = initStepRoute1