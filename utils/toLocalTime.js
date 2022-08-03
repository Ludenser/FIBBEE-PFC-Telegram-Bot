module.exports = (value) => {
  const timeStamp_Start = new Date(Number.parseInt(value.start_date))
  const timeStamp_Due = new Date(Number.parseInt(value.due_date))

  const timeStart = timeStamp_Start.toLocaleString('ru-RU', { timeStyle: 'short' })
  const timeDue = timeStamp_Due.toLocaleString('ru-RU', { timeStyle: 'short' })

  return {
    timeStart,
    timeDue
  }
}