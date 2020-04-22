### String Literals

StringLiteral ::

-   " DoubleStringCharacters<sup>opt</sup> "
-   ' SingleStringCharacters<sup>opt</sup> '

DoubleStringCharacters ::

-   DoubleStringCharacter DoubleStringCharacters<sup>opt</sup>

SingleStringCharacters ::

-   SingleStringCharacter SingleStringCharacters<sup>opt</sup>

DoubleStringCharacter ::

-   SourceCharacter but not one of " or \ or LineTerminator(看后面有的，共四种)
    -   details: `^[^"\\\n\r\u2028\u2029]$`
-   \<LS\>
    -   details: `^\u2028$`
-   \<PS\>
    -   details: `^\u2029$`
-   \ EscapeSequence
    -   details: `/^\\(u([0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|x[0-9a-fA-F]{2}|0(?!=\d)|[^\n\r\u2028\u2029\dxu])$/u`
-   LineContinuation
    -   details: `/^\\(\n|\r\n?|\u2028|\u2029)$/u`

SingleStringCharacter ::

-   SourceCharacter but not one of ' or \ or LineTerminator
    -   details: `^[^'\\\n\r\u2028\u2029]$`
-   \<LS\>
    -   details: `^\u2028$`
-   \<PS\>
    -   details: `^\u2029$`
-   \ EscapeSequence
    -   details: `/^\\(u([0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|x[0-9a-fA-F]{2}|0(?!=\d)|[^\n\r\u2028\u2029\dxu])$/u`
-   LineContinuation
    -   details: `/^\\(\n|\r\n?|\u2028|\u2029)$/u`

LineContinuation ::

-   \ LineTerminatorSequence

LineTerminatorSequence ::

-   <LF>
-   <CR>[lookahead ≠ <LF>]
-   <LS>
-   <PS>
-   <CR><LF>
    details: `/^(\n|\r\n?|\u2028|\u2029)$/u`
