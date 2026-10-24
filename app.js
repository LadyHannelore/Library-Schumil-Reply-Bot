const replyRules = [
  {
    keywords: ["book", "books", "library", "read", "reading", "novel"],
    reply: "Ah, a fellow lover of books! The library is a fine place to begin. Try the wiki's search to browse its shelves, and be sure to check the page references for more reading."
  },
  {
    keywords: ["shumil", "rabbit", "bunny"],
    reply: "A shumil is a rabbit-like magical beast—and an excellent companion for a quiet day among the books. This little desk-bound shumil is delighted you asked."
  },
  {
    keywords: ["wiki", "page", "find", "search", "help"],
    reply: "I'd be glad to point the way. Use the wiki search to find a page by title or topic; if you're looking for a particular detail, the page's contents and references are good places to start."
  },
  {
    keywords: ["temple", "priest", "prayer", "shrine"],
    reply: "The temple has its own customs and vocabulary. The wiki's temple-related pages are a good place to learn more—one page at a time, like turning through a careful old book."
  },
  {
    keywords: ["api", "module", "modules", "developer", "documentation"],
    reply: "For the wiki's installed API modules, open its API page from the links below. Fandom-specific module details are documented on MediaWiki's API pages."
  }
];

const fallbackReply = "I'm afraid my little index doesn't have a page for that yet. Try asking about books, shumils, the wiki, the temple, or its API—and I'll fetch the right reply.";
const form = document.querySelector("#message-form");
const input = document.querySelector("#message-input");
const conversation = document.querySelector("#conversation");

function findReply(message) {
  const words = message.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  let bestRule = null;
  let bestScore = 0;

  for (const rule of replyRules) {
    const score = rule.keywords.reduce((total, keyword) => total + Number(words.includes(keyword)), 0);
    if (score > bestScore) {
      bestRule = rule;
      bestScore = score;
    }
  }

  return bestRule?.reply ?? fallbackReply;
}

function addMessage(text, speaker) {
  const message = document.createElement("div");
  message.className = `message ${speaker === "you" ? "user-message" : "bot-message"}`;

  if (speaker === "you") {
    const content = document.createElement("div");
    content.className = "message-content";
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    content.append(paragraph);
    message.append(content);
  } else {
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "S";

    const content = document.createElement("div");
    content.className = "message-content";
    const label = document.createElement("span");
    label.className = "speaker";
    label.textContent = "THE SCHUMIL";
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    content.append(label, paragraph);
    message.append(avatar, content);
  }

  conversation.append(message);
  conversation.scrollTop = conversation.scrollHeight;
}

function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  addMessage(message, "you");
  addMessage(findReply(message), "bot");
  input.value = "";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});
