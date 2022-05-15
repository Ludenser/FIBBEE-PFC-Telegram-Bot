module.exports = (ctx, e) => {
  console.log(e)
  return ctx.reply(`Ошибка! Сообщите об этом в чате supply-team, ${e}`)
}