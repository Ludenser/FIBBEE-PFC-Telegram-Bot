
const axios = require('axios');
const FormData = require('form-data')


class postAttachmentsService {

    static async createTaskAttachment(task_id, form, headers) {

        await axios({
            method: 'post',
            url: `https://api.clickup.com/api/v2/task/${task_id}/attachment`,
            data: form,
            headers,
        })
            .then(() => console.log('worked!'))
            .catch((e) => console.log(e))
        // return response
    }

}



module.exports = postAttachmentsService
