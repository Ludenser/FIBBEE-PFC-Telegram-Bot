require('dotenv').config();
const axios = require('axios');
const token = process.env.CLICKUP_TOKEN;
const fs = require('fs');
const FormData = require('form-data');
const settings = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { listId } = settings;

class Attachment {

    static async createTaskAttachment(ctx, task_id) {
        const form = new FormData();
        form.append('attachment', fs.createReadStream(`./test/download/${ctx.update.message.message_id}.jpg`))
        form.append('filename', `${ctx.update.message.message_id}.jpg`)

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/attachment`,
            data: form,
            headers: {
                'Authorization': token,
                'content-type': `multipart/form-data; boundary=${form.getBoundary()}`
            },
        })

            .then(() => console.log('Загружено в кликап!'))
            .catch((e) => console.log(e))

    };


    static async createCommentAttachment(ctx, task_id, user_id) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
            data: {
                'comment': [
                    {
                        'text': ctx.update.message.text,
                    }
                ],
                'assignee': user_id
            },
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => console.log('Коммент прикреплен к таску!'))
            .catch((e) => console.log(e))

    }

}

class Task {

    static async getAllTasks(list_id, archived = false, page) {
        const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/task`,
            {
                params: {
                    archived: archived,
                    page: page
                },
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    static async getAllTasksToArrFromList(list_id, archived = false, page) {
        const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/task`,
            {
                params: {
                    archived: archived,
                    page: page
                },
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        const newArr = response.data.tasks.reverse().map(value => {
            return value.id
        })
        return newArr
    }

    static async setTaskStatus(task_id, updatedStatus) {
        const response = await axios.put(`https://api.clickup.com/api/v2/task/${task_id}/`,
            {
                'status': updatedStatus
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

}

class Time {

    static async getTrackedTime(task_id) { //Получение информации о таймере в задаче
        const response = await axios.get(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    static async postTrackTime(task_id) { //Создание уже готового отслеженного времени, (сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
        const response = await axios.post(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
            {
                'time': 180000
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    static async createTimeEntry(team_id, task_id) {//Создание уже готового отслеженного времени, (сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/`,
            {
                "description": "from api",
                "start": Date.now(),
                "duration": 5,
                "tid": task_id
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    static async startTimeEntry(team_id, task_id) { //Запуск встроенного таймера в ClickUp
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/start/`,
            {
                "description": "from api",
                "tid": task_id
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    static async stopTimeEntry(team_id, task_id) { //Остановка встроенного таймера в ClickUp
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/stop`,
            {
                "description": "from api",
                "tid": task_id
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
}

class Users {

    static async getUsers_id() {
        const response = await axios.get(`https://api.clickup.com/api/v2/list/${listId}/member`,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }


}



module.exports = {
    Attachment,
    Task,
    Time,
    Users
}
