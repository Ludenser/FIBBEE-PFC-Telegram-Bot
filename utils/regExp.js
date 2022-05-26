/**
* Функция для обработки строки регулярным выражением
*/
module.exports = (re, str) => {
    const regex = new RegExp(re, 'i')
    let s
    let m = regex.exec(str)
    if (m == null) {
        return str
    } else {
        s = m.map(match => {
            if (match !== null) {
                return match
            }
        })
    }

    return s.toString()
}


