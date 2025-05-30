from fastapi import APIRouter
from app.scp_loader import load_scp

router = APIRouter()

@router.get("/{cve_id}/context")
def get_context(cve_id: str):
    scp = load_scp(cve_id)
    if not scp:
        return {"error": f"SCP for {cve_id} not found"}

    print(f"[DEBUG] Keys available for {cve_id}: {list(scp.keys())}")

    # Adjusted path based on your directory structure
    if "prompt\\context.json" in scp:
        return scp["prompt\\context.json"]

    return {"error": "context.json not found in 'prompt/' folder"}
