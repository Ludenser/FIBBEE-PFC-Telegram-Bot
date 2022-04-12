require('dotenv').config();
const axios = require('axios')

const token = process.env.CLICKUP_TOKEN;


class GetService {
    static async getAll(list_id, archived = false, page) {
        const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/task`, {
            params: {
                archived: archived,
                page: page
            },
            headers: { 'Authorization': token }
        })
        return response
    }
}

module.exports = GetService