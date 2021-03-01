import React from 'react';
import Graphin, {GraphinContext, Utils, Behaviors} from '@antv/graphin';
import {ContextMenu, FishEye} from '@antv/graphin-components';
import {message, Row, Col, Card} from 'antd';
import {TagFilled, DeleteFilled, ExpandAltOutlined} from '@ant-design/icons';
// Do not forget to import CSS
import "antd/dist/antd.css";

const {
    TreeCollapse, // 树图的展开收起
    DragCanvas, // 拖拽画布
    ZoomCanvas, //缩放画布
    ClickSelect, // 点击选中节点
    BrushSelect, //圈选操作
    DragNode, // 拖拽节点
    ResizeCanvas, // 自动调整画布宽高
    LassoSelect, // 拉索操作
    DragCombo, // 拖拽Combo
    ActivateRelations, // 关联高亮
    Hoverable, // Hover操作
} = Behaviors;

const {Menu} = ContextMenu;
const options = [
    {
        key: 'tag',
        icon: <TagFilled/>,
        name: '打标',
    },
    {
        key: 'delete',
        icon: <DeleteFilled/>,
        name: '删除',
    },
    {
        key: 'expand',
        icon: <ExpandAltOutlined/>,
        name: '扩散',
    },
];
const CanvasMenu = props => {
    const {graph, contextmenu} = React.useContext(GraphinContext);
    const context = contextmenu.canvas;
    const handleDownload = () => {
        graph.downloadFullImage('canvas-contextmenu');
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
    const handleOpenFishEye = () => {
        props.handleOpenFishEye();
    };
    return (
        <Menu bindType="canvas">
            <Menu.Item onClick={handleOpenFishEye}>开启鱼眼</Menu.Item>
            <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
            <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
            <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
        </Menu>
    );
};
export default () => {
    const [visible, setVisible] = React.useState(false);
    const handleOpenFishEye = () => {
        setVisible(true);
    };
    const handleClose = () => {
        setVisible(false);
    };
    const data = Utils.mock(5)
        .circle()
        .graphin();
    const handleChange = (menuItem, menuData) => {
        console.log(menuItem, menuData);
        message.info(`元素：${menuData.id}，动作：${menuItem.name}`);
    };
    return (
        <div>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="demo">
                        <Graphin data={data}>
                            <ContextMenu style={{width: '80px'}}>
                                <Menu options={options} onChange={handleChange} bindType="node"/>
                            </ContextMenu>
                            <ContextMenu style={{width: '80px'}} bindType="canvas">
                                <CanvasMenu handleOpenFishEye={handleOpenFishEye}/>
                            </ContextMenu>
                            <ContextMenu style={{width: '120px'}} bindType="edge">
                                <Menu
                                    options={options.map(item => {
                                        return {...item, name: `${item.name}-EDGE`};
                                    })}
                                    onChange={handleChange}
                                    bindType="edge"
                                />
                            </ContextMenu>
                            <FishEye options={{}} visible={visible} handleEscListener={handleClose}/>
                            <ActivateRelations />
                        </Graphin>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};