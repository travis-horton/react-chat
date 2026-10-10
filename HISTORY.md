# react-chat — what changed, in plain words

Newest first. Entries before the first one here are still to be written (the backfill).

## October 2026

**react-chat #10: the stale copy of the borrowed packages is gone** · [PR #10](https://github.com/travis-horton/react-chat/pull/10) · merged 26.1010.1153 · v1.0.1
- Behind the scenes: the project no longer stores its downloaded packages (about 5,600 files of the old, pre-update versions); they are rebuilt from the package list on install, so the chat now runs on the versions the 26.1010 security update chose.

**react-chat #9: security updates for the borrowed building blocks, in one go** · [PR #9](https://github.com/travis-horton/react-chat/pull/9) · merged 26.1010.1150 · v1.0.0
- Behind the scenes: brought the chat app's web server and live-connection library, and the smaller pieces they rely on, up to their makers' patched versions, replacing 5 separate automatic update requests. Known security warnings drop from 81 to 49, and joining the chat and sending a message work the same as before.
  Behind the scenes: the project now keeps a plain-language history that adds an entry by itself each time a change is merged.
