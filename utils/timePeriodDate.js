/**
  *Возвращает (Date.parse) время на +n часа от текущего 
  * @param {String} n - определяет величину диапазона от текущего времени. 
  */
module.exports = (n) => {

  const time = new Date(Date.now())
  const due = new Date(time.setHours(time.getHours() + n))

  return Date.parse(due)
}