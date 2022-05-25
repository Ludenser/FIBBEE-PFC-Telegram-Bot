const { Users, Task } = require('../api/clickUpApi.service');

/**
 * Функция установки назначения на пользователя
 */

module.exports = async (task_id) => {

    const response = await Users.getUser_ByToken()
    const user = response.data.user

    await Task.setAssignee(task_id, user.id)

}