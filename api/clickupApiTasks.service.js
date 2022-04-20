require('dotenv').config();
const axios = require('axios')

const token = process.env.CLICKUP_TOKEN;

class GetTasksService { // Получение всех тасков в листе по ID листа
    static async getAllTasksFromList(list_id, archived = false, page) {
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



module.exports = GetTasksService
