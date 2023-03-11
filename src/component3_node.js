import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import { NodeResizer } from '@reactflow/node-resizer';

import component from './assets/component3.png';

import '@reactflow/node-resizer/dist/style.css';

const handleStyleA = { left: 80 };
const handleStyleB = { left: 200 };
const handleStyleC = { left: 220 };


const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <div style={{ padding: 10 }}><img src={component} alt="Component3"></img></div>
            <Handle type="target" position={Position.Bottom} id="a" style={handleStyleA} />
            <Handle type="target" position={Position.Bottom} id="b" style={handleStyleB} />
            <Handle type="target" position={Position.Bottom} id="c" style={handleStyleC} />

        </>
    );
};

export default memo(ResizableNodeSelected);
