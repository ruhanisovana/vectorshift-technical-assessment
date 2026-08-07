import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const SubmitButton = ({ nodes, edges }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleSubmit = async () => {

  const cleanNodes = nodes.map((n) => {
    const { setValue, ...data } = n.data;

    return {
      id: n.id,
      type: n.type,
      data,
    };
  });

  const flow = {
    nodes: cleanNodes,
    edges,
  };

  try {

    const res = await fetch(
      "https://vectorshift-technical-assessment-2.onrender.com/pipelines/parse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flow),
      }
    );

    if (!res.ok) {
      throw new Error("Server Error");
    }

    const data = await res.json();

    console.log(data);

    alert(
`Nodes : ${data.num_nodes}
Edges : ${data.num_edges}
DAG : ${data.is_dag}
Input : ${data.input}
Result : ${data.result}`
    );

  } catch (err) {
    alert(err.message);
  }
};
  const button = (
    <button
      onClick={handleSubmit}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "14px 30px",
        border: "none",
        borderRadius: "12px",
        background: "#7c3aed",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      Submit Pipeline
    </button>
  );

  return mounted ? createPortal(button, document.body) : null;
};
