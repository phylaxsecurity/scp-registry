# Phylax Security Context Protocols (SCP)

Welcome to the official SCP registry maintained by **Phylax Security** — a living, open-source repository of deeply structured and AI-ready threat profiles for software vulnerabilities.

This project is based on the Model Context Protocol (MCP) concept and is designed for tools built by Anthropic, OpenAI, Microsoft Copilot, Cursor, Windsurf and other LLM agents to inject security-relevant context into software output during "vibe coding."

> _SCPs are the missing semantic link between CVE intelligence and LLM-aware software development._

---

## What Are SCPs?

**Security Context Protocols (SCPs)** are standardized, context-rich representations of real-world CVEs, focused on:

- Vulnerabilities inherent in source code
- Risks introduced via LLM-generated code
- Developer-relevant injection flaws, deserialization issues, RCEs
- Use in CI/CD pipelines, AI code assistants, IDE plugins, and red team tooling

Each SCP is packaged for:

- ✅ AI prompt alignment (Copilot, VSCode plugins, GPT agents)
- ✅ CI/CD scanning and validation
- ✅ Red teaming and exploit simulation
- ✅ Secure coding education and linting

🔮Future Plans:
- Enterprise-grade SCPs for hardware/network-centric vulnerabilities (available via our future website)
- Data and runtime security-centric SCPs for best practice and prevention of poor coding practices leading to leaking of secrets, API keys, and escalation from multiple attack vectors

---

📁 Repository Structure
scp-registry/
```
├── manifest.json
├── resources/
   └── CVE-YYYY-NNNNN/
       ├── scp.json
       ├── scp.yaml
       ├── scp_bundle.json
       ├── red-team-payloads.txt
       ├── mitigation-steps.md
       ├── detection-guidance.md
       └── research-links.md
├── prompts/
   └── CVE-YYYY-NNNNN/
       └── context.json
├── tools/
   └── detection/
       └── CVE-YYYY-NNNNN_detect_sig.json
```

🚀 Getting Started
For Claude Desktop:
Note: You must have a Claude Pro subscription for MCP servers to be allowed to be integrated

Clone the Repository
```
git clone https://github.com/phylaxsecurity/scp-registry.git
cd scp-registry-main
```
install node.js: https://nodejs.org/en/download
open terminal (if on windows, run in administrator)
navigate to your local directory for the cloned repo
```npm install```

🧠 MVP Integration (5.30.2025) Integrating with Claude Desktop
Download the repository to your local machine.

- Open Claude Desktop.
- Go to Settings
- Open the config.json file for Claude
- Copy claude_desktop_config.json to the Claude config.json file:
```
{
  "mcpServers": {
    "phylax-scp-registry": {
      "command": "node",
      "args": ["[insertlocaldirectory]\\server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```
Change insertlocaldirectory for your installed directory

🔧 Runtime Server (Optional)
For advanced integrations, deploy the FastAPI-based runtime server:
```
cd scp-runtime
docker compose up
```
Access the API documentation at: http://localhost:8000/docs

🤝 Contributing
We welcome contributions to expand and enhance the SCP Registry:

Fork the repository.

Create a new CVE directory under resources/ following the existing structure.

Submit a pull request with your additions.

Please ensure adherence to the MCP standards and the structure we've layed out here for consistency outlined in scp-spec/.

📄 License
This project is licensed under the Elastic License v2, which allows free use, modification, and redistribution, with the restriction that you may not provide the SCPs as a service without a separate commercial agreement.

For more information, visit our GitHub Repository.
---

*Build securely. Code consciously. Defend contextually.*  
