# 🛡️ Phylax Security Context Protocols (SCP)

Welcome to the official SCP registry maintained by **Phylax Security** — a living, open-source repository of deeply structured and AI-ready threat profiles for software vulnerabilities. This standard off of the Model Context Protocol (MCP) concept for AI tools is primarily for assisting maintream tools (Anthropic, OpenAI, Copilot, Cursor, etc) in ensuring "Vibe Coded" software outputs have security-relevant context in their builds. 

We are releasing this as open source as these tools become even more mainstream in everyday life. 

"SCPs are the missing semantic link between CVE intelligence and LLM-aware software development."

---

## 📌 What Are SCPs?

**Security Context Protocols (SCPs)** are standardized, context-rich representations of real-world CVEs, focused specifically on:

* Vulnerabilities inherent in **source code**
* Risks introduced via **LLM-generated code** (e.g., Copilot, ChatGPT)
* Developer-relevant **injection flaws, deserialization issues, and RCEs**
* Use in **CI/CD pipelines, LLM agents, IDE security tools, and red team simulators**

Each SCP is packaged to support:

* ✅ AI prompt alignment (Copilot, VSCode plugins, GPT agents)
* ✅ CI/CD scanning and validation
* ✅ Red teaming and risk analysis
* ✅ Code education and refactoring

---

## 📦 SCP Structure

Every SCP lives under:

```
cve/
  └── CVE-YYYY-NNNNN/
      ├── scp.json                # Machine-readable metadata
      ├── scp.yaml                # Human/declarative friendly version
      ├── readme.md               # Human-readable SCP summary
      ├── prompt/context.json     # LLM prompt roles (auditor, coach, red team)
      ├── examples/               # Secure & insecure code samples
      ├── test-cases/eval.json    # Prompt test harness
      ├── detection-signatures.json # Regex & AST patterns
      ├── red-team-payloads.txt   # Exploitable patterns for simulation
      ├── mitigation-steps.md     # Patching, hardening, and coding best practices
      ├── detection-guidance.md   # What to monitor for
      └── research-links.md       # Vendor and community writeups
```

---

## 🔎 Who Is This For?

* 💻 **Developers & DevSecOps** — Understand and fix real-world CVEs in code
* 🤖 **AI Engineers** — Inject SCPs into prompt-based coding agents
* 🧪 **Red Teamers** — Simulate exploit flows programmatically
* 🧱 **Security Tools** — Integrate detection logic and CVE profiles as plug-and-play modules
* 🎓 **Educators** — Teach vulnerability classes through contextual examples

---

## 🧰 How to Use

### Clone the Repo

```bash
git clone https://github.com/phylaxsecurity/scp-registry.git
cd scp-registry
```

### Browse SCPs by CVE

```bash
ls cve/
```

### Validate SCP Files

```bash
python validate_scp.py --schema scp-spec/schema.json --file cve/**/scp.json
```

> A GitHub Action automatically validates PRs using `.github/workflows/validate-scp.yml`

---

## 📥 Contributing

Want to help scale secure software?

1. Fork the repo
2. Use `scp-template.yaml` and `scp-template.json`
3. Submit a PR or open an issue for CVEs you'd like to SCP-ify

📬 We’re particularly interested in:

* CVEs with CWE-502, CWE-20, CWE-79, CWE-94, CWE-22
* Languages: Java, Python, JavaScript, TypeScript, Go, Rust

---

## 🔐 Licensing

All SCPs published in this repository are open-sourced under the **Elastic License v2**, which:

* ✅ Allows free use, modification, and redistribution
* 🚫 Prohibits offering the content as a service (SCP-as-a-Service) without commercial terms

**Why Elastic License v2?**
To ensure SCPs remain open and accessible to developers and researchers, but not monetized by downstream vendors without contributing back.

➡️ For commercial partnerships, OEM embedding, or private SCP APIs, please contact Phylax Security.

> A commercial license covering enhanced SCPs, AI plugin bundles, and enriched telemetry layers is available upon request.

See [`LICENSE`](./LICENSE) and [`LICENSE-PRO`](./LICENSE-PRO) for full terms.

---



---

*Build securely. Code consciously. Defend contextually.*
