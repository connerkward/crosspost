# Reddit

> **Self-service API access is closed (Reddit "Responsible Builder Policy", ~Nov 11 2025).**
> Creating a new "script" app at `prefs/apps` no longer yields working credentials — new OAuth
> apps require **manual pre-approval** via a Developer Support request (describe use case,
> subreddits, volume; ~7-day review). Personal cross-post/announce bots generally **do not
> qualify**. Only credentials minted **before Nov 2025** are grandfathered and still work.
> reddit.com is also blocked in the Claude-in-Chrome tool, so there is **no agent-automatable
> path** for new accounts. Practical options: (a) reuse a pre-Nov-2025 app's creds below;
> (b) post to Reddit **manually** in your own browser; (c) skip Reddit.

## Auth (only works with grandfathered pre-Nov-2025 credentials)
- If you have an **existing** script app from before Nov 2025: https://www.reddit.com/prefs/apps
- Env: `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`
- 2FA accounts: append the current OTP to the password (`password:123456`) — expires fast, poor for automation.

## API
- OAuth token: POST `https://www.reddit.com/api/v1/access_token` with `grant_type=password`, username, password. Basic auth header with client_id:client_secret.
- Submit: POST `https://oauth.reddit.com/api/submit` with bearer token.

## Content types
- **Link post**: `kind=link`, `title`, `url`, `sr` (subreddit)
- **Self post**: `kind=self`, `title`, `text` (markdown body), `sr`
- **Cross-post**: `kind=crosspost`, `crosspost_fullname` (original post t3_id)

## How to post
Use the helper (handles password grant + submit, reads `.env`):

```
scripts/post.py reddit --sr <subreddit> --title "<title>" --url <url>       # link post
scripts/post.py reddit --sr <subreddit> --title "<title>" --text "<body>"   # self post
```

It prints the new post's permalink on success. By hand:
1. Get OAuth token via password grant.
2. POST to `/api/submit` with fields: `api_type=json`, `kind`, `sr`, `title`, `url` or `text`.
3. Response JSON has `data.url` — the permalink to the new post.

## Notes
- Each subreddit has its own rules. Check before posting.
- Common targets: r/selfhosted, r/opensource, r/programming, r/machinelearning, r/comfyui, r/StableDiffusion
- Specify subreddit(s) when requesting a Reddit post.
- Flair may be required — check subreddit rules.
