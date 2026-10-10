# react-chat — what changed, in plain words

Newest first.

## October 2026

**react-chat #19: two unused building blocks removed** · [PR #19](https://github.com/travis-horton/react-chat/pull/19) · merged 26.1010.1230 · v1.0.3
- Behind the scenes: took two borrowed building blocks off the project's list that the chat app never used (the package-installing tool itself, and an unrelated small code loader), almost certainly added by a typing slip. Known security warnings drop from 49 to 8, and the chat server answers, lets people join, and passes messages along exactly as before.

**react-chat #17: the project's past, written down** · [PR #17](https://github.com/travis-horton/react-chat/pull/17) · merged 26.1010.1210 · v1.0.2
- Behind the scenes: the history file now covers the whole project, from its first version to 26.1010, not just today's changes.

**react-chat #10: the stale copy of the borrowed packages is gone** · [PR #10](https://github.com/travis-horton/react-chat/pull/10) · merged 26.1010.1153 · v1.0.1
- Behind the scenes: the project no longer stores its downloaded packages (about 5,600 files of the old, pre-update versions); they are rebuilt from the package list on install, so the chat now runs on the versions the 26.1010 security update chose.

**react-chat #9: security updates for the borrowed building blocks, in one go** · [PR #9](https://github.com/travis-horton/react-chat/pull/9) · merged 26.1010.1150 · v1.0.0
- Behind the scenes: brought the chat app's web server and live-connection library, and the smaller pieces they rely on, up to their makers' patched versions, replacing 5 separate automatic update requests. Known security warnings drop from 81 to 49, and joining the chat and sending a message work the same as before. (Later corrected on 26.1010: the chat server itself still handles joining and messages the same way, but the chat page has not been connected to it since 18.1118, so a message can't actually be sent from the page.) (Later fixed on 26.1010, in react-chat #22: the page is connected again.)
  Behind the scenes: the project now keeps a plain-language history that adds an entry by itself each time a change is merged.

## December 2019

**A blank line, and two security version numbers raised** · [commits](https://github.com/travis-horton/react-chat/commits/master?since=2019-12-14&until=2019-12-14) · merged 19.1214.1032 · v0.3.1
- **[Blank line](https://github.com/travis-horton/react-chat/commit/d0f45ca)** · merged 19.1214.1029
  Behind the scenes: removed an empty line at the top of the chat server's program. Nothing changed in how it runs.
- **[Version numbers](https://github.com/travis-horton/react-chat/commit/175d564)** · merged 19.1214.1032
  Behind the scenes: raised the recorded versions of two borrowed building blocks to the ones that fixed known security problems: npm, the tool that installs them, to 6.13.4 or newer, and react-dom, the part of React that draws pages, to 16.4.2 or newer. Only the version numbers were edited by hand; the record still named the old downloads, so it is not certain the newer versions were ever installed.

## November 2018

**The chat page rebuilt in React, with sample data** · [commit](https://github.com/travis-horton/react-chat/commit/b945a08) · merged 18.1118.1610 · v0.3.0
- **[Chat layout](https://github.com/travis-horton/react-chat/commit/b945a08)** · merged 18.1118.1610
  New: the page now draws, in React, the shape of the new chat: a list of who's online (one sample user, "kiddspazz", joined at 10:30pm), a "you say:" box with a Submit button, and one sample message, "hi, this is travis". It isn't connected to the chat server, so nothing you type is sent; Submit only pops up "good work". The page's colors-and-layout file was deleted, so it shows in the browser's plain default style. (Later replaced on 26.1010 by react-chat #22: the sample user and message are gone, and the page now joins the real chat and sends and shows real messages.)
- **[Server address](https://github.com/travis-horton/react-chat/commit/b945a08)** · merged 18.1118.1610
  Breaking: the server now answers on the standard web port, 80, instead of 8081, so the old address with ":8081" stopped working. On most computers, starting it on port 80 needs administrator rights.

## October 2018

**Practicing React: a comment card** · [commit](https://github.com/travis-horton/react-chat/commit/bad63b3) · merged 18.1022.1226 · v0.2.2
- New: the chat page also opens at the server's plain address, not only at "/index".
  Behind the scenes: the page's script became a practice piece from React's tutorial, a comment card with a profile picture, name, text and date, and a sample profile picture was added. The script asks for a piece that hadn't been written yet, so the page showed nothing.

## August 2018

**The chat server back on, and React's first hello** · [commits](https://github.com/travis-horton/react-chat/commits/master?since=2018-08-19&until=2018-08-19) · merged 18.0819.1504 · v0.2.1
- **[Hello from React](https://github.com/travis-horton/react-chat/commit/93ec04f)** · merged 18.0819.1502
  New: the page now loads React in the browser and shows one heading, "Hello from function component".
  Fixed: the chat server starts again; the 18.0730 change had switched it off. The old chat box is still gone from the page, so the chat can't be used from it.
- **[Blank line](https://github.com/travis-horton/react-chat/commit/4b7606c)** · merged 18.0819.1504
  Behind the scenes: removed one empty line from the page's script.

## July 2018

**First step toward React, and the chat switched off** · [commits](https://github.com/travis-horton/react-chat/commits/master?since=2018-07-30&until=2018-07-30) · merged 18.0730.1647 · v0.2.0
- **[React attempt](https://github.com/travis-horton/react-chat/commit/78077e3)** · merged 18.0730.1615
  Removed: the working chat. The chat box came off the page and the whole chat server was switched off, replaced by a line meant to show "Hello, world!"; that line was put in the server rather than the page, where it can't run, so the app no longer started at all (until 18.0819).
- **[Unused pieces](https://github.com/travis-horton/react-chat/commit/1f3ea2c)** · merged 18.0730.1647
  Behind the scenes: removed two unused lines from the server's program.

**Day one: the chat app** · [commits](https://github.com/travis-horton/react-chat/commits/master?since=2018-07-29&until=2018-07-29) · merged 18.0729.1545 · v0.1.0
- **[The chat](https://github.com/travis-horton/react-chat/commit/872759b)** · merged 18.0729.1514
  New: a chat room that runs in the browser, brought over from an earlier version to be rebuilt with React. It asks for a user name (and asks again if that one is taken), lists who's online and when they joined, shows the latest 20 messages with their times, lets you change your name and announces the change; everything typed is turned into lowercase. It opened at the address "/index" on port 8081.
- **[Building blocks](https://github.com/travis-horton/react-chat/commit/d376015)** · merged 18.0729.1525
  Behind the scenes: added the list of borrowed building blocks the app needs (the web server, the live-connection library, and React for the rebuild to come), together with a full downloaded copy of them, about 5,600 files, stored in the project. A stray empty line was removed at 15:45. (The stored copy was later removed on 26.1010, in react-chat #10.)
- **[Readme](https://github.com/travis-horton/react-chat/commit/4a943bc)** · merged 18.0729.1532
  Behind the scenes: a one-line description of the project: "an attempt to rebuild my chat client/server with a react DOM interface".
