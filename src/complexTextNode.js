import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import { NodeResizer } from '@reactflow/node-resizer';
import './textNode.css'


import '@reactflow/node-resizer/dist/style.css';

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

            <div style={{ padding: 10 }}>
                <textarea type="text" class="no-outline" rows="4" cols="50" placeholder="Enter Something"></textarea>
            </div>
        </>
    );
};

export default memo(ResizableNodeSelected);
