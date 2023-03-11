import { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

import { NodeResizer } from '@reactflow/node-resizer';

import component1 from './assets/component1.png';

import '@reactflow/node-resizer/dist/style.css';

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Left} />
            <div style={{ padding: 10 }}><img src={component1}></img></div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNodeSelected);
