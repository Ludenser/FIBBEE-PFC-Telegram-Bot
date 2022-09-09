
const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { team_id } = setting;
const list_ids = require('../lib/list_idsFromClickUp');
const Clickup = require('../api');
const { sendError } = require('../utils/sendLoadings');


/**
  * Добавление в контекст объекта тасков из ClickUp.
  */

module.exports = async (ctx) => {

    try {
        const ClickAPI = new Clickup(ctx.session.user.CU_Token)
        const all_tasks_any_status = await ClickAPI.Tasks.getTodayTasksWithAnyStatus(list_ids)
        const all_labels = await ClickAPI.Custom_fields.getAllCustomFields(list_ids[0])
        const all_existLabels = all_labels.fields.find(o => o.type === 'labels').type_config.options

        let driverTask = _(all_tasks_any_status.data.tasks)
            .reverse()
            .filter(item => item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => (value[0].status.status.includes('in progress') ? { list_id: key, driverTask: value, isOpened: true, } : { list_id: key, driverTask: value }))
            .value();

        let allTasksWithoutSide = _(all_tasks_any_status.data.tasks)
            .filter(item => item.name.includes('Обслуживание') || item.name.includes('водителя') || item.name.includes('Пополнение'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, allTasksWithoutSide: value, }))
            .value();

        let tasksWithoutDriverTaskAndSide = _(all_tasks_any_status.data.tasks)
            .reject(item => {
                for (let elem of item.tags) {
                    return elem.name === 'side'
                }
            })
            .filter(item => !item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutDriverTaskAndSide: value }))
            .value();

        let sideTasks = _(all_tasks_any_status.data.tasks)
            .filter(item => {
                for (let elem of item.tags) {
                    return elem.name === 'side'
                }
            })
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, sideTasks: value, }))
            .value();


        let all_lists = allTasksWithoutSide.map((element, index) => {
            return Object.assign(
                {},
                sideTasks[index],
                allTasksWithoutSide[index],
                driverTask[index],
                tasksWithoutDriverTaskAndSide[index],


            )
        })
        console.log(all_lists);
        ctx.session.all_existLabels = all_existLabels
        ctx.session.all_lists = all_lists
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
        ctx.session.states = {}
        ctx.session.states.isTaskLast = false
        ctx.session.states.attention_msg_id = []
        ctx.session.states.attention_msg_isDeleted = false
        ctx.session.states.currentLocationName = ''
        ctx.session.states.currentLocationLabel = ''
        ctx.session.states.currentMenuState = 'main_menu'
        ctx.session.states.currentList_id = ''
        ctx.session.states.currentTask_id = ''
        ctx.session.states.currentTask_discordWebHook = ''
        ctx.session.states.currentSideTaskId = ''

    } catch (error) {
        await sendError(ctx, error)
    }

}