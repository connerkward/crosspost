# Crosspost

![License: MIT](https://img.shields.io/badge/license-MIT-blue) ![Claude Code](https://img.shields.io/badge/Claude%20Code-harness-d97757) ![Docs not code](https://img.shields.io/badge/docs-not%20code-46d39a) ![Preview-first](https://img.shields.io/badge/flow-preview%20%E2%86%92%20approve%20%E2%86%92%20post-111) ![Platforms](https://img.shields.io/badge/platforms-6%20networks-1d9bf0)

![Crosspost preview — an input form on the left, live native-looking platform mockups (Hacker News, Reddit, Twitter/X, Discord) on the right](docs/preview-desktop.png)

*Type a title, URL, and body once; [`preview.html`](preview.html) shows you exactly how the post will land on each platform — before anything goes public.*

Announcing a project usually means rewriting the same blurb five times — a neutral 80-character title for Hacker News, a subreddit-appropriate self-post for Reddit, a punchy 280-character version with hashtags for X, a rich embed for Discord, a formal one for LinkedIn — each with its own login, format rules, and etiquette. Crosspost collapses that into a single instruction: you say what to post and where, and [Claude Code](https://claude.com/claude-code) reshapes the content per platform and posts it. You stay in control — every post goes through a visual preview you approve before it ships.

It's for anyone who ships things and dreads the announcement chore: indie developers, MCP-server authors, anyone cross-posting a release or a "Show HN" who'd rather write the thing once.

## How it works

There's no app to run and no service to deploy. Crosspost is a folder of markdown: each file in [`platforms/`](platforms/) tells Claude how to post to one destination — its auth, its API, its character limits, the exact steps to submit. Claude reads the relevant docs, rewrites your content to fit each platform, renders a preview, and — once you approve — posts.

- **Docs, not code.** Each platform is a markdown file. No build step, no dependencies, no adapter classes. Adding a platform is writing a doc, not shipping code.
- **Per-platform formatting.** HN gets a factual title; X gets the 280-character hook; Discord gets an embed. The content is reshaped to fit, not copy-pasted.
- **Preview-first, human-gated.** The flow is `draft → preview → you approve → post`. [`preview.html`](preview.html) renders native-looking mockups so you sign off on what's actually going out.
- **Secrets stay in [`.env`](.env.example).** Platform docs name the env vars they need (`REDDIT_CLIENT_ID`, `TWITTER_API_KEY`, `DISCORD_WEBHOOK_URL`, …); the values live in a git-ignored `.env`, never in the docs or in commits.

## Usage

Tell Claude Code what to post and where:

- *"Post this to HN and Reddit"*
- *"Announce mcp-apple-notes on Glama, mcp.so, X, and Discord"*
- *"Cross-post everywhere"*

Claude reads the relevant platform docs from [`platforms/`](platforms/), formats the content per platform, shows you a preview, and submits once you approve.

## Preview

Open [`preview.html`](preview.html) in a browser. Enter a title, URL, and body once and see how the post will look everywhere — Hacker News, Reddit, Twitter/X, Discord — rendered as native-looking cards. Toggle between desktop and mobile layouts.

![Per-platform mockups in the mobile layout: the same content reshaped for Hacker News, Reddit, Twitter/X, and Discord](docs/preview-mobile.png)

*The same content, reshaped per platform.*

## How posts actually go out

Crosspost is **semi-autonomous, not fire-and-forget** — most platforms don't permit headless posting, so the default is "agent drafts and fills, you approve and send":

- **Headless / fully automatable** — Discord (webhook), Bluesky (app password), the MCP registries. A free, usable API exists, so these can run unattended (even on cron).
- **Browser, human-approved** — X (its API is pay-per-use), Hacker News (no API), Discord-as-you, LinkedIn. Claude fills the composer in your **real logged-in browser**; you approve and click submit. No stored secrets. See [`browser-posting.md`](browser-posting.md) for the shared flow.
- **Manual** — Reddit. Its self-service API closed in November 2025 (Responsible Builder Policy) and `reddit.com` is blocked in the browser tool, so Claude stages the post and you submit it.

## Supported platforms

| Platform | Type | Auth | Notes |
|----------|------|------|-------|
| [Hacker News](platforms/hackernews.md) | Link / text post | Browser session (live login) | "Show HN:" prefix, ~80-char neutral title |
| [Reddit](platforms/reddit.md) | Link / self / cross-post | Manual (API closed Nov 2025) | Self-service API closed under the Responsible Builder Policy |
| [Twitter / X](platforms/twitter.md) | Tweet / thread | Browser, or paid API | 280 chars; new API accounts are pay-per-use |
| [Discord](platforms/discord.md) | Webhook message / embed | Webhook URL | Rich embeds, up to 2000 chars; headless |
| [LinkedIn](platforms/linkedin.md) | Text / article share | OAuth 2.0 (`w_member_social`) | 3000 chars, professional tone |
| [Smithery](platforms/smithery.md) | MCP registry | `@smithery/cli` publish | Largest MCP registry; `smithery.yaml` in repo |
| [Official MCP Registry](platforms/mcp-registry-official.md) | MCP registry | `mcp-publisher` CLI (GitHub OAuth) | Canonical `registry.modelcontextprotocol.io`; `server.json` |
| [PulseMCP](platforms/pulsemcp.md) | MCP directory | Ingests official registry / submit form | Read-only aggregator; no API |
| [Glama](platforms/mcp-glama.md) | MCP registry | GitHub URL submission | Indexes MCP servers from GitHub |
| [mcp.so](platforms/mcp-so.md) | MCP directory | GitHub URL submission | MCP server directory |
| [Cline Marketplace](platforms/cline-mcp-marketplace.md) | MCP marketplace (in-editor) | GitHub issue submission | Needs 400×400 PNG logo + install README |
| [awesome-mcp-servers](platforms/awesome-mcp-servers.md) | Curated GitHub list | Fork → PR | `punkpeye/awesome-mcp-servers`; alphabetical entry |
| [mcp-get](platforms/mcp-get.md) | MCP registry (deprecated) | — | Abandoned; points to Smithery |
| [ComfyUI Registry](platforms/comfyui-registry.md) | Package publish | `comfy-cli` | For ComfyUI custom nodes only |

## Adding a platform

Add a markdown file to [`platforms/`](platforms/) describing:

- **Auth** — the method and the env vars / secrets it needs
- **API or submission method** — REST API, form POST, CLI tool, webhook, etc.
- **Format constraints** — character limits, markdown support, media handling
- **Step-by-step posting instructions** Claude can follow

That's it — no code to register, no adapter to wire up. The next time you ask Claude to cross-post, the new platform is available.

---

> 🤖 Driving Crosspost with Claude Code or another AI agent? The agent contract — the preview-and-approve gate, the per-post content checklist, and the per-platform automation reality — lives in **[docs/agents.md](docs/agents.md)**.

MIT licensed — see [LICENSE](LICENSE).
