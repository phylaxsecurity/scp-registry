from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/{cve_id}/context")
def get_context(cve_id: str):
    scp = load_scp(cve_id)
    if scp and "context.json" in scp:
        return scp["context.json"]
    return {"error": "Context not found for this CVE"}
