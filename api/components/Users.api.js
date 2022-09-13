const axios = require('axios');
require('dotenv').config();
/**
    * Взаимодействия с пользователями.
    */
class Users {

  constructor(token) {
    this.token = token
  }


  async getToken(code) {
    const response = await axios.post('https://api.clickup.com/api/v2/oauth/token',
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: code
        }
      }

    )
    return response.data
  }

  /**
      * Получение объекта юзера, аутентифицированного под текущим ClickUp токеном
      */
  async getUser_ByToken() {
    const response = await axios.get('https://api.clickup.com/api/v2/user',
      {
        headers: {
          'Authorization': this.token
        }
      })
    return response
  }

  /**
      * Получение объекта всех юзеров, имеющих доступ к указанному таск-листу "по умолчанию"
      * @param {String} list_id - ClickUp-Id of current task-list
      */
  async getUsers_id(list_id) {
    const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/member`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

}

module.exports = Users