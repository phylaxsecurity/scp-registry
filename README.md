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

---

📁 Repository Structure
pgsql
Copy
Edit
scp-registry/
├── manifest.json
├── resources/
│   └── CVE-YYYY-NNNNN/
│       ├── scp.json
│       ├── scp.yaml
│       ├── scp_bundle.json
│       ├── red-team-payloads.txt
│       ├── mitigation-steps.md
│       ├── detection-guidance.md
│       └── research-links.md
├── prompts/
│   └── CVE-YYYY-NNNNN/
│       └── context.json
├── tools/
│   └── detection/
│       └── CVE-YYYY-NNNNN_detect_sig.json
resources/: Contains core SCP files per CVE.

prompts/: Houses LLM prompt contexts for each CVE.

tools/detection/: Includes detection signatures for vulnerability scanning.

🚀 Getting Started
Clone the Repository
bash
Copy
Edit
git clone https://github.com/phylaxsecurity/scp-registry.git
cd scp-registry
Explore Available CVEs
bash
Copy
Edit
ls resources/
Validate SCP Files
bash
Copy
Edit
python validate_scp.py --schema scp-spec/schema.json --file resources/**/scp.json
🧠 Integrating with Claude Desktop
Download the repository to your local machine.

Open Claude Desktop.

Drag and Drop the entire scp-registry folder into Claude.

Prompt Claude with:

"Utilize the uploaded SCPs to assist in identifying and mitigating CVE-related vulnerabilities in my code."

Claude will automatically parse the manifest.json and structure, providing contextual assistance based on the SCP data.

🔧 Runtime Server (Optional)
For advanced integrations, deploy the FastAPI-based runtime server:

bash
Copy
Edit
cd scp-runtime
docker compose up
Access the API documentation at: http://localhost:8000/docs

🤝 Contributing
We welcome contributions to expand and enhance the SCP Registry:

Fork the repository.

Create a new CVE directory under resources/ following the existing structure.

Submit a pull request with your additions.

Please ensure adherence to the MCP standards outlined in scp-spec/.

📄 License
This project is licensed under the Elastic License v2, which allows free use, modification, and redistribution, with the restriction that you may not provide the SCPs as a service without a separate commercial agreement.

For more information, visit our GitHub Repository.
---

*Build securely. Code consciously. Defend contextually.*  
