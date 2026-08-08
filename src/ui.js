import { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { ImageNode } from './nodes/ImageNode';
import { EmailNode } from './nodes/EmailNode';
import { DatabaseNode } from './nodes/DatabaseNode';
import { APINode } from './nodes/APINode';
import { PipelineToolbar } from './toolbar';
import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const createNodeTypes = (setValue) => ({
  input: (props) => <InputNode {...props} data={{...props.data, setValue}} />,
  llm: (props) => <LLMNode {...props} data={{...props.data, setValue}} />,
  output: (props) => <OutputNode {...props} data={{...props.data, setValue}} />,
  text: (props) => <TextNode {...props} data={{...props.data, setValue}} />,
  math: (props) => <MathNode {...props} data={{...props.data, setValue}} />,
  image: (props) => <ImageNode {...props} data={{...props.data, setValue}} />,
  email: (props) => <EmailNode {...props} data={{...props.data, setValue}} />,
  database: (props) => <DatabaseNode {...props} data={{...props.data, setValue}} />,
  api: (props) => <APINode {...props} data={{...props.data, setValue}} />,
});

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
    
    const setNodes = useStore((state) => state.setNodes);

    const setValue = useCallback((nodeId, newData) => {
      useStore.setState((state) => ({
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            return {...node, data: {...node.data,...newData }};
          }
          return node;
        }),
      }));
    }, []);

    const nodeTypes = useMemo(() => createNodeTypes(setValue), [setValue]);

    const nodesWithSetValue = useMemo(() =>
      nodes.map(node => ({
       ...node,
        data: {
         ...node.data,
          setValue
        }
      })),
    [nodes, setValue]);

    const getInitNodeData = (nodeID, type) => {
  if(type === 'text') return { id: nodeID, text: '' }
  if(type === 'input') return { id: nodeID, inputName: '', inputType: 'Text' } // NOW HAS DEFAULTS
  if(type === 'output') return { id: nodeID, value: 'Waiting for input...' }
  return { id: nodeID };
}

    const handleAddNode = useCallback((nodeType) => {
      const position = reactFlowInstance
       ? reactFlowInstance.project({ x: window.innerWidth / 2 - 100, y: 250 })
        : { x: 250, y: 150 };

      const nodeID = getNodeID(nodeType);
      const newNode = {
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType)
      };
      addNode(newNode);
    }, [reactFlowInstance, addNode, getNodeID]);

    return (
    
        <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0e0e0f', overflow: 'hidden'}}>

          <PipelineToolbar onAddNode={handleAddNode} />

          {/* FIX 2: FULL SCREEN WHITE AREA */}
          <div style={{flex: 1, position: 'relative', width: '100%', height: 'calc(100vh - 70px)', background: '#1e1e1e'}}>
        
                    <ReactFlow
                nodes={nodesWithSetValue}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{ style: { stroke: '#7c3aed', strokeWidth: 2 } }}
                fitView
            >
                <Background
    color="#2d2d2d"
    gap={24}
    size={1}
/>
                <Controls
showInteractive={false}
/>
                <MiniMap
  nodeColor={(node) => {
    switch (node.type) {
      case "input":
        return "#6b7280";
      case "llm":
        return "#06b6d4";
      case "text":
        return "#7c3aed";
      case "output":
        return "#22c55e";
      case "math":
        return "#f59e0b";
      case "image":
        return "#ec4899";
      case "database":
        return "#3b82f6";
      case "email":
        return "#22c55e";
      case "api":
        return "#22c55e";
      default:
        return "#888";
    }
  }}
  maskColor="rgba(0,0,0,0.25)"
  pannable
  zoomable
  style={{
    width: 170,
    height: 120,
    background: "#222",
    border: "1px solid #555",
    borderRadius: 10
  }}
/>
            </ReactFlow>
            
        </div>
        
        
            <SubmitButton nodes={nodesWithSetValue} edges={edges} setNodes={setNodes}/>

            
      </div>
    )
}
