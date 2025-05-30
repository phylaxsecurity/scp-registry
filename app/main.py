from fastapi import FastAPI
from app.routes import context, detect, yaml
import uvicorn

app = FastAPI(
    title="Phylax SCP Runtime",
    version="1.0.1",
    description="Serves SCPs for CVEs as API endpoints for dev tools and AI agents"
)

# Register route modules
app.include_router(context.router, prefix="/cve")
app.include_router(detect.router, prefix="/cve")
app.include_router(yaml.router, prefix="/cve")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
