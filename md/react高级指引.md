# React高级指引

## 无障碍

WACG为该方面指定的标准

1. `<Fragment>`可缩写为`<>`

和其他的元素一样，你可以把一系列的对象映射到一个 fragment 的数组中。

```js
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 短语法：

```js
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

1. 代码切割

```js
// 使用之前
import {add} from './math.js'
console.log(add(5,6));
// 使用后
import('./math.js').then(math=>{
    console.log(math.add(5,6))
})
```
