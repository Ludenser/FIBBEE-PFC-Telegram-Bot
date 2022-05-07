const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev'),
    axios = require('axios'),
    fs = require('fs'),
    PostAttachmentsService = require('../api/clickupApiAttachments.service'),
    FormData = require('form-data'),
    path = require('path');

const stepRoute1 = new Composer()

stepRoute1.on('photo', async (ctx) => {
    // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
    const files = ctx.update.message.photo
    fileId = files[3].file_id
    let url = await ctx.telegram.getFileLink(fileId)
    url = url.href

    const response = await axios({ url, responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(`./test/download/${ctx.update.message.message_id}.jpg`))

        .on('finish', async () => {
            console.log(`Файл ${ctx.update.message.message_id}.jpg загружен`)
            PostAttachmentsService.createTaskAttachment('2eaj9tf', ctx)
        })
        .on('error', e => ctx.reply(`Ошибка, ${e}`))

})

stepRoute1.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await GetTasksService.setTaskStatus('2eaj9tf', 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = stepRoute1