# Crosspost

Cross-posting harness for Claude Code. Each file in `platforms/` describes how to post to that platform — auth, APIs, format constraints, and step-by-step instructions.

## Usage

Tell Claude Code what to post and where:
- "Post this to HN and Reddit"
- "Announce mcp-apple-notes on Glama, mcp.so, Twitter, and Discord"
- "Cross-post everywhere"

Claude reads the relevant platform docs, formats the content appropriately per platform, and executes.

## Adding a platform

Add a markdown file to `platforms/` with:
- Auth method and required env vars / secrets
- API or submission method (REST API, form POST, CLI tool, webhook, etc.)
- Content format constraints (char limits, markdown support, etc.)
- Step-by-step posting instructions Claude can follow
