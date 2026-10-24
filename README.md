# Library Schumil Reply Bot

A small, dependency-free reply desk inspired by the warm, bookish feel of the
[Ascendance of a Bookworm Wiki](https://ascendance-of-a-bookworm.fandom.com/wiki/Ascendance_of_a_Bookworm_Wiki).
It matches a few keywords to hand-written replies—there is no LLM or server.

## Run it

Open `index.html` in a browser. The app uses plain HTML, CSS, and JavaScript;
no build step is required.

## How replies are chosen

The bot tokenizes a message and selects the canned reply whose keyword list
matches the most words. If no keywords match, it returns a friendly fallback.
Edit the `replyRules` array in `app.js` to add or change topics and replies.

The footer links to the wiki's API module listing and the MediaWiki API
documentation for extension-specific modules.
