# Hacker News

## Auth
- No official API for posting. Requires cookie-based session auth.
- Env: `HN_USERNAME`, `HN_PASSWORD`

## Submission
- HN only supports **link posts** (title + URL) or **text posts** (title + body, no URL).
- Title: max ~80 chars. No clickbait. Factual, neutral tone. HN moderators will edit titles that editorialize.
- URL: the primary content. HN is a link aggregator.
- "Show HN:" prefix when sharing something you built. Required format: `Show HN: <title>`

## How to post
1. Use `WebFetch` or `curl` to POST to `https://news.ycombinator.com/login` with `acct` and `pw` fields. Capture the `user` cookie.
2. GET `https://news.ycombinator.com/submit` with the auth cookie. Extract the `fnid` hidden field from the form.
3. POST to `https://news.ycombinator.com/r` with fields: `fnid`, `fnop=submit-page`, `title`, `url` (or `text` for text posts).
4. If successful, redirects to the new post. Capture and return the URL.

## Notes
- HN rate-limits submissions. Don't post more than a few per day.
- Best posting times: ~9-11am ET on weekdays.
- Don't self-promote excessively — mix in other interesting content.
