import { useState, useEffect } from "react";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [outputValue, setOutputValue] = useState('Waiting for input...');

  useEffect(() => {
    if (data.value) setOutputValue(data.value);
  }, [data.value]);

  return (
    <BaseNode id={id} title="Output" color="#22c55e" inputs={[{id: `${id}-value`}]}>
      {/* REMOVED Name and Type inputs */}
      
      {/* ONLY SHOW OUTPUT RESULT */}
      <div style={{
        padding: 12, 
        background: '#1f1f20', 
        borderRadius: 6, 
        border: '1px solid #2a2a2b',
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: 'white',
        wordWrap: 'break-word'
      }}>
        {outputValue}
      </div>
    </BaseNode>
  );
};
