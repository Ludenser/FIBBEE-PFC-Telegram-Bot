const axios = require('axios');

class Custom_fields {
  constructor(token) {
    this.token = token
  }
  async getAllCustomFields(list_id) {
    const response = await axios.get(`https://api.clickup.com/api/v2/list/${list_id}/field`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }
  /**
        * Создание комментария в таске c тегом юзера.
        * @param {String} task_id - ClickUp-Id of current task
        * @param {String} field_id - ClickUp-Id of user to be tagged
        * @param {String} value - text from .update.message
        */
  async setValue(task_id, field_id, value) {
    await axios({
      method: 'post',
      url: `https://api.clickup.com/api/v2/task/${task_id}/field/${field_id}`,
      data: {
        value
      },
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Custom-field обновлен!'))
      .catch((e) => console.log(e))
  }
  /**
        * Создание комментария в таске c тегом юзера.
        * @param {String} task_id - ClickUp-Id of current task
        * @param {String} field_id - ClickUp-Id of user to be tagged
        */
  async removeValue(task_id, field_id) {
    await axios({
      method: 'delete',
      url: `https://api.clickup.com/api/v2/task/${task_id}/field/${field_id}`,
      data: {},
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Custom-field стёрт!'))
      .catch((e) => console.log(e))

  }
}

module.exports = Custom_fields