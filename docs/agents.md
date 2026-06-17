# Using Crosspost with Claude Code & AI agents

This is the agent-facing contract. For the human walkthrough, see the [README](../README.md).

Crosspost is a harness, not a package: clone the repo (or drop it next to your project),
fill in [`.env`](../.env.example), and ask the agent to post. The agent reads the relevant
file in [`platforms/`](../platforms/) and follows it. The repo's [`CLAUDE.md`](../CLAUDE.md)
is loaded automatically when Claude Code works in this directory.

## The flow

```
draft → preview (preview.html) → human approves → post
```

The preview-and-approve gate is **optional but the default** — it's how the human stays in
control of what goes public. Content is arbitrary (whatever is being posted), not just
project announcements.

## Content checklist — run before EVERY post (mandatory)

Before anything reaches the preview/post step, verify each item. This is the failure these
exist to prevent: a post that names a tool in plain text, has no image, and so reaches no one.

1. **Tag, don't name.** Every product, company, person, or project named in the post that
   HAS an account on the target platform MUST be an `@handle`, not plain text.
   `Claude Code` → `@claudeai`; a named tool/person → their real `@handle`. On
   X / LinkedIn / Bluesky the @-mention is the *entire distribution mechanism* — plain text
   gets zero notifications and zero reach. **Look the handle up on the platform; never guess
   it.** If the entity genuinely has no account, plain text is fine — but check first.
2. **Attach media.** Default to a real image/video — posts with media far outperform text.
   **Prefer a real screenshot/recording of the actual thing** over a generated or
   "illustrative" graphic; fabricated data-looking cards read as fake and erode trust.
   Text-only only when there is genuinely nothing to show.
3. **Lead with the hook, not the tech.** One scannable first line.
4. **Links** per platform norms (URL in body for X / LinkedIn; `url` field for HN).
5. **Char limit** per platform; verify before submit.

Surface these in the preview so the human approves a post that's actually tagged and
illustrated — not a bare-text draft. Re-check after any edit.

## Reality of automation (per platform)

It is **semi-autonomous, not fire-and-forget** — most platforms don't allow headless posting:

- **Headless / fully automatable:** Discord webhook, Bluesky (atproto).
- **Browser, human-approved** (agent fills the live logged-in session, you approve the send):
  **X** (API is pay-per-use/paywalled), **HN** (no API), **Discord** (as you), **LinkedIn**.
  Use real keystrokes for React composers; `form_input` doesn't fire `onChange`.
- **Manual** (agent stages, human submits): **Reddit** — API closed (Responsible Builder
  Policy, Nov 2025) and `reddit.com` is blocked in the Chrome tool; use the
  open-prefilled-URL flow.
- **Not social posting** (publish a package, separate flow): the MCP registries
  (Smithery, mcp.so, Glama, …), the ComfyUI registry.

See [`browser-posting.md`](../browser-posting.md) for the shared browser flow.

## Secrets

Platform docs name the env vars they need; values live in a git-ignored `.env` (copy from
[`.env.example`](../.env.example)). Never echo secrets into the terminal and never commit them.

## Adding a platform

Add a markdown file to [`platforms/`](../platforms/) with auth, submission method, format
constraints, and step-by-step posting instructions the agent can follow. No code to register.
