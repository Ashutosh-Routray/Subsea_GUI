import React, { useEffect, useState, useRef } from "react";
import { memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import styles from "./style.module.css";

import { NodeResizer } from "@reactflow/node-resizer";

import component from "./assets/component1.png";

import "@reactflow/node-resizer/dist/style.css";

const ResizableNodeSelected = ({
  id,
  data,
}) => {
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
    //   console.log(deg);
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
          display: "flex",
        }}
        className={styles.node}
      >
        <img src={component} alt="Component1"></img>
      <NodeResizer
        color="#000000"
        isVisible={resizable}
        minWidth={0}
        minHeight={0}
      ></NodeResizer>
      <div ref={rotateControlRef}
          style={{
            display: rotatable ? 'block' : 'none',
          }}
          className={`nodrag ${styles.rotateHandle}`} ></div>
      <Handle type="source" position={Position.Right} /></div>
    </>
  );
};

export default memo(ResizableNodeSelected);