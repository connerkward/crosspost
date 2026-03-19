# Reddit

## Auth
- Create a "script" app at https://www.reddit.com/prefs/apps
- Env: `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`

## API
- OAuth token: POST `https://www.reddit.com/api/v1/access_token` with `grant_type=password`, username, password. Basic auth header with client_id:client_secret.
- Submit: POST `https://oauth.reddit.com/api/submit` with bearer token.

## Content types
- **Link post**: `kind=link`, `title`, `url`, `sr` (subreddit)
- **Self post**: `kind=self`, `title`, `text` (markdown body), `sr`
- **Cross-post**: `kind=crosspost`, `crosspost_fullname` (original post t3_id)

## How to post
1. Get OAuth token via password grant.
2. POST to `/api/submit` with fields: `api_type=json`, `kind`, `sr`, `title`, `url` or `text`.
3. Response JSON has `data.url` — the permalink to the new post.

## Notes
- Each subreddit has its own rules. Check before posting.
- Common targets: r/selfhosted, r/opensource, r/programming, r/machinelearning, r/comfyui, r/StableDiffusion
- Specify subreddit(s) when requesting a Reddit post.
- Flair may be required — check subreddit rules.
