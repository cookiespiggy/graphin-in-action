/* eslint-disable no-undef */
import React from "react";
import Graphin, { GraphinContext, Utils } from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";
import { Select, Row, Col, Card, message } from "antd";
import { TagFilled, DeleteFilled, ExpandAltOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.less";
// 引入Graphin CSS

import {
  TrademarkCircleFilled,
  ChromeFilled,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreFilled,
  CopyrightCircleFilled,
  CustomerServiceFilled,
  ShareAltOutlined,
} from "@ant-design/icons";

const iconMap = {
  "graphin-force": <ShareAltOutlined />,
  random: <TrademarkCircleFilled />,
  concentric: <ChromeFilled />,
  circle: <BranchesOutlined />,
  force: <AppstoreFilled />,
  dagre: <ApartmentOutlined />,
  grid: <CopyrightCircleFilled />,
  radial: <ShareAltOutlined />,
};

const data = Utils.mock(10).tree().graphin();
console.log(data);
const SelectOption = Select.Option;
const LayoutSelector = (props) => {
  const { value, onChange, options } = props;
  // 包裹在graphin内部的组件，将获得graphin提供的额外props
  return (
    <div
    // style={{ position: 'absolute', top: 10, left: 10 }}
    >
      <Select style={{ width: "120px" }} value={value} onChange={onChange}>
        {options.map((item) => {
          const { type } = item;
          const iconComponent = iconMap[type] || <CustomerServiceFilled />;
          return (
            <SelectOption key={type} value={type}>
              {iconComponent} &nbsp;
              {type}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};

const layouts = [
  { type: "graphin-force" },
  {
    type: "grid",
    // begin: [0, 0], // 可选，
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // preventOverlapPdding: 20, // 可选
    // nodeSize: 30, // 可选
    // condense: false, // 可选
    // rows: 5, // 可选
    // cols: 5, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: "circular",
    // center: [200, 200], // 可选，默认为图的中心
    // radius: null, // 可选
    // startRadius: 10, // 可选
    // endRadius: 100, // 可选
    // clockwise: false, // 可选
    // divisions: 5, // 可选
    // ordering: 'degree', // 可选
    // angleRatio: 1, // 可选
  },
  {
    type: "radial",
    // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // maxIteration: 1000, // 可选
    // focusNode: 'node11', // 可选
    // unitRadius: 100, // 可选
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // strictRadial: false, // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: "force",
    preventOverlap: true,
    center: [200, 200], // 可选，默认为图的中心
    linkDistance: 50, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.8, // 可选
    collideStrength: 0.8, // 可选
    nodeSize: 30, // 可选
    alpha: 0.9, // 可选
    alphaDecay: 0.3, // 可选
    alphaMin: 0.01, // 可选
    forceSimulation: null, // 可选
    onTick: () => {
      // 可选
      console.log("ticking");
    },
    onLayoutEnd: () => {
      // 可选
      console.log("force layout done");
    },
  },
  {
    type: "gForce",
    linkDistance: 150, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.1, // 可选
    nodeSize: 30, // 可选
    onTick: () => {
      // 可选
      console.log("ticking");
    },
    onLayoutEnd: () => {
      // 可选
      console.log("force layout done");
    },
    workerEnabled: false, // 可选，开启 web-worker
    gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: "concentric",
    maxLevelDiff: 0.5,
    sortBy: "degree",
    // center: [200, 200], // 可选，

    // linkDistance: 50, // 可选，边长
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // sweep: 10, // 可选
    // equidistant: false, // 可选
    // startAngle: 0, // 可选
    // clockwise: false, // 可选
    // maxLevelDiff: 10, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: "dagre",
    rankdir: "LR", // 可选，默认为图的中心
    // align: 'DL', // 可选
    // nodesep: 20, // 可选
    // ranksep: 50, // 可选
    // controlPoints: true, // 可选
  },
  {
    type: "fruchterman",
    // center: [200, 200], // 可选，默认为图的中心
    // gravity: 20, // 可选
    // speed: 2, // 可选
    // clustering: true, // 可选
    // clusterGravity: 30, // 可选
    // maxIteration: 2000, // 可选，迭代次数
    // workerEnabled: false, // 可选，开启 web-worker
    // gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: "mds",
    workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: "comboForce",
    // // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // nodeStrength: 30, // 可选
    // edgeStrength: 0.1, // 可选
    // onTick: () => {
    //   // 可选
    //   console.log('ticking');
    // },
    // onLayoutEnd: () => {
    //   // 可选
    //   console.log('combo force layout done');
    // },
  },
];

// 右键菜单部分
const { Menu } = ContextMenu;
const options = [
  {
    key: "tag",
    icon: <TagFilled />,
    name: "打标",
  },
  {
    key: "delete",
    icon: <DeleteFilled />,
    name: "删除",
  },
  {
    key: "expand",
    icon: <ExpandAltOutlined />,
    name: "扩散",
  },
];
const CanvasMenu = () => {
  const { graph, contextmenu } = React.useContext(GraphinContext);
  const context = contextmenu.canvas;
  const handleDownload = () => {
    graph.downloadFullImage("canvas-contextmenu");
    context.handleClose();
  };
  const handleClear = () => {
    message.info(`清除画布成功`);
    context.handleClose();
  };
  const handleStopLayout = () => {
    message.info(`停止布局成功`);
    context.handleClose();
  };
  const handleDataShow = () => {
    let nodeId = "node-" + data.nodes.length;
    data.nodes.push({
      id: nodeId,
      label: nodeId,
      type: "graphin-circle",
      comboId:undefined,
      style:{
        label: {
          value:nodeId
        }
      }
    });
    console.log(data.nodes);
    graph.updateItem()
  };
  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
      <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
      <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
      <Menu.Item onClick={handleDataShow}>增加数据</Menu.Item>
    </Menu>
  );
};

export default () => {
  const [type, setLayout] = React.useState("graphin-force");
  const handleChange = (value) => {
    console.log("value", value);
    setLayout(value);
  };
  const menuHandleChange = (menuItem, menuData) => {
    message.info(`元素：${menuData.id}，动作：${menuItem.name}`);
  };
  const layout = layouts.find((item) => item.type === type);
  return (
    <Row style={{ minHeight: 100 }}>
      <Col span={24}>
        <Card
          title="布局切换"
          bodyStyle={{ height: "100%", overflow: "visible" }}
          extra={
            <LayoutSelector
              options={layouts}
              value={type}
              onChange={handleChange}
            />
          }
        >
          <Graphin data={data} layout={layout}>
            <ContextMenu style={{ width: "80px" }}>
              <Menu
                options={options}
                onChange={menuHandleChange}
                bindType="node"
              ></Menu>
            </ContextMenu>
            <ContextMenu style={{ width: "80px" }} bindType="canvas">
              <CanvasMenu />
            </ContextMenu>
            <ContextMenu style={{ width: "120px" }} bindType="edge">
              <Menu
                options={options.map((item) => {
                  return { ...item, name: `${item.name}-EDGE` };
                })}
                onChange={handleChange}
                bindType="edge"
              />
            </ContextMenu>
          </Graphin>
        </Card>
      </Col>
    </Row>
  );
};
