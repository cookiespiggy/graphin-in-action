# Vue.js深入理解
## 双向绑定
1. vue的双向绑定是通过object.defineProperty()的set和get实现的
```js
var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
// 把额外的操作写在set里，就会在赋值的时刻进行同步操作
Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
console.log(Book.name);  // 《vue权威指南》
```
