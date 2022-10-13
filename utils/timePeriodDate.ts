/**
  *Возвращает (Date.parse) время на +n часа от текущего 
  * @param {Number} n - определяет величину диапазона от текущего времени. 
  */
export default (n: number) => {

  const time = new Date(Date.now())
  const due = new Date(time.setHours(time.getHours() + n)).toDateString()

  return Date.parse(due)
}