import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode 
      id={id} 
      title="LLM" 
      color="#06b6d4"
      inputs={[
        { id: `${id}-system`, top: "35%" },
        { id: `${id}-prompt`, top: "70%" }
      ]}
      outputs={[{ id: `${id}-response`, top: "50%" }]}
    >
      <div style={{fontSize: 12, opacity: 0.8}}>This is a LLM</div>
    </BaseNode>
  );
};