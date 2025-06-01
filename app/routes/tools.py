# app/routes/tools.py
from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/Tools/{cve_id}")
def get_tools(cve_id: str):
    scp = load_scp(cve_id)
    if not scp:
        return {"error": f"No SCP found for {cve_id}"}
    
    tools = {}
    if "detection-signatures.json" in scp:
        tools["detection-signatures"] = scp["detection-signatures.json"]
    if "red-team-payloads.txt" in scp:
        tools["red-team-payloads"] = scp["red-team-payloads.txt"]

    return tools if tools else {"error": "No tools found"}
