const _ = require('lodash');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
/**
  * Функция для поиска telegram username текущего пользователя в списке зарегистрированных пользователей из файла lib/supplyTeam_ids
  * @param {Array} session - массив с текущей сессией
  */
module.exports = async (session) => {
    const userIdMatch = _(supplyTeam_ids)
        .find(['username', session.userName])
    session.user = userIdMatch

    if (session.user) {
        if (ctx.hasOwnProperty('startPayload')) {
            session.user.CU_Token = ctx.startPayload
            session.isAuthUser = true
        }
    }
}