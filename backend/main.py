from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import deque

app = FastAPI(title="VectorShift Backend")

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # sirf "*" rakho
    allow_credentials=False, # False kar do
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

def is_dag(nodes, edges):
    if not nodes: return True
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}

    for edge in edges:
        adj[edge['source']].append(edge['target'])
        in_degree[edge['target']] += 1

    q = deque([n for n in in_degree if in_degree[n] == 0])
    visited = 0

    while q:
        node = q.popleft()
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)

    return visited == len(nodes)

@app.get('/ping')
def ping():
    return {"Ping": "Pong"}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    nodes = data.nodes
    edges = data.edges
    
    is_valid_dag = is_dag(nodes, edges)
    
    input_node = next((n for n in nodes if n.get("type") == "input"), None)
    output_node = next((n for n in nodes if n.get("type") == "output"), None)
    
    # FIXED: input uses inputName, output uses value
    input_text = input_node["data"]["inputName"] if input_node else "No Input"
    output_text = output_node["data"]["value"] if output_node else "No Output"
    
    result_text = output_text
    if is_valid_dag and input_text:
        result_text = f"AI Response to: {input_text}" # fake LLM logic
    
    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_valid_dag,
        "input": input_text,
        "result": result_text
    }