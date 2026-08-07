import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // ADD THIS

export const SubmitButton = ({ nodes, edges }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []); // only render on client

  const handleSubmit = async () => {
     alert("Button clicked!");
     console.log("Button clicked!");

  const cleanNodes = nodes.map(n => {
    const { setValue, ...d } = n.data;
    return {
      id: n.id,
      type: n.type,
      data: d
    };
  });

  const flow = {
    nodes: cleanNodes,
    edges
  };

try {
  alert("1");

  const res = await fetch("https://vectorshift-technical-assessment-2.onrender.com/pipelines/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(flow)
  });

  alert("2");

  const data = await res.json();

  alert("3");

  alert(JSON.stringify(data));

} catch (err) {
  alert("ERROR: " + err.message);
}

};
  const button = (
    <button 
      onClick={handleSubmit}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
        color: 'white',
        padding: '14px 32px',
        borderRadius: '12px',
        border: 'none',
        fontWeight: 700,
        fontSize: '16px',
        cursor: 'pointer',
        zIndex: 999,
        boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
      }}
    >
      Submit 
    </button>
  );

  return mounted ? createPortal(button, document.body) : null; // TELEPORT IT
}
