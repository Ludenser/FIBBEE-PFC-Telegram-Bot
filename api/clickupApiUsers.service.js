require('dotenv').config();
const axios = require('axios')
const fs = require('fs')
const settings = JSON.parse(fs.readFileSync('./lib/setting.json'))
const { listId } = settings

const token = process.env.CLICKUP_TOKEN;

class GetUsers {

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
module.exports = GetUsers
