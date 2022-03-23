module.exports = {
  sendSearch: function sendSearch(ctx, bot) {
    let botReply = "Подождите, идет поиск..."
    bot.telegram.sendMessage(ctx.chat.id, botReply)
      .then((result) => {
        setTimeout(() => {
          bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 250)
      })
      .catch(err => console.log(err))
  },
  sendProses: function sendProses(ctx, bot) {
    let botReply = "Подождите, в процессе"
    bot.telegram.sendMessage(ctx.chat.id, botReply)
      .then((result) => {
        setTimeout(() => {
          bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 500)
      })
      .catch(err => console.log(err))
  },
  sendLoading: function sendLoading(ctx, bot) {
    let botReply = "Подождите, данные загружаются..."
    composer.telegram.sendMessage(ctx.chat.id, botReply)
      .then((result) => {
        setTimeout(() => {
          bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)
      })
      .catch(err => console.log(err))
  }

}