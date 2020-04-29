/**
 * simulate the function of parseFloat
 * 需要注意的：
 * 字符串解析成数组我们只需要考虑字符串是否合法的10进制表达式，而不是要考虑
 * 二进制或者其他进制的字符串表达式的情况。
 * @param {string} str: the input of the string represent the number
 * @param {number} radix: the radix, default is
 * @return {string}
 */
function convertStringToNumber(str, radix = 10) {
    // firstly, validate the str
    if (!/^(0\.?|0?\.\d+|[1-9]\d*\.?\d*?)$/.test(str)) {
        throw Error(`${str} not a valid number in string.`);
    }
    let chars = str.split('');
    const zeroPoint = '0'.codePointAt(0);
    let number = 0;
    let i = 0;
    // 整数部分
    while (i < chars.length && chars[i] != '.') {
        number *= radix;
        number += chars[i].codePointAt(0) - zeroPoint;
        i++;
    }
    if (chars[i] == '.') {
        i++;
    }
    // 小数部分
    let fraction = 1;
    while (i < chars.length) {
        fraction /= radix;
        number += (chars[i].codePointAt(0) - '0'.charCodeAt(0)) * fraction;
        i++;
    }
    return number;
}
