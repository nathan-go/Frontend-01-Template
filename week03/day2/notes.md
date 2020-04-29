# 20200425 statement

## grammar and runtime

1. Grammar:
    - 简单语句
    - 组合语句
    - 声明
2. runtime:
    - completion record,会存在内部对象
    - lexical enviorment

## completion record 类型

1. [[type]]: normal, break, continue, return, or throw
2. [[value]]: types: 7 个 type，当然包括 void
3. [[target]]: label, for break or continue

## 简单语句

1. expression statement
2. empty statement
3. debugger statement
4. throw statement
5. continue statement
6. break statement
7. return statement

```js
a = 1 + 2;
//;
debugger;
throw a;
continue label1;
break label2;
return 'a';
```

## 复合语句

1. block statement
2. if statement
3. switch statement
4. iteration statement
5. with statement
6. labelled statement
7. try statement

```js
//1. block statement
/**
 * type: normal,
 * value: --
 * target: --
 * /
{
    // 效果是把多条语句从语法上括起来，看起来像是一条语句
    // es6中为let和const提供block scope
    const a = 1;
    throw 1; // 顺次执行，但是如果非normal的话，就会跳过去
    let b = 2;
}

// iteration
/**
 * while(){}
 * do{}while()
 * for(;;)
 * for(in):
 * for(of): 所有的for第一个空间都可以放一个声明，对于const，let的话，for会形成单独的作用域
 * for await(of) // 暂时跳过
 * /
```

1. for in: 循环对象的属性
2. for of： 简单的理解： 循环一个数组，或者 iterable
3. in 的语法标准

## 标签 循环，break，continue

1. labelled statement
2. iteration statement
3. continume statement
4. break statement
5. switch statement
6. type: break, continue, value: -, target: label

## try

```js
try{
  //throw error， 或者产生运行时error的都可以的
}catch() {

}finally{

}
```

### notice:

1. 作用域：文本中变量作用的区域
2. 上下文：电脑内存中的
3. scope

## 声明

1. function declaration
2. generator declaration
3. async function declaration
4. async generator dec
5. variable statement
6. class declaration： 不能重复声明，使用前必须先声明，要求严格，挺好
7. lexical declaration

```js
// 函数声明
function foo() {}

// 函数表达式可以有或者没有名字
let f = function () {};

let f = function foo() {};

// class是类似的
class A {}

// yield
function* foo() {
    yield 1;
    yield 2;
}
```

1. 建议 var 写在 function 里面的最前面
2. 不要在 block 里面写 var

## types：讲解对象机制，单独出来的，atom 里面

1. Object： 世间万物
2. 不是数据存储的工具，三只不同的鱼，其实是不同的鱼。
3. 每一个对象都是唯一，我们使用状态来描述对象。我们状态的改变是行为。
4. 上面都是哲学的层次
5. 对象的三要素： 唯一性，状态，行为。
6. identifier, state, behavior
7. 封装，解耦，复用，内聚，都是指的是代码的架构层面。
8. 继承： 面向对象的子系统
9. 多态： 动态性的程度

### object class, class based object

1. 归类，和分类派
2. c++等

### prototype class

### 设计对象的状态和行为时，我们总是遵循行为改变状态的原则

### js 中的对象模型

1. 只需要关心原型和属性两个部分（object -> property，[[prototype]])
2. Object in js:
    - data property: value, writable, enumerable, configurable
    - accessor property: get, set, enumerable, configurable
3. js 使用属性来统一抽象对象的状态和行为
4. 一般来说，数据属性用于描述状态，访问器属性则用于描述行为。
5. 数据属性中如果存储函数，也可以用于描述行为
6. js 中原型链的方式
7. Object 四组 API/Grammar:
    - {}.[], Object.defineProperty
    - Object.create, Object.setPrototypeOf, Object.getPrototypeOf
    - new, class, extends
    - new, function, prototype,js 中的四不像的机制
8. Function Object: 前面是 js 的一般对象，但是 js 中有一些特殊的对象，比如函数对象。
    - 除了一般对象的属性和原型，函数对象海油一个行为就是[[call]]
    - 我们用 js 中的 function 关键字，箭头运算符或者 Function 构造器创建的对象，都会有 call 这个行为
    - 我们用类似 f()这样子的语法把对象当做函数调用时，会访问到 call 这个行为。
    - 如果对应的对象没有 call 这个行为，那么就会报错
9. js 中以后需要 new 的东西全部用 class，不用之前 function 那套系统了
10. 其他的特殊对象： 比如 Array, 特殊的[[length]]，Object.prototype[[setPrototypeOf]]
