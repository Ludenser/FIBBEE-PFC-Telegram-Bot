const _ = require('lodash');
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
            ctx.session.user.CU_Token = ctx.startPayload
            ctx.session.isAuthUser = true
        }
    }
}