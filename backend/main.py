from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import deque

app = FastAPI(title="VectorShift Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]


def is_dag(nodes, edges):
    if not nodes:
        return True

    adj = {node["id"]: [] for node in nodes}
    indegree = {node["id"]: 0 for node in nodes}

    for edge in edges:
        adj[edge["source"]].append(edge["target"])
        indegree[edge["target"]] += 1

    q = deque([n for n in indegree if indegree[n] == 0])

    visited = 0

    while q:
        node = q.popleft()
        visited += 1

        for nxt in adj[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    return visited == len(nodes)


@app.get("/ping")
def ping():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):

    nodes = data.nodes
    edges = data.edges

    dag = is_dag(nodes, edges)

    input_text = ""
    text_value = ""
    result = ""

    for node in nodes:

        if node["type"] == "input":
            input_text = node["data"].get("inputName", "")

        if node["type"] == "text":
            text_value = node["data"].get("text", "")

    if "{{variables}}" in text_value:
    result = text_value.replace("{{variables}}", input_text)
else:
    result = f"INPUT=[{input_text}] TEXT=[{text_value}]"

    for node in nodes:
        if node["type"] == "output":
            node["data"]["value"] = result

    print("===== BACKEND DEBUG =====")
    print("INPUT:", input_text)
    print("TEXT:", text_value)
    print("RESULT:", result)
    print("NODES:", nodes)
    print("=========================")

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": dag,
        "input": input_text,
        "result": result,
        "nodes": nodes
    }
