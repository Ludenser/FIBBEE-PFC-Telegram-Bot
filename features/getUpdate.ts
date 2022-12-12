import { result } from 'lodash';
import { Clickup } from '../api';

export class getUpdate {

    clickup_token: string;
    list_id: string|string[];

    constructor(clickup_token: string, list_id: string|string[]) {
        this.clickup_token = clickup_token
        this.list_id = list_id
    }

    async tasksWithoutDriverAndSide() {
        const ClickAPI = new Clickup(this.clickup_token)
        const { data } = await ClickAPI.Tasks.getTodayTasksWithStatusTodo(this.list_id)
        data.tasks
            .filter(task => task.list.id === this.list_id)
            .filter(task => task.name.includes('Обслуживание')
                || task.name.includes('Пополнение')
            )
        return result;
    }
}
