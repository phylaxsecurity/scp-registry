# app/main.py
from fastapi import FastAPI
from app.routes import prompts, tools, resources, bundle
import uvicorn

app = FastAPI(
    title="Phylax SCP Runtime (MCP-Compatible)",
    version="2.0.0",
    description="Exposes CVE Security Context Protocols for devtools and AI assistants"
)

app.include_router(prompts.router)
app.include_router(tools.router)
app.include_router(resources.router)
app.include_router(bundle.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
