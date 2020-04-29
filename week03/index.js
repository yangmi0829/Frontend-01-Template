const numberMap = new Map();
/*0-9*/
[...new Array(10).keys()].forEach(k => {
    numberMap.set(`${k}`,k)
});
/*10-15*/
[...new Array(6).keys()].forEach(k => {
    numberMap.set(String.fromCodePoint(97+k), k+10)
})

function convertStringToNumber(str, radix=10) {
    let flag = '+'
    if(['+','-'].includes(str[0])){
        flag = str[0]
        str=str.substring(1)
    }
    const [integers,decimals] = str.split('.')
    const integerList = (integers||'').split('')
    const decimalList = (decimals||'').split('')
    const integer = integerList.reduce((cur, val, index, arr) => {
        const length = arr.length
        return cur + numberMap.get(val) * (radix ** (length-index-1))
    },0)
    const decimal = decimalList.reduce((cur, val, index, arr) => {
        const length = arr.length
        return cur + numberMap.get(val) / (radix ** (length-index))
    },0)
    return flag === '+' ? (integer+decimal) : -(integer+decimal)
}

function convertNumberToString(number, radix=10) {
    return `${convertStringToNumber(number.toString(), radix)}`
}

console.log(convertStringToNumber('1111'))
console.log(convertStringToNumber('ff', 16))
console.log(convertStringToNumber('-1000.11', 2))
console.log(convertStringToNumber('10.5', 16))
console.log(convertStringToNumber('10.1', 15))

console.log(convertNumberToString('1111'))
console.log(convertNumberToString('ff', 16))
console.log(convertNumberToString('-1000.11', 2))
console.log(convertNumberToString('10.5', 16))
