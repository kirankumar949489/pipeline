from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx
from typing import Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pipeline-git-main-kiran-kumars-projects-605f38ec.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pipelines/parse")
async def parse_pipeline(data: Dict):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    G = nx.DiGraph()
    G.add_nodes_from([node['id'] for node in nodes])
    G.add_edges_from([(e['source'], e['target']) for e in edges if 'source' in e and 'target' in e])
    
    is_dag = nx.is_directed_acyclic_graph(G)
    num_nodes = len(nodes)
    num_edges = len(edges)

    if num_nodes > 0:
        num_components = nx.number_weakly_connected_components(G)
        has_unconnected = num_components > 1
    else:
        has_unconnected = False
        num_components = 0

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
        "pipeline_status": "Complete" if not has_unconnected else f"Incomplete ( {num_components} unconnected components )"
    }
