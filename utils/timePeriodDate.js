/**
  *Возвращает (Date.parse) время на +n часа от текущего 
  */
module.exports = (n) => {

    const time = new Date(Date.now())
    const due = new Date(time.setHours(time.getHours() + n))

    return Date.parse(due)
}