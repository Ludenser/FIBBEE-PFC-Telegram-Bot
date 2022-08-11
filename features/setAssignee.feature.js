
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const _ = require('lodash');
const Clickup = require('../api');

/**
 * Функция установки Assignee текущего таска на пользователя
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