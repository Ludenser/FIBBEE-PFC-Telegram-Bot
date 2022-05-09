const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    PostAttachmentsService = require('../api/clickupApiAttachments.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    sendMessageUazPhotoCheck = require('../routeMenu/sendMessageUazPhotoCheck.routeMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev'),
    axios = require('axios'),
    fs = require('fs');

const initStepRoute1 = new Composer()

initStepRoute1.on('photo', async (ctx) => {
    // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
    const files = ctx.update.message.photo
    const fileId = files[2].file_id
    let url = await ctx.telegram.getFileLink(fileId)
    url = url.href

    const response = await axios({ url, responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(`./test/download/${ctx.update.message.message_id}.jpg`))

        .on('finish', async () => {
            console.log(`Файл ${ctx.update.message.message_id}.jpg загружен`)
            await PostAttachmentsService.createTaskAttachment('2eaj9tf', ctx)
        })
        .on('error', e => ctx.reply(`Ошибка, ${e}`))
})

initStepRoute1.on('message', async (ctx) => {
    await sendMessageUazPhotoCheck(ctx)
})

initStepRoute1.action('point_1', async (ctx) => {
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 3)
    await deleteMessagePrev(ctx, 2)
    await deleteMessagePrev(ctx, 1)
    // return await ctx.wizard.next()
})

initStepRoute1.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await GetTasksService.setTaskStatus('2eaj9tf', 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = initStepRoute1