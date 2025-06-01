# app/routes/resources.py
from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/Resources/{cve_id}")
def get_resources(cve_id: str):
    scp = load_scp(cve_id)
    if not scp:
        return {"error": f"No SCP found for {cve_id}"}
    
    resources = {}
    if "examples/examples.json" in scp:
        resources["examples"] = scp["examples/examples.json"]
    if "test-cases/eval.json" in scp:
        resources["test-cases"] = scp["test-cases/eval.json"]
    if "scp.json" in scp:
        resources["scp-metadata"] = scp["scp.json"]

    return resources if resources else {"error": "No resources found"}
