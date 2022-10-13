import { SessionCtx } from '../global'

/**
  * Обработка ошибки и отправка сообщения об ошибке с последующим удалением сообщения об ошибке.
  */
export const sendError = async function sendError(ctx: SessionCtx, e: Error) {
  console.log(e)
  await ctx.reply(ctx.i18n.t('error_message'))
    .then((result) => {
      setTimeout(() => {
        ctx.deleteMessage(result.message_id)
      }, 10 * 500)
    })
}

/**
  * Отправка сообщения с его последующим удалением.
  */
export const sendProses = async function sendProses(ctx: SessionCtx, str: string) {
  await ctx.reply(str)
    .then((result) => {
      setTimeout(() => {
        ctx.deleteMessage(result.message_id)
      }, 10 * 500)
    })
    .catch(e => console.log(e))
}

/**
  * Отправка сообщения о загрузке данных.
  */
export const sendLoading = async function sendLoading(ctx: SessionCtx) {
  let botReply = "Подожди, идет загрузка..."
  await ctx.reply(botReply)
    .then((result) => {
      setTimeout(() => {
        ctx.deleteMessage(result.message_id)
      }, 10 * 1000)
    })
    .catch(e => console.log(e))
}

