import React, { useEffect, useState, useRef } from "react";
import { memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import styles from "./style.module.css";

import { NodeResizer } from "@reactflow/node-resizer";

import component from './assets/component2.png';

import '@reactflow/node-resizer/dist/style.css';

let handleStyleA = { top: 19 };
let handleStyleB = { top: 44 };
const handleStyleC = { top:  68};
const handleStyleD = { top: 29 };
const handleStyleE = { top: 59 };

const ResizableNodeSelected = ({ id,data }) => {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(true);
  const [rotatable, setRotatable] = useState(true);
  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);


    return (
        <>
        <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className={styles.node}
      >
            <NodeResizer
        color="#000000"
        isVisible={resizable}
        minWidth={10}
        minHeight={10}
        
      />
            <Handle type="target" position={Position.Left} id="c2_input1" style={handleStyleA} />
            <Handle type="target" position={Position.Left} id="c2_input2" style={handleStyleB} />
            <Handle type="target" position={Position.Left} id="c2_input3" style={handleStyleC} />
            <img height="100%" width="100%" src={component} alt="Component2"></img>
            <Handle type="source" position={Position.Right} id="c2_output1" style={handleStyleD} />
            <Handle type="sorce" position={Position.Right} id="c2_output2" style={handleStyleE} />
            <div ref={rotateControlRef}
          style={{
            display: rotatable ? 'block' : 'none',
          }}
          className={`nodrag ${styles.rotateHandle}`} ></div>   
          </div>
        </>
    );
};

export default memo(ResizableNodeSelected);