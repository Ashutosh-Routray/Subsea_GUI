import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import { NodeResizer } from '@reactflow/node-resizer';

import component from './assets/component1.png';

import '@reactflow/node-resizer/dist/style.css';

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

            <div style={{ padding: 10 }}><img src={component} alt="Component1"></img></div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNodeSelected);
