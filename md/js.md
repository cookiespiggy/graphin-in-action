# JS基础

## JS之布尔类型

1. false、0、空字符串（""）、NaN、null 和 undefined 被转换为 false
1. 你所有其他值被转换为 true
1. 可以使用 Boolean() 函数进行显式转换

##JS变量

1. 使用 var 声明的变量在它所声明的整个函数都是可见的。
```js
// myVarVariable在这里 *能* 被引用

for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) {
  // myVarVariable 整个函数中都能被引用
}

// myVarVariable 在这里 *能* 被引用
```

## 运算

###  或与非
```js
[1,2]&&[2,3]  //[2,3]   [1,2]==true ,[2,3]==true 
[1,2]||[2,3]   //[1,2] 
```

## 控制结构
1. 可以使用do{}while()

1. for循环
```js
for(let value of array){}
for(let attribute in object){}
```

1. switch
```js
switch(1 + 3){
    case 2 + 2:
        yay();
        break;
    default:
        neverhappens();
}
```

## 方法

### 传入多个参数
```js
function add() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum;
}

add(2, 3, 4, 5); // 14
```

```js
function avg(...args) {
  var sum = 0;
  for (let value of args) {
    sum += value;
  }
  return sum / args.length;
}

avg(2, 3, 4, 5); // 3.5
```
1. 字符串逆序
```js
var s = "Simon";
s.reversed(); // TypeError on line 1: s.reversed is not a function

String.prototype.reversed = function() {
    var r = "";
    for (var i = this.length - 1; i >= 0; i--) {
        r += this[i];
    }
    return r;
}
s.reversed(); // nomiS
```