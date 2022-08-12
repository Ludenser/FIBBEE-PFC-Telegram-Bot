
const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { team_id } = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation');
const list_ids = require('../lib/list_idsFromClickUp');
const supplyTeam_ids = require('../lib/supplyTeam_ids');
const Clickup = require('../api');
const { sendError } = require('../utils/sendLoadings');

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */

module.exports = async (ctx) => {
    console.log(ctx.session.user.CU_Token);

    try {
        const all_tasks_any_status = await new Clickup(ctx.session.user.CU_Token).Tasks.getTodayTasksWithAnyStatus(list_ids)

        let resultMain = _(all_tasks_any_status.data.tasks)
            .reverse()
            .filter(item => item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, mainTask: value }))
            .value();

        let result = _(all_tasks_any_status.data.tasks)
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, allTasks: value, }))
            .value();

        let resultWithoutMain = _(all_tasks_any_status.data.tasks)
            .filter(item => !item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutMain: value, }))
            .value();

        let all_result = result.map((element, index) => {
            return Object.assign({}, result[index], resultMain[index], resultWithoutMain[index])
        })

        ctx.session.all_lists = all_result
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
    } catch (error) {
        await sendError(ctx, error)
    }

}