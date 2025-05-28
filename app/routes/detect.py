from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/{cve_id}/detect")
def get_detection_signatures(cve_id: str):
    scp = load_scp(cve_id)
    if scp and "detection-signatures.json" in scp:
        return scp["detection-signatures.json"]
    return {"error": "Detection signatures not found for this CVE"}
