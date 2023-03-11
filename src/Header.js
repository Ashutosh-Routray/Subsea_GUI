import React, { useState, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';

import { FaSave, FaFolderOpen } from "react-icons/fa";

const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;

export default () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };
        const onAdd = useCallback(() => {
            const newNode = {
                id: getNodeId(),
                data: { label: 'Added node' },
                position: {
                    x: Math.random() * window.innerWidth - 100,
                    y: Math.random() * window.innerHeight,
                },
            };
            setNodes((nds) => nds.concat(newNode));
        }, [setNodes]);
        restoreFlow();
    }, [setNodes, setViewport]);

    const onAdd = useCallback(() => {
        const newNode = {
            id: getNodeId(),
            data: { label: 'Added node' },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);
    return (
        <header className="App-header">
            <div>Subsea Field Layout Editor
                <FaSave />
                <FaFolderOpen />
                <button>save</button>
                <button>restore</button>
            </div>
        </header>
    );
}