import { useState, useEffect } from "react";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  // Save to store whenever currText changes
  const updateStore = (value) => {
    if (typeof data.setValue === 'function') {
      data.setValue(id, { text: value }); // <-- pass object
    }
  };

  // 1. Auto-resize + save
  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateStore(value);

    // auto resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // 2. Sync from store on first load + parse {{variable}}
  useEffect(() => {
    if (data.text) setCurrText(data.text); // load saved text

    const matches = [...currText.matchAll(/\{\{(\w+)\}\}/g)];
    const vars = [...new Set(matches.map(m => m[1]))]; // unique
    setVariables(vars);
  }, [currText, data.text]);

  // Build inputs: 1 for each variable + 1 default if no variables
  const inputs = variables.length > 0
   ? variables.map(v => ({ id: `${id}-${v}`, top: null }))
    : [{ id: `${id}-input` }];

  return (
    <BaseNode
      id={id}
      title="Text"
      color="#7c3aed"
      inputs={inputs}
      outputs={[{id: `${id}-output`}]}
    >
      <label style={{ fontSize: 12, opacity: 0.8 }}>Text:</label>
      <textarea
        value={currText}
        onChange={handleTextChange}
        placeholder="Use {{variable}} to create inputs"
        style={{
          width: '100%',
          minHeight: 60,
          background: '#0f0f10',
          border: '1px solid #2a2a2b',
          color: 'white',
          borderRadius: 4,
          padding: 6,
          marginTop: 6,
          resize: 'none',
          fontSize: 13,
          fontFamily: 'inherit',
          overflow: 'hidden'
        }}
      />
      {variables.length > 0 && (
        <div style={{ fontSize: 11, marginTop: 6, opacity: 0.6 }}>
          Inputs: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};