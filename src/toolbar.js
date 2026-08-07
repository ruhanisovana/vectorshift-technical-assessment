const btnBase = {
  background: '#1a1a1b',
  border: '1px solid #2a2a2b',
  color: 'white',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '13px',
  borderLeft: '3px solid',
  minWidth: '90px',
  userSelect: 'none'
}

const PaletteNode = ({ type, label, color, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      style={{...btnBase, borderLeftColor: color}}
    >
      {label}
    </button>
  );
}

export const PipelineToolbar = ({ onAddNode }) => {
  const NODE_LIST = [
    {type: "input", label: "Input", color: "#6b7280"},
    {type: "llm", label: "LLM", color: "#06b6d4"},
    {type: "output", label: "Output", color: "#6b7280"},
    {type: "text", label: "Text", color: "#7c3aed"},
    {type: "math", label: "Math", color: "#f59e0b"},
    {type: "image", label: "Image", color: "#ec4899"},
    {type: "email", label: "Email", color: "#22c55e"},
    {type: "database", label: "Database", color: "#3b82f6"},
    {type: "api", label: "API", color: "#22c55e"},
  ]

  return (
  <div  style={{
  display: "flex",
  gap: "10px",
  padding: "14px",
  background: "#111111",
  borderBottom: "1px solid #2b2b2b",
  flexWrap: "wrap",
  justifyContent: "center",
}}

/>
    
      {NODE_LIST.map(n => (
        <PaletteNode 
          key={n.type} 
          type={n.type} 
          label={n.label} 
          color={n.color} 
          onClick={onAddNode}
        />
      ))}
    </div>
  );
}
