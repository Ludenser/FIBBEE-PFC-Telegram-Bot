
const axios = require('axios');
const { sendProses, sendError } = require('../utils/sendLoadings');
const Clickup = require('../api');


/**
  * Функция для обработки отправляемых файлов в телеграме и отправке их в ClickUp
  * @param {Ctx} ctx - объект контекста telegraf
  * @param {String} task_id - ClickUp-Id of current task
  */

const postAttachments = async (ctx, task_id) => {
  const photos_arr = ctx.update.message.photo
  let photoId = ''
  photos_arr.length > 3 ? photoId = photos_arr[3].file_id : photoId = photos_arr[2].file_id
  let url = await ctx.telegram.getFileLink(photoId)
  url = url.href

  const response = await axios({ url, responseType: 'stream' })
  const ClickAPI = new Clickup(ctx.session.user.CU_Token)
  await ClickAPI.Tasks.createAttachment(ctx.update.message.message_id, task_id, response.data)
}

/**
  * Функция для обработки отправляемых файлов в телеграме и отправке их в ClickUp, с последующей отправкой сообщения после успешной загрузки.
  * @param {Ctx} ctx - объект контекста telegraf
  * @param {String} task_id - ClickUp-Id of current task
  */

const postAttachmentsWithMessage = async (ctx, task_id) => {

  await postAttachments(ctx, task_id)

  ctx.session.photoCounter++
  if (ctx.session.photoCounter === ctx.update.message.photo.length) {
    await sendProses(ctx, ctx.i18n.t('successPhotoUpload_message'))
    ctx.session.photoCounter = 0
  }
}

module.exports = {
  postAttachments,
  postAttachmentsWithMessage
}
