import React, { useEffect, useState, useRef } from "react";
import { memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import styles from "./style.module.css";

import { NodeResizer } from '@reactflow/node-resizer';

import component from './assets/component3.png';

import '@reactflow/node-resizer/dist/style.css';

const handleStyleA = { left: 52 };
const handleStyleB = { left: 175 };
const handleStyleC = { left: 190 };


const ResizableNodeSelected = ({ id, data}) => {

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
        minWidth={100}
        minHeight={30}
      />
      <div ref={rotateControlRef}
          style={{
            display: rotatable ? 'block' : 'none',
          }}
          className={`nodrag ${styles.rotateHandle}`} ></div>
            <NodeResizer color="#000000" isVisible={resizable} minWidth={100} minHeight={30} />
            <div style={{ padding: 0 }}><img src={component} alt="Component3"></img></div>
            <Handle type="target" position={Position.Bottom} id="a" style={handleStyleA} />
            {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyleA} /> */}
            <Handle type="target" position={Position.Bottom} id="b" style={handleStyleB} />
            <Handle type="target" position={Position.Bottom} id="c" style={handleStyleC} /></div>

        </>
    );
};

export default memo(ResizableNodeSelected);