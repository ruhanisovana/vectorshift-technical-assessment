export const PaletteNode = ({ type, label, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}  // <-- tap instead of drag
      style={{ 
        cursor: 'pointer', 
        minWidth: '90px', 
        height: '40px',
        display: 'flex', 
        alignItems: 'center', 
        borderRadius: '8px',
        backgroundColor: '#1C2536',
        border: '1px solid #2a2a2b',
        justifyContent: 'center', 
        color: '#fff',
        fontSize: 14,
        fontWeight: 500,
        margin: '4px'
      }} 
    >
        {label}
    </button>
  );
};