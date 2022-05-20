
const getTasks = require('../api/clickupApiTasks.service');
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning,
    team_id
} = setting;

module.exports = async (ctx) => {
    const all_tasksSupply = await getTasks.getAllTasks(listIdSupply)
    const all_tasksClean = await getTasks.getAllTasks(listIdCleaning)
    ctx.all_tasksSupply = all_tasksSupply.data.tasks
    ctx.all_tasksClean = all_tasksClean.data.tasks
    ctx.team_id = team_id

    ctx.all_tasksSupply.forEach((element, i) => {
        if (element.name.includes('водителя' || 'оператора')) {
            ctx.primeTaskSupply_id = element.id
            const r = ctx.all_tasksSupply.splice(i, 1)
        }
    })
    ctx.all_tasksClean.forEach((element, i) => {
        if (element.name.includes('водителя' || 'оператора')) {
            ctx.primeTaskClean_id = element.id
            const r = ctx.all_tasksClean.splice(i, 1)
        }
    })
}