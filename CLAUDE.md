# Crosspost

**Purpose:** optional human-gated, preview-first, **semi-autonomous multi-platform
social-media posting**. One piece of content, reshaped per platform's rules and pushed
to many — the agent does the work; the human can gate it at the preview.

Cross-posting harness for Claude Code. Each file in `platforms/` describes how to post
to that platform — auth, APIs, format constraints, and step-by-step instructions.

## Flow

`draft → preview (preview.html) → human approves → post`. The preview-and-approve gate
is optional but the default — it's how the human stays in control of what goes public.
Content is arbitrary (whatever the agent wants to post), not just project announcements.

## Reality of automation (per platform)

It is **semi-autonomous, not fire-and-forget** — most platforms don't allow headless
posting:
- **Browser, human-approved** (agent fills the live logged-in session, you approve the
  send): **X** (API is pay-per-use/paywalled), **HN** (no API), **Discord** (as you),
  **LinkedIn**. Use real keystrokes for React composers; `form_input` doesn't fire onChange.
- **Manual** (agent stages, human submits): **Reddit** — API closed (Responsible Builder
  Policy, Nov 2025) and `reddit.com` is blocked in the Chrome tool; use the
  open-prefilled-URL flow.
- **Headless / fully automatable**: **Discord webhook**, **Bluesky** (atproto).
- **Not social posting** (publish a package, separate flow): the MCP registries
  (Smithery, mcp.so, Glama, …), ComfyUI registry.

See [browser-posting.md](browser-posting.md) for the shared browser flow.

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
