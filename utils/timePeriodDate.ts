/**
  *Возвращает timestamp на +n часа от текущего 
  * @param {EpochTimeStamp} n - определяет величину диапазона от текущего времени. 
  */
export default (n: EpochTimeStamp):EpochTimeStamp => {

  const time = new Date(Date.now())
  const due = new Date(time.setHours(time.getHours() + n)).toString()

  return Date.parse(due)
}