#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PhylaxSCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'phylax-scp-registry',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const resources = [];
      
      try {
        // Scan resources directory for CVE folders
        const resourcesPath = path.join(__dirname, 'resources');
        const entries = await fs.readdir(resourcesPath, { withFileTypes: true });
        
        for (const entry of entries) {
          if (entry.isDirectory() && entry.name.startsWith('CVE-')) {
            const cvePath = path.join(resourcesPath, entry.name);
            
            // Add SCP bundle resource
            resources.push({
              uri: `scp://resources/${entry.name}/bundle`,
              name: `${entry.name} SCP Bundle`,
              description: `Complete Security Context Protocol bundle for ${entry.name}`,
              mimeType: 'application/json',
            });
            
            // Add individual components if they exist
            const files = ['scp.json', 'scp.yaml', 'mitigation-steps.md', 'detection-guidance.md'];
            for (const file of files) {
              try {
                await fs.access(path.join(cvePath, file));
                resources.push({
                  uri: `scp://resources/${entry.name}/${file}`,
                  name: `${entry.name} ${file}`,
                  description: `${file} for ${entry.name}`,
                  mimeType: file.endsWith('.json') ? 'application/json' : file.endsWith('.yaml') ? 'text/yaml' : 'text/markdown',
                });
              } catch (error) {
                // File doesn't exist, skip
              }
            }
          }
        }
      } catch (error) {
        console.error('Error scanning resources:', error);
      }

      return { resources };
    });

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      const match = uri.match(/^scp:\/\/resources\/([^\/]+)\/(.+)$/);
      
      if (!match) {
        throw new McpError(ErrorCode.InvalidRequest, `Invalid resource URI: ${uri}`);
      }

      const [, cveId, fileName] = match;
      let filePath;
      let content;

      try {
        if (fileName === 'bundle') {
          // Return combined SCP bundle
          const cvePath = path.join(__dirname, 'resources', cveId);
          const bundle = {};

          // Try to read all available files
          const files = ['scp.json', 'scp.yaml', 'scp_bundle.json'];
          for (const file of files) {
            try {
              const fileContent = await fs.readFile(path.join(cvePath, file), 'utf-8');
              if (file.endsWith('.json')) {
                bundle[file] = JSON.parse(fileContent);
              } else {
                bundle[file] = fileContent;
              }
            } catch (error) {
              // File doesn't exist, continue
            }
          }

          // Read markdown files
          const mdFiles = ['mitigation-steps.md', 'detection-guidance.md', 'research-links.md'];
          for (const file of mdFiles) {
            try {
              bundle[file] = await fs.readFile(path.join(cvePath, file), 'utf-8');
            } catch (error) {
              // File doesn't exist, continue
            }
          }

          // Read red team payloads if exists
          try {
            bundle['red-team-payloads.txt'] = await fs.readFile(path.join(cvePath, 'red-team-payloads.txt'), 'utf-8');
          } catch (error) {
            // File doesn't exist, continue
          }

          content = JSON.stringify(bundle, null, 2);
        } else {
          // Read individual file
          filePath = path.join(__dirname, 'resources', cveId, fileName);
          content = await fs.readFile(filePath, 'utf-8');
        }

        return {
          contents: [
            {
              uri,
              mimeType: fileName === 'bundle' ? 'application/json' : 
                       fileName.endsWith('.json') ? 'application/json' :
                       fileName.endsWith('.yaml') ? 'text/yaml' : 
                       'text/plain',
              text: content,
            },
          ],
        };
      } catch (error) {
        throw new McpError(ErrorCode.InternalError, `Error reading resource: ${error.message}`);
      }
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_cves',
            description: 'Search for CVEs in the SCP registry by keyword or CVE ID',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (CVE ID, vulnerability type, or keyword)',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_detection_signature',
            description: 'Get detection signatures for a specific CVE',
            inputSchema: {
              type: 'object',
              properties: {
                cve_id: {
                  type: 'string',
                  description: 'CVE identifier (e.g., CVE-2023-1234)',
                },
              },
              required: ['cve_id'],
            },
          },
          {
            name: 'analyze_code_vulnerability',
            description: 'Analyze code for potential vulnerabilities using SCP patterns',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Code snippet to analyze',
                },
                language: {
                  type: 'string',
                  description: 'Programming language',
                  default: 'auto-detect',
                },
              },
              required: ['code'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'search_cves':
          return await this.searchCVEs(args.query);
        case 'get_detection_signature':
          return await this.getDetectionSignature(args.cve_id);
        case 'analyze_code_vulnerability':
          return await this.analyzeCodeVulnerability(args.code, args.language);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      const prompts = [];
      
      try {
        const promptsPath = path.join(__dirname, 'prompts');
        const entries = await fs.readdir(promptsPath, { withFileTypes: true });
        
        for (const entry of entries) {
          if (entry.isDirectory() && entry.name.startsWith('CVE-')) {
            prompts.push({
              name: `security_context_${entry.name.toLowerCase()}`,
              description: `Security context prompt for ${entry.name}`,
              arguments: [
                {
                  name: 'code_context',
                  description: 'Code context to analyze',
                  required: false,
                },
              ],
            });
          }
        }

        // Add general security prompts
        prompts.push({
          name: 'secure_coding_review',
          description: 'General secure coding review prompt using SCP knowledge',
          arguments: [
            {
              name: 'code',
              description: 'Code to review',
              required: true,
            },
            {
              name: 'focus_areas',
              description: 'Specific vulnerability types to focus on',
              required: false,
            },
          ],
        });

      } catch (error) {
        console.error('Error listing prompts:', error);
      }

      return { prompts };
    });

    // Handle prompt requests
    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      if (name === 'secure_coding_review') {
        return {
          description: 'Secure coding review using SCP registry knowledge',
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please review the following code for security vulnerabilities using the Security Context Protocols (SCPs) from the Phylax registry:

Code to review:
${args?.code || 'No code provided'}

${args?.focus_areas ? `Focus areas: ${args.focus_areas}` : ''}

Please identify potential vulnerabilities, reference relevant CVEs from the SCP registry, and provide mitigation recommendations.`,
              },
            },
          ],
        };
      }

      if (name.startsWith('security_context_cve-')) {
        const cveId = name.replace('security_context_', '').toUpperCase();
        return {
          description: `Security context for ${cveId}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Use the SCP data for ${cveId} to provide security context for the following code:

${args?.code_context || 'No code context provided'}

Include vulnerability patterns, detection methods, and mitigation strategies specific to ${cveId}.`,
              },
            },
          ],
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown prompt: ${name}`);
    });
  }

  async searchCVEs(query) {
    try {
      const resourcesPath = path.join(__dirname, 'resources');
      const entries = await fs.readdir(resourcesPath, { withFileTypes: true });
      
      const results = [];
      const queryLower = query.toLowerCase();

      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('CVE-')) {
          const cvePath = path.join(resourcesPath, entry.name);
          
          // Check if query matches CVE ID
          if (entry.name.toLowerCase().includes(queryLower)) {
            try {
              const scpPath = path.join(cvePath, 'scp.json');
              const scpContent = await fs.readFile(scpPath, 'utf-8');
              const scp = JSON.parse(scpContent);
              
              results.push({
                cve_id: entry.name,
                description: scp.description || 'No description available',
                severity: scp.severity || 'Unknown',
                path: cvePath,
              });
            } catch (error) {
              results.push({
                cve_id: entry.name,
                description: 'SCP file not found or invalid',
                severity: 'Unknown',
                path: cvePath,
              });
            }
          }
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `Found ${results.length} CVEs matching "${query}":\n\n${results.map(r => 
              `${r.cve_id}: ${r.description} (Severity: ${r.severity})`
            ).join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(ErrorCode.InternalError, `Search failed: ${error.message}`);
    }
  }

  async getDetectionSignature(cveId) {
    try {
      const signaturePath = path.join(__dirname, 'tools', 'detection', `${cveId}_detect_sig.json`);
      const signatureContent = await fs.readFile(signaturePath, 'utf-8');
      
      return {
        content: [
          {
            type: 'text',
            text: `Detection signature for ${cveId}:\n\n${signatureContent}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(ErrorCode.InternalError, `Detection signature not found for ${cveId}: ${error.message}`);
    }
  }

  async analyzeCodeVulnerability(code, language = 'auto-detect') {
    // This is a simplified analysis - in a real implementation, you'd use the detection signatures
    const commonPatterns = [
      { pattern: /eval\s*\(/, vulnerability: 'Code Injection', severity: 'High' },
      { pattern: /innerHTML\s*=/, vulnerability: 'XSS', severity: 'Medium' },
      { pattern: /document\.write\s*\(/, vulnerability: 'XSS', severity: 'Medium' },
      { pattern: /sql\s*=.*\+.*input/i, vulnerability: 'SQL Injection', severity: 'High' },
      { pattern: /exec\s*\(/, vulnerability: 'Command Injection', severity: 'High' },
    ];

    const findings = [];
    for (const { pattern, vulnerability, severity } of commonPatterns) {
      if (pattern.test(code)) {
        findings.push(`${severity} Risk: Potential ${vulnerability} detected`);
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: findings.length > 0 
            ? `Code analysis results:\n\n${findings.join('\n')}\n\nNote: This is a basic pattern analysis. Consult specific SCP resources for detailed vulnerability context.`
            : 'No obvious vulnerability patterns detected in the provided code.',
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Phylax SCP Registry MCP server running on stdio');
  }
}

const server = new PhylaxSCPServer();
server.run().catch(console.error);
