# antd 4.x

## 小知识点

### 栅格布局

```jsx
import { Row, Col, Divider } from "antd";

ReactDOM.render(
  <>
    <Divider orientation="left">sub-element align left</Divider>
    <Row justify="start">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align center</Divider>
    <Row justify="center">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align right</Divider>
    <Row justify="end">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element monospaced arrangement</Divider>
    <Row justify="space-between">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align full</Divider>
    <Row justify="space-around">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>
  </>,
  mountNode
);
```

1. (16+8n)px 作为栅格间隔(n 是自然数)。
2. pull 在前 push 在后
3. 栅格基于 flex 布局
4. align 垂直对齐
5. order 亦可控制元素顺序
6. 响应式布局参照 bootstrap
   `xs={6} 相当于 xs={{ span: 6 }}`
   - xs 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   - sm 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
   - md 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
   - lg 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
   - xl 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
   - xxl 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
7. flex 控制填充`flex={2}`另一个`flex={3}` 则 2/5,3/5
8. gutter 表示间距，可接入数组`gutter={[48,24]}`表示水平间距 48px 垂直间距 48px，不与 span 属性产生冲突
9. wrap 是否自动换行
10. 
