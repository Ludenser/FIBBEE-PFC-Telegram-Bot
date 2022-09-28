const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./config/setting.json'));
const { team_id } = setting;
const list_ids = require('../config/list_idsFromClickUp');
const Clickup = require('../api');
const { sendError } = require('../utils/sendLoadings');
const chalk = require('chalk');
const { menu_states } = require('../config/otherSettings');


/**
  * Добавление в контекст объекта тасков из ClickUp.
  */

module.exports = async (ctx) => {

    try {
        console.log(chalk.whiteBright.bgRed('ctx.session is empty'))
        const ClickAPI = new Clickup(ctx.session.user.CU_Token)
        const all_tasks_any_status = await ClickAPI.Tasks.getTodayTasksWithAnyStatus(list_ids)
        const all_labels = await ClickAPI.Custom_fields.getAllCustomFields(list_ids[0])
        const all_existLabels = all_labels.fields.find(o => o.type === 'labels').type_config.options


        let allTasksWithoutSide = _(all_tasks_any_status.data.tasks)
            .filter(task => task.name.includes('Обслуживание') || task.name.includes('водителя') || task.name.includes('Пополнение'))
            .groupBy(task => task.list.id)
            .map((value, key) => ({ list_id: key, allTasksWithoutSide: value, }))
            .value();

        let driverTask = _(all_tasks_any_status.data.tasks)
            .reverse()
            .filter(task => task.name.includes('водителя'))
            .groupBy(task => task.list.id)
            .map((value, key) => (value[0].status.status.includes('in progress') ? { list_id: key, driverTask: value, isOpened: true, } : { list_id: key, driverTask: value }))
            .value();

        let tasksWithoutDriverTaskAndSide = _(all_tasks_any_status.data.tasks)
            .reject(task => {
                for (let elem of task.tags) {
                    return elem.name === 'side'
                }
            })
            .filter(task => !task.name.includes('водителя'))
            .groupBy(task => task.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutDriverTaskAndSide: value }))
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

        ctx.session.currentRouteNumber = ''
        ctx.session.all_lists = all_lists.filter(el => el.hasOwnProperty('driverTask'))
        ctx.session.all_existLabels = all_existLabels
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
        ctx.session.states = {}
        ctx.session.states.isTaskLast = false
        ctx.session.states.route_msg = {}
        ctx.session.states.route_msg.id = []
        ctx.session.states.route_msg.isDeleted = false
        ctx.session.states.attention_msg = {}
        ctx.session.states.attention_msg.id = []
        ctx.session.states.attention_msg.isDeleted = false
        ctx.session.states.current = {
            task: {},
            side_task: {},
            menu_state: '',
            list_id: '',
        }
        ctx.session.states.current.task.locationName = ''
        ctx.session.states.current.task.locationLabel = ''
        ctx.session.states.current.menu_state = menu_states.MAIN
        ctx.session.states.current.list_id = ''
        ctx.session.states.current.task.id = ''
        ctx.session.states.current.task.discordWebHook = ''
        ctx.session.states.current.side_task = {}
        ctx.session.states.current.side_task.id = ''
        ctx.session.states.current.side_task.ids = []
        ctx.session.states.current.side_task.name = ''
        console.log(chalk.blackBright.bgGreen('ctx.session was filled'))

    } catch (error) {
        await sendError(ctx, error)
        console.log(chalk.whiteBright.bgRed('ctx.session fill is incomplete!'))
    }

}