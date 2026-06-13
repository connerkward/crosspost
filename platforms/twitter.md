# Twitter / X

## Auth
- Twitter API v2 with OAuth 1.0a user context
- Env: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`
- Create an app at https://developer.x.com — **Free tier posts ~500 tweets/month** (no monthly cost at announce volume). The app's User authentication settings must be **Read and write**; regenerate the Access Token/Secret *after* enabling write, or posts 403.

## API
- POST `https://api.twitter.com/2/tweets`
- OAuth 1.0a signature required on every request
- Body: `{ "text": "..." }`

## Content format
- 280 char limit
- URLs count as ~23 chars regardless of actual length (t.co wrapping)
- Hashtags, mentions, and media supported
- No markdown — plain text only
- Threads: reply to your own tweet with `reply.in_reply_to_tweet_id`

## How to post
Use the helper (signs OAuth 1.0a + posts, reads `.env`):

```
scripts/post.py twitter --text "<tweet>"                       # single tweet
scripts/post.py twitter --text "<reply>" --reply-to <tweet_id> # thread continuation
```

It prints the tweet URL on success. (Set `TWITTER_USERNAME` in `.env` for a correct
URL host; otherwise the path still resolves via `x.com/i/status/<id>`.) By hand:
1. Compose tweet text. Keep it punchy. Include URL. Hashtags optional.
2. Sign request with OAuth 1.0a (HMAC-SHA1). Use the 4 env vars.
3. POST to `/2/tweets` with JSON body `{ "text": "..." }`.
4. Response has `data.id` — tweet URL is `https://x.com/<username>/status/<id>`.

## Notes
- For project announcements, format: short description + URL + 1-2 relevant hashtags
- Thread for longer announcements: first tweet is the hook, subsequent tweets add detail
