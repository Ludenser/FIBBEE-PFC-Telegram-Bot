
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const _ = require('lodash');
const Clickup = require('../api');

/**
 * Функция установки Assignee текущего таска на пользователя
 * @param {String} userName - username для текущего пользователя, инициирующего action.
 * @param {String} task_id - ClickUp-Id текущего таска
 * @param {String} CU_Token - Токен Clickup для текущего пользователя, инициирующего action.
 */

module.exports = async (userName, task_id, CU_Token) => {

    const userIdMatch = _(supplyTeam_ids)
        .find(['username', userName])

    try {

        await new Clickup(CU_Token).Tasks.setAssignee(task_id, userIdMatch.id)

    } catch (error) {

        console.log(error)

    }


}