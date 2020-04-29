# 20200423 表达式和类型转换

## 解答疑问

1. 浮点数的表示法中有效数字的第一个位肯定是 1。
2. 判断正 0 负 0， 1 除以这个数，等于+Infinity 还是-Infinity，也就是使用除法。
3. 取符号的函数： sign(number)
4. 浮点数谨慎运算操作，运算的话需要考虑精度的问题。

```js
function sign(number) {
    // 想写一个稳定的sign函数其实考虑的情况挺多, 0, -0, Inifinity一类的边界条件
    // 还有一种方式就是取出符号位来，直接看符号位是0还是1，就可以判断正负了
}

// 判断正零还是负零
function check(zero) {
    if (1 / zero === Infinity) {
        return 1 // position zero
    }
    if (1 / zero === -Infinity) {
        return -1
    }
}
```

## 表达式 expression

### Grammar

1. tree vs Priority
2. 运算符的优先级： 使用表达式生成树的方式形成的。+-， \*/, ()
3. 下面我们按照优先级从高到低来解释

#### member expression

1. Member Expression: 访问属性的运算，取属性，成员访问
    - a.b
    - a[b]
    - foo`string` : 函数传入参数
    - super.b（构造函数里面）
    - super['b']
    - new.target （构造函数里面）： lets you detect whether a function or constructor was called using the new operator. only used in the function itself
    - new Foo(): 注意这里和下面的优先级不一样的
2. New: new Foo
3. 解释上面的：简单的说就是带括号的优先级更高比如 new new Foo(),这个括号是跟着里面的 new Foo()一起的
4. review: 看 member 的话，我们可以看到 a.b，其中左边也就是 a 必须是一个对象吧

    ```js
    function class1(s) {
        console.log(s)
    }

    function class2(s) {
        console.log('2', s)
        return class1
    }
    let a = new new class2('good')()
    // get 2 good
    ```

5. member expression 返回的是一个 reference 类型，里面的结构是一个 object，一个 key 值，有 delete 和 assign
6. 像一个指针，既可以读也可以写

#### call expression

1. call
    - foo()
    - super()
    - foo()['b']
    - foo().b
    - foo()`aab`
2. new Foo()['b']: new Foo()优先，然后再取值

#### expressions: left handside & right handside

1. member, new, call
2. 等号左边，等号右边
3. 通用的语言知识
4. 左表达式: 运行时是 reference 类型，语法上必须是 left hand side

#### update

1. a++, a--, --a, ++a， a 后面 no-line Terminator，
2. example: ++a ++, ++(a++),不合语法

#### unary(单个运算符)

1. unary
    - delete a.b： 必须是 reference 类型
    - void foo()， void 是一个运算符，把什么都变成 undefined：使用 void 0 来代替 undefined，所以忘掉 undefined 吧
    - typeof a：null, function,两个特殊的情况
    - \+ a
    - \- a
    - ~ a(按照位取反)
    - !a
    - await a
2. iife 的写法： 推荐使用 void 的方式, 比之前的()方式好很多，因为打包后会有前后粘连的情况出现。

```js
void (function (i) {
    console.log(i)
})(i)
```

3. !!同 truefalse 的，！是会做类型转换的，但是逻辑运算里面不会做任何的转换

#### exponental

1. 3\*\*2\*\*3: 指数符号，唯一的一个右结合的符号，refers to 3**(2**3)

#### 接下来的

1. multiplicative: \*/%
2. additive: +-
3. shift: <<,>>,>>>
4. relationship: <,><=,=>, instanceof, in
5. Equality:最为变态的，左右两边会有不同的东西
    - ==
    - !=
    - ===
    - !==
6. bitwise
    - & ^ |
7. logical(短路逻辑)，完全可以当做 if else 来使用
    - && ||
8. conditional，三步运算符，js 里面也是短路逻辑，也是一样的 if else
    - ?:
9. 逗号： 最低级的运算符

### 问题： js 中有几种加法？

1. 从运行时的角度来看，两种方式： 一种 number 形式的，一种 string 形式的。
2. 同理，js 也就是只有一种乘法

### type convert

1. [!avatar](./type-convert.png)

### box unbox

#### box

1. 7 种类型但是 Number, String, Symbol. Boolean, 是有对应的类的
2. new Number(1)
3. typeof 是不一样的哦
4. 而且转化类型也是不一样的哦
5. String, Number, Boolean 不带 new 调用的话返回的就是基本的类型
6. 其实还有一个方式就是使用 Object（’string')，这个和 new String（‘adc’）返回的也是一个 String 的类。而 Object 使用带不带 new 都是一样的，这就是装箱了
7. 但是 Symbol 情况特殊，new 不了。只能直接调用

### unbox

1. [toPrimitive], valueOf,toString()
