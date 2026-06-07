/* =========================================================
   Socratic Coding Tutor — Script
   ========================================================= */
 
/* ---------------------------------------------------------
   Response bank
   --------------------------------------------------------- */
const RESPONSES = {
  recursion: [
    "Interesting question! Before I explain, let me ask you this: when you look up a word in the dictionary and find another word you don't know, what do you do? How might that process relate to a function calling itself?",
    "Think about a set of Russian nesting dolls — each one contains a smaller version of itself. If you wanted to count all the dolls, what steps would you take, and when would you stop looking inside?",
    "Have you ever computed a factorial by hand? Walk me through how you'd calculate 4! without a computer — what pattern do you notice in your own steps?"
  ],
  closure: [
    "Great topic! Let me ask first: if a function creates a variable, what do you think normally happens to that variable when the function finishes running? And what might be special about a function defined *inside* another function?",
    "Imagine a backpack. When a function is created inside another function, what 'items' might it carry in its backpack even after the outer function is done? What variables might it remember?",
    "Consider this: what's the difference between a variable that belongs to a function vs. one that's shared by everyone? How might an inner function 'hold onto' something the outer function created?"
  ],
  bigO: [
    "Before we dive in, let me ask: if you had to sort 10 playing cards by hand vs. 1,000 cards — does the extra time grow by the same amount, or differently? What does that growth pattern tell you?",
    "Imagine two chefs, one who checks every ingredient every time, and one who only checks what's needed. How would you describe the *relationship* between their effort and the number of ingredients? That's the core of what we're exploring.",
    "Think about searching for a name in a phone book. What's the fastest strategy you can think of, and how many pages might you need to check in the worst case compared to the book's total size?"
  ],
  promise: [
    "Let me ask you this: when you order food at a restaurant, do you stand frozen at the counter until it's ready, or do you sit down and do other things? How might JavaScript handle waiting for slow operations in a similar way?",
    "What problem do you think would occur if JavaScript had to completely stop and wait every time it fetched data from the internet? How does that motivate the idea of a 'promise' of a future value?",
    "Think about a promise in real life — when someone says 'I'll get back to you.' What are the possible outcomes of that promise? How might those map onto the states a `Promise` object can be in?"
  ],
  equality: [
    "Interesting question! Consider this: in JavaScript, what do you think might happen when you compare the number `0` to the string `'0'` with `==`? Why might that be surprising, and what problem could it cause?",
    "Before I explain, tell me: what do you think the word 'type' means in the phrase 'type coercion'? If JavaScript tries to be helpful by converting types automatically, when might that helpfulness backfire?",
    "Imagine two people saying 'I have 5 apples' — one is holding actual apples, the other just wrote '5' on a piece of paper. Are those the same? How might that distinction relate to comparing a number and a string in JavaScript?"
  ],
  hashmap: [
    "Let's think about a library. If every book were stored randomly and you had to check every shelf to find one, how long would that take? Now, what if books were always placed on a shelf determined by their title's first letter? What changes?",
    "Here's a question: what do you think a 'key' and a 'value' might mean in a data structure? And why might having a very fast way to go from key → shelf location be useful when you have millions of entries?",
    "Consider a coat check at a restaurant — you hand over your coat and get a numbered ticket. Later, you give back the ticket and get your coat instantly. What's the 'magic' that makes this fast, and how might a similar trick work in memory?"
  ],
  default: [
    "That's a great thing to explore! Before I answer directly, can you tell me what you already know about this topic? Even a rough guess or intuition helps — what do you *think* might be true?",
    "Interesting question! Let me turn it back to you first: can you think of a real-world analogy for what you're describing? Sometimes the best way to understand code is to find a parallel in everyday life.",
    "Good question! Let's break it down together. What's the smallest, simplest version of this concept you can imagine? If you had to explain it to someone with no coding background, where would you even start?",
    "Before we dive in, I'd love to know: what problem do you think this concept was invented to solve? Understanding the *why* often makes the *what* click much faster — what's your intuition?",
    "Wonderful to explore! Here's a thought experiment for you: if this feature or concept didn't exist in programming, what would be painful or impossible to do? What gap does it fill?"
  ],
  array: [
  "Suppose you have a list of student marks. If you wanted to find the highest mark, what steps would you follow manually before writing code?",
  "What operations do you perform most often on a collection of items? How might an array make those operations easier?"
],

oop: [
  "Think about a car. What characteristics belong to every car, and what actions can every car perform? How does that relate to objects and classes?",
  "If you wanted to create 100 students with similar properties, would you write each one separately or define a blueprint first?"
],

loop: [
  "When you brush through pages of a book one by one, are you repeating an action? How might a loop automate repetition in code?",
  "What would happen if a loop never reached a stopping condition?"
],

function: [
  "If you perform the same task many times, would you rather repeat instructions or create a reusable procedure?",
  "What problem do functions solve when programs become larger?"
]
};
 
/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */
 
/** Pick a random item from an array. */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
 
/** Choose a Socratic reply based on keywords in the user's message. */
function pickResponse(text) {
  const t = text.toLowerCase();
  if (t.includes('recursion') || t.includes('recursive'))               return rand(RESPONSES.recursion);
  if (t.includes('closure'))                                             return rand(RESPONSES.closure);
  if (t.includes('big o') || t.includes('bigo') ||
      t.includes('complexity') || t.includes('notation'))               return rand(RESPONSES.bigO);
  if (t.includes('promise') || t.includes('async') ||
      t.includes('await'))                                               return rand(RESPONSES.promise);
  if (t.includes('===') || t.includes('==') ||
      t.includes('equality') || t.includes('equal'))                    return rand(RESPONSES.equality);
  if (t.includes('hash') || t.includes('map') ||
      t.includes('dictionary') || t.includes('hashmap'))    
      if (t.includes('array')) return rand(RESPONSES.array);
if (t.includes('oop') || t.includes('object oriented')) return rand(RESPONSES.oop);
if (t.includes('loop') || t.includes('for loop') || t.includes('while')) return rand(RESPONSES.loop);
if (t.includes('function')) return rand(RESPONSES.function);            return rand(RESPONSES.hashmap);
  return rand(RESPONSES.default);
}
 
/** Format the current time as HH:MM AM/PM. */
function formatTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
 
/**
 * Escape HTML special characters and convert backtick-wrapped words
 * into inline <code> elements.
 */
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
 
/* ---------------------------------------------------------
   DOM manipulation
   --------------------------------------------------------- */
 
/** Append a user or tutor message bubble to the chat. */
function addMsg(role, text) {
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.remove();
 
  const msgs     = document.getElementById('messages');
  const isUser   = role === 'user';
  const initials = isUser ? 'you' : 'soc';
 
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="avatar ${isUser ? 'user-av' : 'tutor'}">${initials}</div>
    <div class="bubble">
      <div class="bubble-inner">${escapeHtml(text)}</div>
      <div class="bubble-meta">${formatTime()}</div>
    </div>`;
 
  msgs.appendChild(div);
  scrollBottom();
}
 
/** Show the animated typing indicator. */
function showThinking() {
  const msgs = document.getElementById('messages');
  const div  = document.createElement('div');
  div.className = 'thinking';
  div.id        = 'thinking';
  div.innerHTML = `
    <div class="avatar tutor">soc</div>
    <div class="thinking-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>`;
  msgs.appendChild(div);
  scrollBottom();
}
 
/** Remove the typing indicator. */
function removeThinking() {
  const el = document.getElementById('thinking');
  if (el) el.remove();
}
 
/** Scroll the chat container to the bottom. */
function scrollBottom() {
  const c = document.getElementById('chatContainer');
  setTimeout(() => c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' }), 50);
}
 
/** Enable or disable the send button and textarea. */
function setLoading(active) {
  document.getElementById('sendBtn').disabled   = active;
  document.getElementById('userInput').disabled = active;
}
 
/* ---------------------------------------------------------
   Core interaction
   --------------------------------------------------------- */
 
/** Read the textarea, post the user message, then reply after a delay. */
async function sendMessage() {
  const input = document.getElementById('userInput');
  const text  = input.value.trim();
  if (!text) return;
 
  input.value = '';
  autoResize(input);
  setLoading(true);
  addMsg('user', text);
  showThinking();
 
  // Simulate thinking time (900 – 1700 ms)
  const delay = 900 + Math.random() * 800;
  await new Promise(resolve => setTimeout(resolve, delay));
 
  removeThinking();
  addMsg('tutor', pickResponse(text));
  setLoading(false);
  input.focus();
}
 
/** Fire a quick-prompt button's text as a user message. */
function sendQuick(btn) {
  const input   = document.getElementById('userInput');
  input.value   = btn.textContent;
  sendMessage();
}
 
/** Send on Enter; allow Shift+Enter for newlines. */
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}
 
/** Grow the textarea to fit its content, up to 160 px. */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}
 document.getElementById('clearBtn').addEventListener('click', () => {
  const messages = document.getElementById('messages');
  messages.innerHTML = '';

  location.reload();
});