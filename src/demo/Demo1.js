import React from 'react';
import Graphin, {Utils, Behaviors} from '@antv/graphin';
import {ContextMenu, FishEye, MiniMap, Statistic} from '@antv/graphin-components';
import {message} from 'antd';
import "antd/dist/antd.css";
// https://g6.antv.vision/zh/docs/api/graphLayout/guide 后端用机器学习去跑
const {Menu} = ContextMenu;
const data = Utils.mock(100).random().graphin();


const layout = {
    type: 'graphin-force',
    preset: {
        type: 'concentric',
    },
};

const {ZoomCanvas, DragNode, ActivateRelations, FitView} = Behaviors;

// https://g6.antv.vision/zh/docs/api/Behavior  复合交互及其自定义 Behavior
Graphin.registerBehavior('sampleBehavior', {
    getEvents() {
        return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick',
        };
    },
    onClick(evt) {
        // IG6GraphEvent
        console.log(evt);

        const node = evt.item;
        const model = node.getModel();
        message.info(model.id);
        // TODO
    },
    onMousemove(evt) {
        // TODO
    },
    onEdgeClick(evt) {
        // TODO
        console.log(evt, 'edge');
        const node = evt.item;
        const model = node.getModel();


        message.info(model.source + '->' + model.target);

    },
});

const CanvasMenu = props => {
    const handleOpenFishEye = () => {
        props.handleOpenFishEye();
    };
    return (
        <Menu bindType="canvas">
            <Menu.Item onClick={handleOpenFishEye}>开启鱼眼</Menu.Item>
        </Menu>
    );
}

export default () => {

    const [visible, setVisible] = React.useState(false);
    const handleOpenFishEye = () => {
        setVisible(true);
    };
    const handleClose = () => {
        setVisible(false);
    };


    return (
        <div>
            <Graphin data={data} layout={layout} modes={{default: ['sampleBehavior']}}>
                <ZoomCanvas
                    enableOptimize
                />
                <DragNode
                    // disabled
                    enable
                />
                <ActivateRelations
                    // trigger="click"
                />
                <FitView/>
                <ContextMenu style={{width: '80px'}} bindType="canvas">
                    <CanvasMenu handleOpenFishEye={handleOpenFishEye}/>
                </ContextMenu>
                <FishEye options={{showLabel: false}} visible={visible} handleEscListener={handleClose}/>
                {/*<MiniMap visible/>*/}
                <Statistic />
            </Graphin>
        </div>
    );
};