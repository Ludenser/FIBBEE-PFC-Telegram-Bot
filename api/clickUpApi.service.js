require('dotenv').config();
const axios = require('axios');
const token = process.env.CLICKUP_TOKEN;
const fs = require('fs');
const FormData = require('form-data');
const settings = JSON.parse(fs.readFileSync('./lib/setting.json'));
const qs = require('qs');
const dueTime = require('../utils/timePeriodDate')
const { team_id } = settings;


/**
    * Взаимодействия с тасками
    */
class Task {
    /**
        * Получение Object[ ] всех тасков в таск-листе со статусом 'to do' и 'in progress', в диапазоне времени от "3 часов до текущего времени" и "20 часов после текущего времени.
        * @param {String[]} list_ids - ClickUp-Ids of current task-list
        */
    static async getTodayTasksWithAnyStatus(list_ids) {

        const response = await axios.get(`https://api.clickup.com/api/v2/team/${team_id}/task`,
            {
                params: {
                    statuses: ['to do', 'in progress'],
                    list_ids,
                    order_by: 'due_date',
                    due_date_gt: dueTime(-3),
                    due_date_lt: dueTime(20)
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                },
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    /**
        * Получение Object[ ] всех тасков в таск-листе только со статусом 'to do', в диапазоне времени от "3 часов до текущего времени" и "20 часов после текущего времени".
        * @param {String[]} list_ids - ClickUp-Ids of current task-list
        */
    static async getTodayTasksWithStatusTodo(list_ids) {

        const response = await axios.get(`https://api.clickup.com/api/v2/team/${team_id}/task`,
            {
                params: {
                    statuses: ['to do'],
                    list_ids,
                    order_by: 'due_date',
                    due_date_gt: dueTime(-3),
                    due_date_lt: dueTime(20)
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
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
        * @param {String} task_id ClickUp-Id of current task
        * @param {String} updatedStatus Status to be set for the current task. ('to do', 'in progress', 'done', etc.)
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
        * @param {String} task_id ClickUp-Id of current task
        * @param {Number} user_id ClickUp-Id of current user
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

    /**
        * Создание комментария в таске
        * @param {String} message_text text from telegram.update.message
        * @param {String} task_id ClickUp-Id of current task
        */
    static async createComment(message_text, task_id) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
            data: {
                'comment': [
                    {
                        'text': message_text,
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
    /**
        * Создание комментария в таске c тегом юзера.
        * @param {String} message_text text from .update.message
        * @param {String} task_id - ClickUp-Id of current task
        * @param {Number} user_id - ClickUp-Id of user to be tagged
        */
    static async createCommentWithAssignee(message_text, task_id, user_id) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
            data: {
                'comment': [
                    {
                        'text': message_text,
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

    };

    /**
        * Создание аттачмента в таске
        * @param {String} message_id telegram message id from .update.message.message_id
        * @param {String} task_id ClickUp-Id of current task
        * @param {ReadableStream} stream - Readable stream from telegram getFileLink() or same type from other source.
        */
    static async createAttachment(message_id, task_id, stream) {
        const form = new FormData();
        form.append('attachment', stream)
        form.append('filename', `${message_id}.jpg`)

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
       * Получение чеклиста
       * @param {String} checklist_id - task's checklist ClickUp-uuid
       */
    static async getCheckList(checklist_id) {

        const response = await axios({
            method: 'put',
            url: `https://api.clickup.com/api/v2/checklist/${checklist_id}`,
            data:
            {
                'position': 0
            }
            ,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
        return response
    };

    /**
       * Отметка элемента чек-листа решенным(по-дефолту)/нерешенным
       * @param {String} checklist_item_id - String
       * @param {Boolean} resolved - ( Default is 'true')
       */
    static async resolveCheckListItem(checklist_item_id, resolved = true) {

        const response = await axios({
            method: 'put',
            url: `https://api.clickup.com/api/v2/checklist/checklist_id/checklist_item/${checklist_item_id}`,
            data:
            {
                resolved
            }
            ,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
        return response
    };



}

/**
    * Взаимодействия с таймером
    */
class Time {

    /**
        * Получение информации о таймере в задаче
        * @param {String} task_id ClickUp-Id of current task
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
        * @param {String} task_id ClickUp-Id of current task
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
        * @param {String} task_id ClickUp-Id of current task
        */
    static async createEntry(task_id) {  //(сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
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
        * @param {String} task_id - ClickUp-Id from current task
        */
    static async startEntry(task_id) {
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
        * @param {String} task_id - ClickUp-Id of current task
        * @param {EpochTimeStamp} unix_time - UNIX-time, required by ClickUp API 
        */
    static async updateEntry(task_id, unix_time) {


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
        * @param {String} task_id - ClickUp-Id of current task
        */
    static async stopEntry(task_id) {

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
        * Получение объекта юзера, аутентифицированного под текущим ClickUp токеном
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
        * Получение объекта всех юзеров, имеющих доступ к указанному таск-листу "по умолчанию"
        * @param {String} list_id - ClickUp-Id of current task-list
        */
    static async getUsers_id(list_id) {
        const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/member`,
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
    Task,
    Time,
    Users
}
