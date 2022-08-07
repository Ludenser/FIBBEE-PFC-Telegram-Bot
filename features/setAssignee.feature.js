const { Task } = require('../api/clickUpApi.service');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const _ = require('lodash');

/**
 * Функция установки Assignee текущего таска на пользователя
 */

module.exports = async (userName, task_id) => {

    const userIdMatch = _(supplyTeam_ids)
        .find(['username', userName])

    try {

        await Task.setAssignee(task_id, userIdMatch.id)

    } catch (error) {

        console.log(error)

    }


}