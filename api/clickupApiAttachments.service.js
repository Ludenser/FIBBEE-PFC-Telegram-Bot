require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data')

const token = process.env.CLICKUP_TOKEN;
const form = new FormData();

class postAttachmentsService {

    static async createTaskAttachment(task_id, attachment, filename) { //Создание уже готового отслеженного времени, (сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX


        form.append('filename', filename)
        form.append('attachment', attachment);
        const response = await axios.post(`https://api.clickup.com/api/v2/task/${task_id}/attachment`,
            form,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response
    }

}



module.exports = postAttachmentsService
