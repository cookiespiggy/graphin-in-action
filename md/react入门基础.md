# React入门

* 2021.1.22 by 于贺美

## JSX语法

### 摘要

`const element = <h1>Hello, world!</h1>;`

1. `{}` get expression

1. `const element = <img src={user.avatarUrl} />;`

jsx使用小驼峰进行命名 camelCase  class=>className

1. JSX 防止注入攻击

1. JSX只更新它需要更新的部分

1. props内的attr 都可以标签内绑定（是否camelCase还不一定）

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

1. style有两个{}

```jsx
<li style={{color:isOnline?'green' : 'black'}}></li>
```

1. 组件名称必须CamelCase

1. 将函数组件转换成Class组件

通过以下五步将 Clock 的函数组件转成 class 组件：

* 创建一个同名的 ES6 class，并且继承于 React.Component。
* 添加一个空的 render() 方法。
* 将函数体移动到 render() 方法之中。
* 在 render() 方法中使用 this.props 替换 props。
* 删除剩余的空函数声明。

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

1. `super(props);`是将props传递到父组件中，并不是继承

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

1. React.createElement()与const搭配创建jsx组件

### 生命周期

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // componentDidUpdate

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

1. 更新state 唯一方法 `this.setState({comment: 'Hello'});`

1. state可以通过绑定props自顶向下传递

### 事件处理

1. camelCase
```js
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
1. 阻止默认事件行为
```js
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
1. 事件监听
```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

如果不想用bind

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    //   注意:此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。
    );
  }
}
```
实验性的方法
```jsx
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

1. 向事件中传递参数
```jsx
// ()=>deleteRow(id)亦可
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 条件渲染

1. if通过元素变量
1. 与运算符&&
```jsx
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```
* true会返回&&右面的元素  false将会返回左面的表达式

1. 三目运算符也是可以的

1. 阻止组件渲染
  ```jsx
  return null
  ```

### 列表&Key

1. Array.prototype.map()
1. must key
  
  因为React是根据组件的变化来更新有必要更新的组件，在此基础上借助唯一标识的key来进行良好的更新渲染

1. should string&unique

### 表单

1. 受控组件
适用于 input，select(默认项为selected),textarea

```jsx
// 1.state
this.state={value:''}
//2.method
this.method=this.method.bind(this);
// 3.定义method
method(event){
  this.setState({value=event.target.value});
}
// 4.绑定
<form onSubmit={this.handleSubmit}>
  <input type="text" value={this.state.value} onChange={this.method}>
</form>
```

* 至此，以上代码成为一个受控组件

1. `<select multiple={true} value={['B', 'C']}>`

`multiple`是指select支持多选

1. 处理多个输入

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // ES6语法
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

1. 指定了value

```jsx
ReactDOM.render(<input value="hi" />, mountNode);
// 如果一开始指定了value 会使输入框不可编辑 但是将其内容置为undefined或null可恢复编辑
setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

1. 非受控组件

1. [Formik](https://formik.org/)
包含验证、追踪访问字段以及处理表单提交的完整解决方案,它同样是建立在受控组件基础之上的

### 状态提升

1. 组件内的state变为props
通过状态提升让父组件对子组件进行把控
```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

### 组合VS继承

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

### React哲学

1. 将UI划分为组件层级
1. 交互功能和UI分开
1. 设计一个不需要交互功能的UI

    * 静态不需要交互就用不上state
    * 自上而下或者自上而下
    到此为止，你应该已经有了一个可重用的组件库来渲染你的数据模型。由于我们构建的是静态版本，所以这些组件目前只需提供 render() 方法用于渲染。最顶层的组件 FilterableProductTable 通过 props 接受你的数据模型。如果你的数据模型发生了改变，再次调用 ReactDOM.render()，UI 就会相应地被更新。数据模型变化、调用 render() 方法、UI 相应变化，这个过程并不复杂，因此很容易看清楚 UI 是如何被更新的，以及是在哪里被更新的。React 单向数据流（也叫单向绑定）的思想使得组件模块化，易于快速开发。

1. 确定UI state的最小且完整的表示
  不需要是state
    * 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
    * 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
    * 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。
    需要是state
    * 用户输入的搜索词
    * 选择框选择的值

1. 确定state放置的位置

    * 找到根据这个 state 进行渲染的所有组件。
    * 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state的组件）。
    * 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
    * 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

1. 添加反向数据流

    * onChange由子寄父
    让我们重新梳理一下需要实现的功能：每当用户改变表单的值，我们需要改变 state 来反映用户的当前输入。由于 state 只能由拥有它们的组件进行更改，FilterableProductTable 必须将一个能够触发 state 改变的回调函数（callback）传递给 SearchBar。我们可以使用输入框的 onChange 事件来监视用户输入的变化，并通知 FilterableProductTable 传递给 SearchBar 的回调函数。然后该回调函数将调用 setState()，从而更新应用。

## hook语法

### State Hook

```js
const [value,setValue] = setState(initialState);
```

### Effect Hook

1. useEffect将生命周期合成为一个API
1. 可加可清

```jsx
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // return函数即为清楚操作
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
```

1. 可多次调用

1. 自定义hook useSomething命名

```jsx
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

1. 跳过effect进行性能优化

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，但我们有更好的方式来避免过于频繁的重复调用 effect。除此之外，请记得 Rea

* 此规则会在添加错误依赖时发出警告并给出修复建议。
npm install eslint-plugin-react-hooks --save-dev

1. 自定义Hook

```js
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

* 和reducer有关的

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

* 调用

```js
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

### useContext

1. const value = useContext(MyContext);

MyContext必须是context本身，不可以是AnyObj.context

1. 