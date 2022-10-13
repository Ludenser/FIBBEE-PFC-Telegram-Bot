
import supplyTeam_ids from '../config/supplyTeam_ids';
import _ from 'lodash';
import { Clickup } from '../api';

/**
 * Функция установки Assignee текущего таска на пользователя
 * @param {string} userName - username для текущего пользователя, инициирующего action.
 * @param {string} task_id - ClickUp-Id текущего таска
 * @param {string} CU_Token - Токен Clickup для текущего пользователя, инициирующего action.
 */

export default async (userName: string, task_id: string, CU_Token: string) => {

    const userIdMatch = _(supplyTeam_ids)
        .find(['username', userName])
    try {
        await new Clickup(CU_Token).Tasks.setAssignee(task_id, userIdMatch.id)
    } catch (error) {
        console.log(error)
    }
}