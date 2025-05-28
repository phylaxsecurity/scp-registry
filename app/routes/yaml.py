from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/{cve_id}/yaml")
def get_yaml(cve_id: str):
    scp = load_scp(cve_id)
    if scp and "scp.yaml" in scp:
        return scp["scp.yaml"]
    return {"error": "YAML SCP not found for this CVE"}
