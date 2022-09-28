
const axios = require('axios');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('./config/setting.json'));
const { team_id } = settings;
/**
    * Взаимодействия с таймером
    */
class TimeTracking {

  constructor(token) {
    this.token = token
  }

  /**
      * Получение информации о таймере в задаче
      * @param {String} task_id ClickUp-Id of current task
      */
  async getTrackedTime(task_id) {
    const response = await axios.get(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Создание уже готового отслеженного времени
      * @param {String} task_id ClickUp-Id of current task
      */
  async postTrackTime(task_id) {
    const response = await axios.post(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
      {
        'time': 180000
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Создание уже готового отслеженного времени
      * @param {String} task_id ClickUp-Id of current task
      */
  async createEntry(task_id) {  //(сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
    const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/`,
      {
        "description": "received from Bot",
        "start": Date.now(),
        "duration": 5,
        "tid": task_id
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Запуск встроенного таймера в ClickUp
      * @param {String} task_id - ClickUp-Id from current task
      */
  async startEntry(task_id) {
    const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/start/`,
      {
        "description": "received from Bot",
        "tid": task_id
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Обновление встроенного таймера в ClickUp
      * @param {String} task_id - ClickUp-Id of current task
      * @param {EpochTimeStamp} unix_time - UNIX-time, required by ClickUp API 
      */
  async updateEntry(task_id, unix_time) {


    const response = await axios.put(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/${timer_id}/`,
      {
        "end": unix_time,
        "tid": task_id
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Остановка встроенного таймера в ClickUp
      * @param {String} task_id - ClickUp-Id of current task
      */
  async stopEntry(task_id) {

    const response = await axios.post(`https://api.clickup.com/api/v2/team/${team_id}/time_entries/stop`,
      {
        "description": "received from Bot",
        "tid": task_id
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }
}

module.exports = TimeTracking