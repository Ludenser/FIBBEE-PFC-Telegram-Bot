import { Clickup } from '../api';

/**
 * Функция установки Assignee текущего таска на пользователя
 * @param {number} clickUp_id - объект контекста telegraf
 * @param {string} task_id - ClickUp-Id текущего таска
 * @param {string} CU_Token - Токен Clickup для текущего пользователя, инициирующего action.
 */
export default async (clickUp_id: number,task_id: string, CU_Token: string) => {

    try {
        await new Clickup(CU_Token).Tasks.setAssignee(task_id, clickUp_id)
    } catch (error) {
        console.log(error)
    }
}