/**
 * 写一个正则表达式 匹配所有 Number 直接量
 *
 * 分析： 首先number的直接量有哪些？
 * 1. DecimalLiteral，
 * 2. BinaryLiteral(0b),
 * 3. OctalIntegerLiteral(0o),
 * 4. hexIntegerLiteral(0x)
 */

/**
 * for binary literal,
 * ob binaryDig
 * 0B binaryDig
 */
const binaryLiteral = /^0[bB][01]+$/

/**
 * for decimal literal
 */
const decimalLiteral = /^(\.\d+|(0|[1-9]\d*)\.?\d*?)([eE][-\+]?\d+)?$/

/**
 * for octal literal
 *
 */

const octalLiteral = /^0[oO][0-7]+$/

/**
 * for HexIntegerLiteral
 */

const hexLiteral = /^0[xX][0-9a-fA-F]+$/
