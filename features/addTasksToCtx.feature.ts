import { SessionCtx } from '../global';
import _ from 'lodash'
import { list_ids } from '../config/list_idsFromClickUp';
import { Clickup } from '../api';
import { sendError } from '../utils/sendLoadings';
import chalk from 'chalk';
import { menu_states } from '../config/otherSettings';
import { Settings } from '../config/setting';

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */


export const addTasksToCtx = async (ctx: SessionCtx) => {

    try {
        console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
        const ClickAPI = new Clickup(ctx.session.user.CU_Token)
        const all_tasks_any_status = await ClickAPI.Tasks.getTodayTasksWithAnyStatus(list_ids)

        let allTasksWithoutSide = _(all_tasks_any_status.data.tasks)
            .filter(task => task.name.includes('обслуживание'))
            .groupBy(task => task.list.id)
            .map((value, key) => ({ list_id: key, allTasksWithoutSide: value, }))
            .value();

        let sideTasks = _(all_tasks_any_status.data.tasks)
            .filter(task => {
                for (let elem of task.tags) {
                    return elem.name === 'side'
                }
            })
            .groupBy(task => task.list.id)
            .map((value, key) => ({ list_id: key, sideTasks: value, }))
            .value();
        if (!allTasksWithoutSide.length) {
            console.log(chalk.whiteBright.bgRed('allTasksWithoutSide не найден!'))
        }
        if (!allTasksWithoutSide.length || !allTasksWithoutSide.length) {
            console.log(chalk.whiteBright.bgRed('ctx.session fill is incomplete!'))
            return
        }

        let all_lists = allTasksWithoutSide.map((element, index) => {
            return Object.assign(
                {},
                sideTasks[index],
                allTasksWithoutSide[index],
            )
        })

        ctx.session.currentRouteNumber = null
        ctx.session.all_lists = all_lists
        ctx.session.team_id = Settings.TEAM_ID
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