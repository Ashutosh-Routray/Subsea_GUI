import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import { NodeResizer } from '@reactflow/node-resizer';

import component from './assets/component2.png';

import '@reactflow/node-resizer/dist/style.css';


const handleStyleA = { top: 35 };
const handleStyleB = { top: 90 };
const handleStyleC = { top: 65 };
const handleStyleD = { top: 45 };
const handleStyleE = { top: 80 };

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Left} id="c2_input1" style={handleStyleA} />
            <Handle type="target" position={Position.Left} id="c2_input2" style={handleStyleB} />
            <Handle type="target" position={Position.Left} id="c2_input3" style={handleStyleC} />
            <div style={{ padding: 10 }}><img src={component} alt="Component2"></img></div>
            <Handle type="source" position={Position.Right} id="c2_output1" style={handleStyleD} />
            <Handle type="sorce" position={Position.Right} id="c2_output2" style={handleStyleE} />
        </>
    );
};

export default memo(ResizableNodeSelected);
