const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev'),
    axios = require('axios'),
    fs = require('fs'),
    PostAttachmentsService = require('../api/clickupApiAttachments.service');


const stepRoute1 = new Composer()

stepRoute1.on(['document', 'photo'], async (ctx) => {
    // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
    const files = ctx.update.message.photo
    fileId = files[3].file_id
    await ctx.telegram.getFileLink(fileId).then(url => {
        url = url.href
        axios({ url, responseType: 'stream' }).then(response => {
            response.data.pipe(fs.createWriteStream(`./test/download/${ctx.update.message.message_id}.jpg`))
                .on('finish', () => ctx.reply('Загрузить еще?'))
                .on('error', e => ctx.reply(`Ошибка, ${e}`))

        })
    })
    // await PostAttachmentsService.createTaskAttachment('2bukvwe', urlHref, 'attachment')

})

stepRoute1.action('leaveScene', async (ctx) => {
    await GetTimeService.stopTimeEntry(24409308)
    await GetTasksService.setTaskStatus('2bukvwe', 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = stepRoute1