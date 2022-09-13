const _ = require('lodash');
const Clickup = require('../api');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
/**
  * Функция для поиска telegram username текущего пользователя в списке зарегистрированных пользователей из файла lib/supplyTeam_ids
  * @param {Ctx} ctx - объект контекста telegraf
  */
module.exports = async (ctx) => {
    const userIdMatch = _(supplyTeam_ids)
        .find(['username', ctx.session.userName])
    ctx.session.user = userIdMatch

    if (ctx.session.user) {
        if (ctx.startPayload) {
            const code = ctx.startPayload
            const token = new Clickup().Users.getToken(code)
            ctx.session.user.CU_Token = token
            const clickUpUser = new Clickup(ctx.session.user.CU_Token).Users.getUser_ByToken()
            ctx.session.user = { ...ctx.session.user, clickUpUser }
            ctx.session.isAuthUser = true
        }
    }
}