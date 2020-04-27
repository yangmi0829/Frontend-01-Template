/**
 * 写一个正则表达式 匹配所有 Number 直接量
 写一个 UTF-8 Encoding 的函数
 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
 */

/**
 * 正则校验是否为数字
 * 1.1e10
 * 首位可是是符号
 * 可以是0开头， 如果有小数，不能为连续的0开头
 * 结尾可以是e/E + 整数
 */
console.log("正则校验是否为数字:")
// ((\d+)|(((0[.])|(\d+))\d+))
    //  \d+     ((0[.])|([1-9]\d*))\d+
// 2进制 前缀:0b
// 8 进制 前缀: 0
// 16 进制 前缀:0[x|X]
const number_regex = /^(([-|+]?)((\d+)|(((0)|([1-9]\d*))[.]?\d+))([E]\d+)?)|(0[B][0|1]+)|([0]+[0-7]+)|(0[X][0-9A-F]+)$/i
console.log(number_regex.test('1.1e10'))
console.log(number_regex.test('1.1E00'))
console.log(number_regex.test('1.1'))
console.log(number_regex.test('0.1'))
console.log(number_regex.test('+0.1'))
console.log(number_regex.test('1'))
console.log(number_regex.test('0b1'))
console.log(number_regex.test('01'))
console.log(number_regex.test('0x16'))
console.log(number_regex.test('0x16ABDC'))

/**
 * UTF-8 Encoding
 * JavaScript本身可通过charCodeAt方法得到一个字符的Unicode编码，并通过fromCharCode方法将Unicode编码转换成对应字符。

 但charCodeAt方法得到的应该是一个16位的整数，每个字符占用两字节。在网络上传输一般采用UTF-8编码，JavaScript本身没有提供此类方法。不过有一个简便的办法来实现UTF-8的编码与解码。

 Web要求URL的查询字符串采用UTF-8编码，对于一些特殊字符或者中文等，会编码成多个字节，变成%加相应16进制码的形式。比如：汉字 中 将会被编码为%E4%B8%AD。

 为此JavaScript提供了encodeURIComponent与decodeURIComponent方法组合来对查询字符串进行编码与解码。利用这一点，我们可以将encodeURIComponent方法编码后的字符串进行处理，最终得到对应的字节数组
 */

function encodeUTF8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}

function decodeUTF8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}
const encode = encodeUTF8('厉害')
const decode = decodeUTF8(encode)
console.log("utf-8 encode:"+encode)
console.log("utf-8 decode:"+decode)

/**
 * 正则校验是否为合法字符串
 * 支持单引号双引号
 * 1.单引号和双引号只存在一种
 * 2. 存在单引号时，如果存在双引号需要转义
 * 3. 存在双引号时，如果存在单引号需要转义
 */
console.log("正则校验是否为字符串:")
const regex_string = /^([^']+)|([^"]+)|(([^'])|(\\')*)|(([^"])|(\\")*)$/

console.log(regex_string.test('abcde12\'"123"asda""31op'))
console.log(regex_string.test("abcde12\"'31op"))


const\u0032=10;
while(const2--){
    console.log(const2)
}



