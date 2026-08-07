import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, color = '#7c3aed', inputs = [], outputs = [], children }) => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1b 0%, #131314 100%)',
      border: '1px solid #2a2a2b',
      borderRadius: '8px',
      padding: '0',
      width: '220px',
      minWidth: '220px',
      boxShadow: `0 0 0 1px ${color}33, 0 4px 12px rgba(0,0,0,0.4)`,
      color: 'white',
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        padding: '10px 12px',
        borderBottom: '1px solid #2a2a2b'
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }}></div>
        <span style={{ fontWeight: 600 }}>{title}</span>
      </div>

      <div style={{ padding: '12px' }}>
        {children}
      </div>

      {inputs.map((input, idx) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ 
            background: color, 
            width: 14,
            height: 14,
            border: '2px solid #131314',
            zIndex: 100,
            top: input.top || `${(idx + 1) * (100 / (inputs.length + 1))}%`
          }}
        />
      ))}

      {outputs.map((output, idx) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ 
            background: color, 
            width: 14,
            height: 14,
            border: '2px solid #131314',
            zIndex: 100,
            top: output.top || `${(idx + 1) * (100 / (outputs.length + 1))}%`
          }}
        />
      ))}
    </div>
  );
}