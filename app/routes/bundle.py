# app/routes/bundle.py
# this is for non-MCP standard call for entire SCP as a single JSON to give full context on a single CVE
from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/scp/{cve_id}/bundle")
def get_scp_bundle(cve_id: str):
    scp = load_scp(cve_id)
    if not scp:
        return {"error": f"No SCP found for {cve_id}"}
    
    key = "scp_bundle/scp_bundle.json"
    return scp.get(key, {"error": "scp_bundle.json not found"})
