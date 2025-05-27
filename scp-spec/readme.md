# Security Context Protocol (SCP) Specification – v1.0

Phylax SCP is a structured standard that defines context-aware, machine-consumable security metadata for known vulnerabilities.

### Components of an SCP
- `scp.json`: Vulnerability metadata and links to components
- `context.json`: Prompt engineering blocks for LLM-based tools
- `detection-signatures.json`: Regex/AST patterns for identifying insecure usage
- `examples/`: Source code before/after secure remediation
- `test-cases/eval.json`: Prompt + expected output test cases
- `readme.md`: Developer-oriented documentation

### Use Cases
- AI coding tools (Anthropic, Copilot, Cursor, etc) with secure code awareness
- CI/CD security context validators (Trivy, Gitlab, Github, etc)
- LLM training sets for secure prompt design
- Red/blue team autonomous agents (Horizon3AI, etc)

### Consuming SCPs
- SCPs are versioned and organized by CVE
- Use GitHub raw URLs or mirror to a local registry
- SCPs are machine-readable and validated via `scp-spec/schema.json`
