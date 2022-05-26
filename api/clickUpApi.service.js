require('dotenv').config();
const axios = require('axios');
const token = process.env.CLICKUP_TOKEN;
const fs = require('fs');
const FormData = require('form-data');
const settings = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { listId } = settings;

/**
    * Взаимодействия с аттачментами в тасках
    */
class Attachment {

    /**
        * Создание аттачмента в таске
        */
    static async createAttachment(ctx, task_id) {
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

    /**
        * Создание комментария в таске
        */
    static async createComment(ctx, task_id) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
            data: {
                'comment': [
                    {
                        'text': ctx.update.message.text,
                    }
                ]
            },
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => console.log('Коммент прикреплен к таску!'))
            .catch((e) => console.log(e))

    }

    static async createCommentWithAssignee(ctx, task_id, user_id) {

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
/**
    * Взаимодействия с тасками
    */
class Task {

    /**
        * Получение списка всех тасков в таск-листе
        */
    static async getAll(list_id, archived = false, page) {
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

    /**
        * Установка статуса таску
        */
    static async setStatus(task_id, updatedStatus) {
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

    /**
        * Назначение юзера к таску
        */
    static async setAssignee(task_id, user_id) {
        const response = await axios.put(`https://api.clickup.com/api/v2/task/${task_id}/`,
            {
                'assignees': {
                    'add': [
                        user_id
                    ]
                }
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

/**
    * Взаимодействия с таймером
    */
class Time {

    /**
        * Получение информации о таймере в задаче
        */
    static async getTrackedTime(task_id) {
        const response = await axios.get(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    /**
        * Создание уже готового отслеженного времени
        */
    static async postTrackTime(task_id) {
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

    /**
        * Создание уже готового отслеженного времени
        */
    static async createEntry(team_id, task_id) {  //(сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/`,
            {
                "description": "received from Bot",
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

    /**
        * Запуск встроенного таймера в ClickUp
        */
    static async startEntry(team_id, task_id) {
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/start/`,
            {
                "description": "received from Bot",
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

    /**
        * Обновление встроенного таймера в ClickUp
        */
    static async updateEntry(team_id, task_id, unix_time) {


        const response = await axios.put(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/${timer_id}/`,
            {
                "end": unix_time,
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

    /**
        * Остановка встроенного таймера в ClickUp
        */
    static async stopEntry(team_id, task_id) {

        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/stop`,
            {
                "description": "received from Bot",
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

/**
    * Взаимодействия с юзерами
    */
class Users {

    /**
        * Получение объекта юзера, аутентифицированного под текущим токеном
        */
    static async getUser_ByToken() {
        const response = await axios.get('https://api.clickup.com/api/v2/user',
            {
                headers: {
                    'Authorization': token
                }
            })
        return response
    }

    /**
        * Получение объекта всех юзеров, имеющих доступ к таск-листу "по умолчанию"
        * 
        * @listId берется из settings
        */
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
