# 20200418

## javascript 词法类型

1. 看 ecma 标准里面的 Grammar summary：a lexical Grammar

### atom

#### unicode

1. unicode: 字符集，也就是字符的集合。字符对应着码点
2. 比如 a 的码点就是: 94，来自计算机里面最初的字符集也就是 ascii。
3. 虽然 js 不是使用的 ascii 字符，但是现在其他所有的字符集里面都要兼容 ascii。
4. unicode 是目前使用最为广泛的字符集。unicode.org
5. unicode 的表示法是： u0000, 一共四个 16 位进制的表示法
6. 前面的 128 个值最常用的字符，basic latin 里面，ascii 兼容的部分， cjk（中文的排序）， bmp 之外的字符串

```js
for (let i = 0; i < 128; i++) {
    console.log(String.fromCharCode(i))
}
```

7. 浏览器中我们可以打印出所有的字符。
8. js 中是可以使用中文做变量名的
9. 但是我们通常我们建议不使用超出 ascii 的字符
10. 虽然我们可以使用中文做变量名，但是我们推荐变成`\u5389`的形式，我们通过 `"厉害".codePointAt(0).toString(16)`获取中文响应的 u 码
11. 或者我们使用构建工具来处理

### 回到 js

1. Input Element
   WhiteSpace:Tab,Vertical Tab,Form Feed,Space,No-break space(&nbsp; break 了词，产生了一个分词的效果，但是不断开的哦)，ZWNBSP
   LineTerminator
   Comment
   Token（js 中一切有效的都是 token)
2. Line Terminators
    1. Line Feed LF(使用这个就行了)
    2. Carriage Return(CR) return
    3. Line Separetor
    4. Paragragh Separetor
3. comment（两种）， \*不支持`\u`转码， /\*不支持嵌套
4. Token：

    1. identifierName: 标识符，变量名字 -> 1. 用作变量的部分（IdentifierReference），不能和 keyword 重合 2. 用作属性名的部分，可以和 keyword 重合. 到了后来 identifierName ： 1. keyword， 2. identifier， 3. future reserved keyword： enum

    identifierStart ::
    unicodeStart
    \$
    \_

    identifierPart ::
    可以使用零宽字符的哦
    所以我们尽量使用 ASCii 中的范围

    2. Punctuator
    3. Literal： Number， String， Boolean，Null, Undefined，Object，Symbol
    4. keyword

5. undefined 不是 keyword

## part2: types

### number

1. IEEE 754 Double float
2. sign(1), exponent(11), Fraction(52), 一共 64bit

#### number Grammar

1. DecimalLiteral，Binaryiteral(0b), OctalIntegerLiteral(0o), hexIntegerLiteral(0x)
2. 历史遗留问题： 0 开头就是 8 进制
3. parseInt('', 2/8/10/16)
4. 0010 -> 8
5. decimal: 0.,.2, 2e3
6. 十进制： 三个部分，科学计数法
7. 1.2E10
8. 十进制中的小数点都是可以忽略的
9. 有了这种方式的话我们再也不需要使用 parseInt('100', 10)

##### number 里面的最佳实践

1. safe Integer： Number.MAX_SAFE
   \_INTEGER.toString(16)
2. float compare:math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
3. 小于等于最大精度

### String

1. character
2. code Point
3. Encoding

#### String 里面的最佳实践

```
// 在97的后面有一个空格，为什么呢？
97 .toString(2)
// 97.会是一个合法的整数，所以我们加了空格予以区分
```

1. 字符集

    1. ASCII
    2. unicode
    3. UCS： unicode 的 bmp 范围，也就是 unicode 的一个子级。u+0000 - u+FFFF
    4. GB：(国标体系，是 ASCII 兼容，再加上中文字符)
        - GB2312，最常用
        - GBK
        - GB18030
    5. ISO-8859， 针对欧洲国家
    6. BIG5，繁体字符

2. Encoding- string，编码方式
    1. utf8， 8 位为单位的可变长编码
    2. utf16： 16 位为单位的可变长编码
3. 那么如果针对 ascii 为主的话，我们一般最好使用 utf-8，但是有中文的话，使用 utf-16 就可以了
4. 在 js 中，charCode 和 CodePoint 的使用

### String - Grammar

1. 单引号
2. 双引号
3. 字符串模板 \`, template， 反引号

#### Single Escape Character :: one of

1. ' " \ b f n r t v
2. '\x10' -> 8
3. '\u0000' ->4 位 unicode，转义

### null， Undefined

1. typeof null： Object

### 正则

```js
var a
a // 除法
`/a/g`
```
