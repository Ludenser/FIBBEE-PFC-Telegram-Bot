const PostAttachmentsService = require('../api/clickupApiAttachments.service')
const fs = require('fs')
const axios = require('axios')

module.exports = async (ctx, task_id) => {
    // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
    const files = ctx.update.message.photo
    const fileId = files[2].file_id
    let url = await ctx.telegram.getFileLink(fileId)
    url = url.href

    const response = await axios({ url, responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(`./test/download/${ctx.update.message.message_id}.jpg`))

        .on('finish', async () => {
            console.log(`Файл ${ctx.update.message.message_id}.jpg загружен`)
            await PostAttachmentsService.createTaskAttachment(ctx, task_id)
            fs.rmSync(`./test/download/${ctx.update.message.message_id}.jpg`, {
                force: true
            })
        })
        .on('error', e => ctx.reply(`Ошибка, ${e}`))
}