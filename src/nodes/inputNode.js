import { useState, useEffect } from "react";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace("customInput-", "input_"));
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  useEffect(() => {
    if (data.inputName) setCurrName(data.inputName);
    if (data.inputType) setInputType(data.inputType);
  }, [data.inputName, data.inputType]);

  const updateData = (name, type) => {
    if (typeof data.setValue === 'function') {
      data.setValue(id, { inputName: name, inputType: type });
    }
  }

  return (
    <BaseNode id={id} title="Input" color="#6b7280" outputs={[{id: `${id}-value`}]}>
      <label style={{display: 'block', marginBottom: 6}}>Name: 
        <input value={currName} onChange={(e) => {setCurrName(e.target.value); updateData(e.target.value, inputType)}} 
        style={{width: '100%', background: '#0f0f10', border: '1px solid #2a2a2b', color: 'white', borderRadius: 4, padding: 4, marginTop: 4}} />
      </label>
      <label>Type: 
        <select value={inputType} onChange={(e) => {setInputType(e.target.value); updateData(currName, e.target.value)}}
        style={{width: '100%', background: '#0f0f10', border: '1px solid #2a2a2b', color: 'white', borderRadius: 4, padding: 4, marginTop: 4}}>
          <option value="Text">Text</option><option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};