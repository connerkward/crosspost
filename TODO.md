# TODO

## Platforms to add

- [ ] **Instagram** — stories and feed posts
  - Auth: Instagram Graph API (Meta) — business/creator account + Facebook app, OAuth long-lived token
  - Posts: image/video feed posts via the Content Publishing API (`/{ig-user-id}/media` → `/media_publish`)
  - Stories: supported for business accounts via the Stories endpoint; requires a publicly reachable media URL
  - Constraints: image-first (no text-only posts), caption limits, hashtag handling, media hosting requirement
  - Add `platforms/instagram.md` once the auth flow and endpoints are confirmed
