import os
import subprocess
from fastapi import FastAPI
from app.routes import context, yaml, detect
import uvicorn

app = FastAPI(title="Phylax SCP Runtime")

# Clone the CVE registry at startup if not present
CVE_REPO = "https://github.com/phylaxsecurity/scp-registry.git"
if not os.path.exists("cve"):
    subprocess.run(["git", "clone", "--depth", "1", CVE_REPO, "cve"])

app.include_router(context.router, prefix="/scp")
app.include_router(yaml.router, prefix="/scp")
app.include_router(detect.router, prefix="/scp")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
