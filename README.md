# 🛡️ Phylax Security Context Protocols (SCP)

Welcome to the official SCP registry maintained by **Phylax Security** — a living, open-source repository of deeply structured and AI-ready threat profiles for software vulnerabilities.

This project is based on the **Model Context Protocol (MCP)** concept and is designed for tools like **Anthropic, OpenAI, Copilot, Cursor**, and other LLM agents to inject security-relevant context into software output during "vibe coding."

> _SCPs are the missing semantic link between CVE intelligence and LLM-aware software development._

---

## 📌 What Are SCPs?

**Security Context Protocols (SCPs)** are standardized, context-rich representations of real-world CVEs, focused on:

- Vulnerabilities inherent in **source code**
- Risks introduced via **LLM-generated code**
- Developer-relevant **injection flaws, deserialization issues, RCEs**
- Use in **CI/CD pipelines, AI code assistants, IDE plugins, and red team tooling**

Each SCP is packaged for:

- ✅ AI prompt alignment (Copilot, VSCode plugins, GPT agents)
- ✅ CI/CD scanning and validation
- ✅ Red teaming and exploit simulation
- ✅ Secure coding education and linting

---

## 📦 SCP Structure

Each SCP lives under:

```
cve/
  └── CVE-YYYY-NNNNN/
      ├── scp.json                # Machine-readable SCP metadata
      ├── scp.yaml                # Declarative, AI-friendly version
      ├── readme.md               # Human-readable summary
      ├── prompt/context.json     # Role-based LLM prompt contexts
      ├── examples/               # Secure + insecure code examples
      ├── test-cases/eval.json    # Prompt test harness
      ├── detection-signatures.json # Regex/AST scan rules
      ├── red-team-payloads.txt   # Live exploit simulation patterns
      ├── mitigation-steps.md     # How to patch and harden code
      ├── detection-guidance.md   # SOC and log monitoring indicators
      └── research-links.md       # External advisories, research, POCs
```

---

## 🚀 SCP Runtime Server (Optional)

To enable real-time programmatic access by AI agents, developer tools, or internal scanners, deploy the included **FastAPI-based SCP runtime**.

### 🔧 How to Run (Locally)

```bash
cd scp-runtime
pip install -r requirements.txt
python app/main.py
```

> This clones the `scp-registry` repo and serves all SCPs via REST endpoints

### 🐳 Run via Docker

```bash
docker build -t phylax-scp-runtime .
docker run -p 8000:8000 phylax-scp-runtime
```

### ⛓️ API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/scp/{CVE}/context` | LLM prompt injection context |
| `/scp/{CVE}/yaml`    | YAML representation of the SCP |
| `/scp/{CVE}/detect`  | Detection logic (regex, AST, payloads) |

Ready for use in AI agents, Copilot-like integrations, internal tooling, or plugins.

---

## 🔎 Who Is This For?

- 💻 **Developers & DevSecOps** — Fix vulnerabilities with contextual guidance
- 🤖 **AI Engineers** — Inject security intelligence into LLM workflows
- 🧪 **Red Teamers** — Simulate and validate real-world exploits
- 🧱 **Security Vendors** — Plug SCPs into SAST/DAST/code security tools
- 🎓 **Educators** — Train developers using structured CVE walkthroughs

---

## 🧰 How to Use

### Clone the Registry

```bash
git clone https://github.com/phylaxsecurity/scp-registry.git
cd scp-registry
```

### Browse SCPs

```bash
ls cve/
```

### Validate Format

```bash
python validate_scp.py --schema scp-spec/schema.json --file cve/**/scp.json
```

### Deploy as a Microservice

```bash
cd scp-runtime
docker compose up
```

> All SCPs will be served as micro-APIs for consumption in CI/CD, IDEs, or agents.

---

## 📥 Contributing

Help build the world's first AI-ready CVE registry:

1. Fork the repo
2. Use `scp-template.yaml` and `scp-template.json`
3. Submit a PR or open an issue

We especially welcome:

- CVEs with CWE-502, CWE-20, CWE-79, CWE-94, CWE-22
- Languages: Java, Python, JavaScript, Go, Rust, TypeScript

---

## 🔐 Licensing

SCPs are published under the **Elastic License v2**, which:

- ✅ Allows free use, modification, and redistribution
- 🚫 Disallows reselling SCPs as a service (SCPaaS) without negotiating specific terms of use
---

## 📡 Future Plans

- 🔒 Authentication + rate-limited SCP APIs
- 🧩 GitHub Action and VSCode plugin integrations
- ☁️ SCP-as-a-Service telemetry layer
- 🪲 Auto-SCP agent for CVE ingestion and enrichment

---

*Build securely. Code consciously. Defend contextually.*  
