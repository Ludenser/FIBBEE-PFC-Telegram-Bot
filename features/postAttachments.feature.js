const { Attachment } = require('../api/clickUpApi.service')
const axios = require('axios')

/**
  * Функция для обработки отправляемых файлов в телеграме и и отправке их в ClickUp
  */
module.exports = async (ctx, task_id) => {
  // Берем здесь фотки из сообщения и отправляем в кликап в текущий таск
  const files = ctx.update.message.photo
  const fileId = files[2].file_id
  let url = await ctx.telegram.getFileLink(fileId)
  url = url.href

  const response = await axios({ url, responseType: 'stream' })

  await Attachment.createAttachment(ctx.update.message.message_id, task_id, response.data)

}