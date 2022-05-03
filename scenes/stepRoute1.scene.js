const { Composer } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../menu/sendMessageDriverMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev'),
    axios = require('axios'),
    fs = require('fs'),
    PostAttachmentsService = require('../api/clickupApiAttachments.service'),
    FormData = require('form-data');
require('dotenv').config();

const token = process.env.CLICKUP_TOKEN;
const form = new FormData()
const stepRoute1 = new Composer()

stepRoute1.on(['document', 'photo'], async (ctx) => {
    // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
    const files = ctx.update.message.photo
    fileId = files[3].file_id
    const headers = form.getHeaders();
    headers.authorization = token;
    await ctx.telegram.getFileLink(fileId).then(url => {
        url = url.href
        axios({ url, responseType: 'stream' }).then(async response => {

            await response.data.pipe(fs.createWriteStream(`./test/download/${ctx.update.message.message_id}.jpg`))

                .on('finish', () => {
                    console.log(`Файл ${ctx.update.message.message_id}.jpg успешно загружен`)
                    fs.rename(`./test/download/${ctx.update.message.message_id}.jpg`, './test/upload/attachment.jpg', err => {
                        if (err) throw err
                        console.log('Файл успешно перемещён')
                    })

                })
                .on('error', e => ctx.reply(`Ошибка, ${e}`))
        })
    })
    form.append('filename', `${ctx.update.message.message_id}.jpg`)
    form.append('attachment', fs.createReadStream(`./test/upload/attachment.jpg`))
    await PostAttachmentsService.createTaskAttachment('2bukvwe', form, headers)
    fs.rmSync(`./test/upload/attachment.jpg`, {
        force: true,
    });

})

stepRoute1.action('leaveScene', async (ctx) => {
    // await GetTimeService.stopTimeEntry(24409308)
    // await GetTasksService.setTaskStatus('2bukvwe', 'to do')
    await ctx.deleteMessage()
    await deleteMessagePrev(ctx, 1)
    await sendMessageDriverMenu(ctx)
    return await ctx.scene.leave()
})

module.exports = stepRoute1