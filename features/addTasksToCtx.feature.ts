import { SessionCtx, Task } from '../global';

import _ from 'lodash'
import fs from 'fs';
import { list_ids } from '../config/list_idsFromClickUp';
import { Clickup } from '../api';
import { sendError } from '../utils/sendLoadings';
import chalk from 'chalk';
import { menu_states } from '../config/otherSettings';

const setting = JSON.parse(fs.readFileSync('./config/setting.json', 'utf-8'));
const { team_id } = setting;

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */


export const addTasksToCtx = async (ctx: SessionCtx) => {

    try {
        console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
        const ClickAPI = new Clickup(ctx.session?.user?.CU_Token)
        const all_tasks_any_status = await ClickAPI.Tasks.getTodayTasksWithAnyStatus(list_ids)

        let allTasksWithoutSide = _<Task>(all_tasks_any_status.data.tasks)
            .filter((task) => task.name.includes('Обслуживание') || task.name.includes('водителя') || task.name.includes('Пополнение'))
            .groupBy((task) => task.list.id)
            .map((value, key) => ({ list_id: key, allTasksWithoutSide: value, }))
            .value();

        let driverTask = _<Task>(all_tasks_any_status.data.tasks)
            .reverse()
            .filter((task) => task.name.includes('водителя'))
            .groupBy((task) => task.list.id)
            .map((value, key) => (value[0].status.status.includes('in progress') ? { list_id: key, driverTask: value, isOpened: true, } : { list_id: key, driverTask: value }))
            .value();

        let tasksWithoutDriverTaskAndSide = _(all_tasks_any_status.data.tasks)
            .reject((task) => {
                for (let elem of task.tags) {
                    return elem.name === 'side' ? true : false
                }
            })
            .filter((task) => !task.name.includes('водителя'))
            .groupBy((task) => task.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutDriverTaskAndSide: value }))
            .value();

        let sideTasks = _(all_tasks_any_status.data.tasks)
            .filter((task) => {
                for (let elem of task.tags) {
                    return elem.name === 'side'
                }
            })
            .groupBy((task) => task.list.id)
            .map((value, key) => ({ list_id: key, sideTasks: value, }))
            .value();
        if (!driverTask || !tasksWithoutDriverTaskAndSide) {
            console.log(chalk.whiteBright.bgRed('ctx.session fill is incomplete!'))
        }

        let all_lists = allTasksWithoutSide.map((element, index) => {
            return Object.assign(
                {},
                sideTasks[index],
                driverTask[index],
                tasksWithoutDriverTaskAndSide[index],
            )
        })
        ctx.session.currentRouteNumber = 0
        ctx.session.all_lists = all_lists.filter((el: { hasOwnProperty: (arg0: string) => any; }) => el.hasOwnProperty('driverTask'))
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
        ctx.session.states = {}
        ctx.session.states.route_msg = {
            id: [],
            isDeleted: false,
        }
        ctx.session.states.attention_msg = {
            id: [],
            isDeleted: false,
        }
        ctx.session.states.current = {
            task: {},
            side_task: {},
            menu_state: menu_states.MAIN,
            list_id: '',
        }
        ctx.session.states.isTaskLast = false
        ctx.session.states.current.task = {
            locationName: '',
            locationLabel: '',
            id: '',
            discordWebHook: '',
        }

        ctx.session.states.current.side_task = {
            id: '',
            ids: [],
            name: '',
        }

        console.log(chalk.blackBright.bgGreen('ctx.session was filled'))

    } catch (error) {
        await sendError(ctx, error)
        console.log(chalk.whiteBright.bgRed('ctx.session fill is incomplete!'))
    }

}