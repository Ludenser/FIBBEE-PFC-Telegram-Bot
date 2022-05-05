require('dotenv').config();
const axios = require('axios');
const token = process.env.CLICKUP_TOKEN;

class postAttachmentsService {

    static async createTaskAttachment(task_id, form, headers) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/attachment`,
            data: form,
            headers,
        })
            .then(() => console.log('Загружено в кликап!'))
            .catch((e) => console.log(e))
        // return response
    }

    static async createCommentAttachment(task_id, urll) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
            data: {
                'comment': [
                    {
                        "text": urll,
                        "attributes": {
                            'attachment': true
                        }
                    }
                ]
            },
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => console.log('Загружено в кликап!'))
            .catch((e) => console.log(e))
        // return response
    }

}



module.exports = postAttachmentsService
