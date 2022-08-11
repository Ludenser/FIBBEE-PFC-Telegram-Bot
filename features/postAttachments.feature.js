const { Task } = require('../api/clickUpApi.service');
const axios = require('axios');
const { sendProses, sendError } = require('../utils/sendLoadings');
const sendMessagePhotoCheckRouteMenu = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const Clickup = require('../api');


/**
  * Функция для обработки отправляемых файлов в телеграме и отправке их в ClickUp
  * @param {Ctx} ctx - объект контекста telegraf
  * @param {String} task_id - ClickUp-Id of current task
  */

const postAttachments = async (ctx, task_id, CU_Token) => {
  const files = ctx.update.message.photo
  const fileId = files[2].file_id
  let url = await ctx.telegram.getFileLink(fileId)
  url = url.href

  const response = await axios({ url, responseType: 'stream' })

  await new Clickup(CU_Token).Tasks.createAttachment(ctx.update.message.message_id, task_id, response.data)
}

/**
  * Функция для обработки отправляемых файлов в телеграме и отправке их в ClickUp, с последующей отправкой сообщения после успешной загрузки.
  * @param {Ctx} ctx - объект контекста telegraf
  * @param {String} task_id - ClickUp-Id of current task
  * @param {String} scene - 'main' для сцены с контролем авто, 'complex' для сцены комплекса
  */

const postAttachmentsWithMessage = async (ctx, task_id, scene, CU_Token) => {

  await postAttachments(ctx, task_id, CU_Token)
  ctx.session.photoCounter++
  if (ctx.session.photoCounter === ctx.update.message.photo.length) {
    await sendProses(ctx, `Все ${ctx.session.photoCounter} фото успешно загружены.`)
    await sendMessagePhotoCheckRouteMenu(ctx, scene)
    ctx.session.photoCounter = 0
  }
}

module.exports = postAttachmentsWithMessage
