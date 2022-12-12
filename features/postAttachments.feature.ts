import { SessionCtx } from '../global';

import axios from 'axios';
import { sendProses } from '../utils/sendLoadings';
import { Clickup } from '../api';
/**
  * Функция для обработки отправляемых файлов в телеграме и отправке их в ClickUp
  * @param {SessionCtx} ctx - объект контекста telegraf
  * @param {string} task_id - ClickUp-Id of current task
  */

export const postAttachments = async (ctx: SessionCtx, task_id: string) => {
  if ('message' in ctx.update && 'photo' in ctx.update.message) {
    const photos_arr = ctx.update.message.photo
    let photoId = ''
    photos_arr.length > 3 
      ? photoId = photos_arr[3].file_id 
      : photoId = photos_arr[2].file_id
    let uri = await ctx.telegram.getFileLink(photoId)
    let url = uri.href

    const response = await axios({ url, responseType: "stream" })
    const ClickAPI = new Clickup(ctx.session.user.CU_Token)
    await ClickAPI.Tasks.createAttachment(ctx.update.message.message_id, task_id, response.data)
      .then(async()=> await sendProses(ctx, `В таск ${task_id} успешно загружено фото.`))
      .catch(async()=> await sendProses(ctx, `Фото не загружено.`))
  }
}
