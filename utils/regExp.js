/**
* Функция для обработки строки регулярным выражением
*/
module.exports = (re, str) => {
    const regex = new RegExp(re, 'i')

    let m = regex.exec(str)

    const s = m.map(match => {
        if (match !== null) {
            return match
        }

    })

    return s.toString()
}


