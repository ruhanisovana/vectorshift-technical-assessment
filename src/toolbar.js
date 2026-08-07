  
  const PaletteNode = ({ type, label, color, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      style={{
        minWidth: "95px",
        height: "42px",
        borderRadius: "10px",
        border: "1px solid #2d2d2d",
        borderLeft: `4px solid ${color}`,
        background: "#1a1a1b",
        color: "white",
        fontWeight: 600,
        fontSize: "13px",
        cursor: "pointer",
        transition: "0.2s",
        userSelect: "none",
      }}
    >
      {label}
    </button>
  );
};

export const PipelineToolbar = ({ onAddNode }) => {
  return (
    <div
      style={{
        padding: "14px",
        background: "#111111",
        borderBottom: "1px solid #2b2b2b",
      }}
    >
      {/* Core Nodes */}
      <h4
        style={{
          color: "#dddddd",
          margin: "0 0 10px 0",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        Core Nodes
      </h4>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <PaletteNode
          type="input"
          label="Input"
          color="#6b7280"
          onClick={onAddNode}
        />

        <PaletteNode
          type="llm"
          label="LLM"
          color="#06b6d4"
          onClick={onAddNode}
        />

        <PaletteNode
          type="output"
          label="Output"
          color="#22c55e"
          onClick={onAddNode}
        />

        <PaletteNode
          type="text"
          label="Text"
          color="#7c3aed"
          onClick={onAddNode}
        />
      </div>

      {/* Extra Nodes */}
      <h4
        style={{
          color: "#dddddd",
          margin: "0 0 10px 0",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        Extra Nodes
      </h4>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <PaletteNode
          type="math"
          label="Math"
          color="#f59e0b"
          onClick={onAddNode}
        />

        <PaletteNode
          type="image"
          label="Image"
          color="#ec4899"
          onClick={onAddNode}
        />

        <PaletteNode
          type="email"
          label="Email"
          color="#22c55e"
          onClick={onAddNode}
        />

        <PaletteNode
          type="database"
          label="Database"
          color="#3b82f6"
          onClick={onAddNode}
        />

        <PaletteNode
          type="api"
          label="API"
          color="#22c55e"
          onClick={onAddNode}
        />
      </div>
    </div>
  );
};
