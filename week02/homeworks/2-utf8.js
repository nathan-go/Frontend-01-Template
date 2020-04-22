/**
 * UTF-8 Encoding from unicode
 *
 * unicode本身是一种符号集合。他只是规定了符号的二进制代码，但是并没有
 * 规定二进制代码应该如何储存。
 *
 * 而utf-8是一种编码方式，也就是可以unicode的实现方式之一。
 *
 * utf-8是一种变长的编码方式。而他的编码规则其实很简单。
 *
 * 1. 对于单字节的符号，字节的第一位数设为0，后面的7位为这个符号的unicode码
 * 2. 对于n字节的符号，第一个字节的前n位都设置为1，第n+1位设置为0，
 * 后面字节的前两位一律设置为10.剩下的没有提到的
 * 二进制位，全部为这个符号的unicode码。
 *
 * unicode通常是两个字节表示一个字符，
 *
 * utf-8通常是1~4个字节表示一个符号
 */
function UTF8_Encoding(string) {}

function charToUtf8(char) {
    // 获取binary code in unicode, codePointAt returns a non-negative integer that is the Unicode code point
    const binary = char.codePointAt().toString(2)
    // 针对utf8的标准1： 单字节的情况
    if (binary.length < 8) {
        return binary.padStart(8, '0')
    }
    // 针对utf8的标准2：多字节的符号
    // utf8最多是4个字节，所以最多到11110
    const headers = ['0', '110', '1110', '11110']
    const result = []
    for (let endPoint = binary.length; endPoint > 0; endPoint -= 6) {
        // 获取从右到左的6个binary code
        const sub = binary.slice(Math.max(endPoint - 6, 0), endPoint)
        // 如果长度是6的话，说明不是utf8的第一个字节
        if (sub.length === 6) {
            result.unshift(`10${sub}`)
            // 但是如果长度正好为6， 后面没有字节了，我们需要填充0
            if (endPoint === 6) {
                const header = headers[result.length]
                result.unshift(
                    `${header}${''.padStart(8 - header.length, '0')}`
                )
            }
        } else {
            // 还有剩余长度的情况需要给头部，然后填充0即可
            const header = headers[result.length]
            result.unshift(
                `${header}${sub.padStart(8 - sub.length - header.length, '0')}`
            )
        }
    }
    return result.join('|')
}

function utf8Encoding(str) {
    return Array.from(str).map((char) => charToUtf8(char))
}
