# TODO

## Platforms to add

- [ ] **Instagram** — stories and feed posts
  - Auth: Instagram Graph API (Meta) — business/creator account + Facebook app, OAuth long-lived token
  - Posts: image/video feed posts via the Content Publishing API (`/{ig-user-id}/media` → `/media_publish`)
  - Stories: supported for business accounts via the Stories endpoint; requires a publicly reachable media URL
  - Constraints: image-first (no text-only posts), caption limits, hashtag handling, media hosting requirement
  - Add `platforms/instagram.md` once the auth flow and endpoints are confirmed

## Image + link posts / link thumbnails

Two distinct mechanisms to support and document properly — currently glossed over:

- **Image + link in one post** vs. **link post with auto-fetched thumbnail** (`og:image` / `twitter:card` unfurl).

- [ ] Document per-platform link-unfurl / thumbnail rules in the platform docs:
  - HN: link = title+URL only, no media, no thumbnail
  - Reddit: link posts auto-thumbnail from OG; image post is a separate type
  - Twitter/X: image and link card are **mutually exclusive** — attaching an image suppresses the card; bare URL unfurls a `twitter:card` thumbnail
  - Discord: embed has both `image` (large) and `thumbnail` (small) fields, set explicitly; bare-URL content auto-unfurls OG
  - LinkedIn: article share carries/fetches a thumbnail from source URL
- [ ] Fix `preview.html` to match real behavior:
  - Twitter: show image OR link card, not both
  - Render an actual thumbnail in the Twitter/Discord/LinkedIn link cards (simulate `og:image`), not just domain+title text
  - Optional: fetch/preview the real OG image from the entered URL
