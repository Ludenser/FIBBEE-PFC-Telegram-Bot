const { Composer } = require('telegraf');
const { Task, Time } = require('../api/clickUpApi.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessagePhotoCheck = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const postAttachment = require('../features/postAttachments.feature');

const initStepRoute2 = new Composer()

initStepRoute2.on('photo', async (ctx) => {
    await postAttachment(ctx, ctx.primeTaskClean_id)
})

initStepRoute2.hears('Подтвердить загрузку фото✅', async (ctx) => {
    await ctx.deleteMessage()
    await sendMessagePhotoCheck('main', ctx)
})

initStepRoute2.action('get_start', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.reply('Приступить к',
        Markup.inlineKeyboard([
            Markup.button.callback('обслуживанию первого комплекса', 'enter')
        ])
    )
    await ctx.scene.enter('POINTS_CLEAN_WIZARD_ID')
})

initStepRoute2.action('leaveScene', async (ctx) => {
    await Time.stopTimeEntry(ctx.team_id, ctx.primeTaskClean_id)
    await Task.setTaskStatus(ctx.primeTaskClean_id, 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    ctx.state = {}
    return await ctx.scene.leave()


})

module.exports = initStepRoute2