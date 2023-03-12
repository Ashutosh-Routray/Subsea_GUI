import React, { useState, useRef, useCallback } from 'react';

import ReactFlow, {
  Edge,
  Position,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  updateEdge,
  ConnectionLineType,
  MarkerType,
  useOnSelectionChange,
   useReactFlow,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Component1 from './component1_node';
import Component2 from './component2_node';
import Component3 from './component3_node';
import TextNode from './textNode';
import Sidebar from './Sidebar';
import ComplexTextBox from './complexTextNode'

import MuiAlert from '@mui/material/Alert';

import SaveIcon from '@mui/icons-material/Save';
import OpenIcon from '@mui/icons-material/FileOpen';
import IconButton from '@mui/material/IconButton';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';

import './index.css';

const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = {
  Component1,
  Component2,
  Component3,
  TextNode,
  ComplexTextBox,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openOth, setOpenOth] = React.useState(false);
  const [openClean, setClean] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseOth = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenOth(false);
  };

  const handleCloseBtn = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setClean(false);
  };

  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({
    ...params, animated:true, style: { stroke: '#000000' } , markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#000000',
    },
  }, eds)), []);

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
  //   []
  // );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: (type === "Component1") ? ("Component1") : ((type === "Component2") ? ("Component2") : ((type === "Component3") ? ("Component3") : ((type === "text") ? ("TextNode") : ("ComplexTextBox")))),
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSave = useCallback(() => {
    setOpen(true);
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(flow)
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    setOpenOth(true);
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onClean = useCallback(() => {
    setClean(true);
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log(flow);
      const { x = 0, y = 0, zoom = 1 } = { x: 0, y: 0, zoom: 0 };
      setNodes([]);
      setEdges([]);
      setViewport({ x, y, zoom });
    };

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
    <div className="dndflow">


      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <header class="App-header">
            <div className="Header-spacer">
              <label>SubSea Field Layout Editor</label>
              <Tooltip title="Save Layout">
                <IconButton onClick={onSave} variant="contained">
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open Layout">
                <IconButton onClick={onRestore} variant="contained" >
                  <OpenIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Clean workspace">
                <IconButton onClick={onClean} variant="contained" tooltip="Clean Workspace">
                  <CleaningServicesIcon />
                </IconButton>
              </Tooltip>
              <label>by <code>code-inc.</code></label>
            </div>
          </header>
          <ReactFlow
            connectionLineType={ConnectionLineType.SmoothStep}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            nodeTypes={nodeTypes}


          >
            <Background variant="dots" gap={12} size={2} />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Layout Saved Successfully!
              </Alert>
            </Snackbar>
            <Snackbar open={openOth} autoHideDuration={3000} onClose={handleCloseOth}>
              <Alert onClose={handleCloseOth} severity="info" sx={{ width: '100%' }}>
                Loaded saved layout!
              </Alert>
            </Snackbar>
            <Snackbar open={openClean} autoHideDuration={3000} onClose={handleCloseOth}>
              <Alert onClose={handleCloseBtn} severity="info" sx={{ width: '100%' }}>
                Cleaned Workspace!
              </Alert>
            </Snackbar>
            <Controls />
          </ReactFlow>
        </div>

        <MiniMap />
      </ReactFlowProvider >

    </div >
  );
};


export default () => (
  <ReactFlowProvider>
    <App />
    <Sidebar />
  </ReactFlowProvider>
);