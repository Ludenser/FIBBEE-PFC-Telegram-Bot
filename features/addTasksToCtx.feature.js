
const { Task } = require('../api/clickUpApi.service');
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning,
    team_id
} = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation');
const { sendProses } = require('../utils/sendLoadings');

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */
module.exports = async (ctx) => {

    const all_tasksSupply = await Task.getTodayTasksWithStatusTodo(listIdSupply)
    const all_tasksClean = await Task.getTodayTasksWithStatusTodo(listIdCleaning)

    if (!all_tasksSupply.data.tasks.length && all_tasksClean.data.tasks.length) {

        console.log(chalk.blueBright('Лист taskSupply пустой, а taskClean-нет, вместо taskSupply добавлена заглушка'))

        ctx.all_tasksSupply = simulation
        ctx.team_id = team_id
        ctx.all_tasksClean = all_tasksClean.data.tasks

        ctx.all_tasksSupply.forEach((element, i) => {
            if (element.id.includes('sim_Main')) {
                ctx.primeTaskSupply_id = element.id
                ctx.all_tasksSupply.splice(i, 1)
            }
        })


        ctx.all_tasksClean.forEach((element, i) => {
            if (element.name.includes('водителя' || 'оператора')) {
                ctx.primeTaskClean_id = element.id
            }
        })

        ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    } else if (!all_tasksClean.data.tasks.length && all_tasksSupply.data.tasks.length) {

        console.log(chalk.blueBright('Лист taskClean пустой, а taskSupply-нет, вместо taskClean добавлена заглушка '))

        ctx.all_tasksClean = simulation
        ctx.team_id = team_id

        ctx.all_tasksClean.forEach((element, i) => {
            if (element.id.includes('sim_Main')) {
                ctx.primeTaskClean_id = element.id
                ctx.all_tasksClean.splice(i, 1)
            }
        })
        ctx.all_tasksSupply.forEach((element, i) => {
            if (element.name.includes('водителя' || 'оператора')) {
                ctx.primeTaskSupply_id = element.id
            }
        })

        ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    } else if (!all_tasksClean.data.tasks.length && !all_tasksSupply.data.tasks.length) {
        console.log(chalk.blueBright('Оба листа пусты, вместо них добавлена заглушка'))

        ctx.all_tasksSupply = simulation
        ctx.all_tasksClean = simulation
        ctx.team_id = team_id

        ctx.all_tasksSupply.forEach((element, i) => {
            if (element.id.includes('sim_Main')) {
                ctx.primeTaskSupply_id = element.id
                ctx.all_tasksSupply.splice(i, 1)
            }
        })
        ctx.all_tasksClean.forEach((element, i) => {
            if (element.id.includes('sim_Main')) {
                ctx.primeTaskClean_id = element.id
                ctx.all_tasksClean.splice(i, 1)
            }
        })

    } else {
        ctx.all_tasksSupply = all_tasksSupply.data.tasks
        ctx.all_tasksClean = all_tasksClean.data.tasks
        ctx.team_id = team_id

        ctx.all_tasksSupply.forEach((element, i) => {
            if (element.name.includes('водителя' || 'оператора')) {
                ctx.primeTaskSupply_id = element.id
            }
        })

        ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

        ctx.all_tasksClean.forEach((element, i) => {
            if (element.name.includes('водителя' || 'оператора')) {
                ctx.primeTaskClean_id = element.id
            }
        })

        ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    }
}

