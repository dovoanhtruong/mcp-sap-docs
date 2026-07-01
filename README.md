# MCP SAP Docs

A powerful Model Context Protocol (MCP) Server connecting AI assistants (Claude, Cursor, Gemini IDE) to SAP's vast ecosystem via Hybrid Search & Live APIs.

## 🏗️ Architecture & Flow

```mermaid
flowchart LR
    A["AI Assistant<br>(Cursor, Claude, Gemini)"] -->|"MCP Protocol<br>(stdio / SSE)"| B("MCP Server<br>NodeJS App")
    
    subgraph Data Sources
        C[("Offline SQLite<br>BM25 + Semantic")]
        D["SAP Help Portal"]
        E["SAP Accelerator Hub"]
        F["SAP Fiori App Library"]
        G["Clean Core<br>Released Objects"]
    end

    B -->|"Search/Fetch"| C
    B -->|"Live REST/OData"| D
    B -->|"Live REST/OData"| E
    B -->|"Live REST/OData"| F
    B -->|"Live REST/OData"| G

    style B fill:#f96,stroke:#333,stroke-width:2px
    style C fill:#9cf,stroke:#333
```

## 🚀 Key Features

```mermaid
mindmap
  root((MCP SAP Docs))
    Offline Hybrid Search
      Fast local querying
      BM25 Keywords
      Semantic Embeddings
    Live Online Integrations
      SAP API Hub
      Fiori Reference Library
      Clean Core Released Objects
    Flexible Variants
      sap-docs (Full Scope)
      abap (ABAP Focused)
```

## 🧰 Available Tools

| Tool | Purpose | Target / Scope |
|------|---------|----------------|
| `search` / `fetch` | General Docs | Offline Docs & SAP Help |
| `sap_community_search` | Troubleshooting | SAP Community Q&A |
| `sap_search_objects` | Clean Core / RAP | Official Released ABAP Objects |
| `abap_feature_matrix` | Syntax Support | ABAP 7.40+ Features |
| `sap_accelerator_hub_*` | Integrations | OData, REST, SOAP APIs |
| `sap_fiori_library_*` | Fiori UI | Standard Fiori Apps & Configs |
| `sap_discovery_center_*`| Cloud Services | BTP Services & Pricing |
| `abap_lint` | Code Quality | Static Analysis (ABAP Variant) |

## 📂 Project Structure

```text
mcp-sap-docs/
├── config/        # Variant configurations (sap-docs.json, abap.json)
├── src/           # TypeScript source code (Tools & Handlers)
├── dist/          # Compiled JS and generated docs.sqlite database
├── sources/       # Raw data from SAP Git Submodules
├── setup.sh       # Auto-setup script (Bash required)
└── manifest-extend.yml # Cloud Foundry deployment descriptor
```

## ⚙️ MCP Configuration (Client IDE)

```json
{
  "mcpServers": {
    "mcp-sap-docs-btp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/supergateway",
        "--stdio",
        "--url",
        "https://sap-docs-extend-mcp.cfapps.ap21.hana.ondemand.com/sse",
        "--header",
        "SAP-API-HUB-KEY: <YOUR_API_KEY_HERE>" 
      ],
      "disabled": false
    }
  }
}
```
*(Note: `SAP-API-HUB-KEY` is **optional**. If omitted, the `sap_accelerator_hub_*` tools will be restricted from fetching API data, but all other tools like Offline Search, Fiori Library, and Clean Core Objects will still work normally.)*

## 🔗 References

- **BTP Deployment Guide**: [mcp_btp_deployment_guide.md](./mcp_btp_deployment_guide.md)
- **Remote Setup**: [REMOTE_SETUP.md](./REMOTE_SETUP.md)
- **Architecture Details**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Hybrid Search Algorithm**: [docs/HYBRID-SEARCH.md](./docs/HYBRID-SEARCH.md)
