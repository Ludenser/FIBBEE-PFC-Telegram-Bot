require('dotenv').config();
const axios = require('axios')

const token = process.env.CLICKUP_TOKEN;

class GetTimeService {

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

    static async stopTimeEntry(team_id) { //Остановка встроенного таймера в ClickUp
        const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/stop`,
            {
                "description": "from api",
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



module.exports = GetTimeService
