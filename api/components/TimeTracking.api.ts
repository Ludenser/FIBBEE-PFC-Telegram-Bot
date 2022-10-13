
import axios from 'axios';
import { ResponseTime } from '../models';
import { Settings } from '../../config/setting';
/**
    * Взаимодействия с таймером
    */

export interface TimeTracking {
  token: string;
}
export class TimeTracking {
  constructor(token: string) {
    this.token = token
  }

  /**
      * Получение информации о таймере в задаче
      * @param {String} task_id ClickUp-Id of current task
      */
  async getTrackedTime(task_id: string) {
    const response = await axios.get<ResponseTime>(`https://api.clickup.com/api/v2/task/${task_id}/time/`,
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
  async postTrackTime(task_id: string) {
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
  async createEntry(task_id: string) {  //(сколько затрачено на задачу), время нужно получать из логики приложения. в теле запроса указывается либо total, либо start и end в UNIX
    const response = await axios.post(`https://api.clickup.com/api/v2/team/${Settings.TEAM_ID}/time_entries/`,
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
  async startEntry(task_id: string) {
    const response = await axios.post(`https://api.clickup.com/api/v2/team/${Settings.TEAM_ID}/time_entries/start/`,
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
      * Остановка встроенного таймера в ClickUp
      * @param {String} task_id - ClickUp-Id of current task
      */
  async stopEntry(task_id: string) {

    const response = await axios.post(`https://api.clickup.com/api/v2/team/${Settings.TEAM_ID}/time_entries/stop`,
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
