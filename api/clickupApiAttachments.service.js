require('dotenv').config();
const axios = require('axios');
const token = process.env.CLICKUP_TOKEN;
const fs = require('fs');
const FormData = require('form-data');

class PostAttachmentsService {

    static async createTaskAttachment(task_id, ctx) {
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

    // static async createCommentAttachment(task_id, urll) {

    //     await axios({
    //         method: 'post',
    //         url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
    //         data: {
    //             'comment': [
    //                 {
    //                     "text": urll,
    //                     "attributes": {
    //                         'attachment': true
    //                     }
    //                 }
    //             ]
    //         },
    //         headers: {
    //             'Authorization': token,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(() => console.log('Загружено в кликап!'))
    //         .catch((e) => console.log(e))

    // }

}



module.exports = PostAttachmentsService
