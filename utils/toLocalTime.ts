import { Task } from '../global'

/**
  *Функция, преобразующая Epoch-time в отформатированное локальное время. 
  * @param {Object} task - объект текущего таска. 
  */
export default (task: Task) => {
  const timeStamp_Start = new Date(Number.parseInt(task.start_date))
  const timeStamp_Due = new Date(Number.parseInt(task.due_date))

  const timeStart = timeStamp_Start.toLocaleString('ru-RU', { timeStyle: 'short' })
  const timeDue = timeStamp_Due.toLocaleString('ru-RU', { timeStyle: 'short' })

  return {
    timeStart,
    timeDue
  }
}