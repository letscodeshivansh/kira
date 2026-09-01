# For Kira — 2nd September

A thirteen-chapter birthday book. Plain HTML, CSS and JavaScript — no build step,
no npm install, no framework. Open `index.html` in a browser and it runs.

**The chapters:** cover · happy birthday (cake) · your beauty (the poem) ·
her crimes · the batakh · do you love me · memory lane · the prescription (MBBS) ·
the gym · what you are · scold me · the quiz · the last page.

**Running through all of it:** a batakh that waddles across the bottom of the
screen every 15–30 seconds — tap it and it says something. Rose petals drift down on
every page, heavier on the poem and the last page. Every chapter has its own pair of
colours, and the whole page follows them — the background, the heading, the petals,
the confetti, the progress dot.

**Things she can actually do:**

- **☰ top left** — the chapter list. Any chapter, any time, in her own order.
- **Tap a photo** in Memory Lane to open it full screen. Swipe or arrow between them.
- **↑ bottom right** — share. Uses the phone's own share sheet, or copies the link.
- **♪ bottom right** — sound. Plays `music.mp3` if you added one; if you didn't, it
  plays a soft note on each page turn instead. Off until she taps it, always.
- **It remembers her.** Close the tab and come back: the cover offers to return her
  to the furthest page she reached, her scoldings are still in the log, and her quiz
  answers are still there. "Start over" on the last page wipes all of it.
- **The quiz gives her a scorecard** at the end, with every answer she chose, and a
  "play it again" button.
- Everything is stored on her own phone only. Nothing is uploaded (except the
  scoldings, and only if you set up the Formspree endpoint in step 3).

```
index.html    the shell (you rarely touch this)
content.js    ← EVERY WORD ON THE SITE LIVES HERE. This is the file you edit.
app.js        the engine — page turns, games, confetti
styles.css    the look
og.png        the image WhatsApp shows when you send the link
memories/     drop her photos here: 1.jpg, 2.jpg, 3.jpg ...
```

---

## 1. Put your own words in

Open **`content.js`**. It's commented top to bottom. Change the text between
the quotes and save. Nothing else needs touching.

- Wrap a word in `*asterisks*` to make it *gold and italic*: `"They *decide* things."`
- Chapter 2 (`beauty.lines`) is where your poem goes. One line per array entry —
  she taps to reveal each one, so short lines land harder than long ones.
- Add or remove entries from any list freely. Six crimes, four crimes, ten — all fine.
- `duck.quacks` is what the batakh says when she taps it anywhere on the site.
  Add your own inside jokes here — this is the easiest place to make it feel personal.
- `doctor.rx` is the prescription. `gym.reps` is one line per rep she lifts.
  Both are the places to swap in things only you two know.
- `ui` holds the small interface words — the menu title, "you left off at",
  "start over", the share message. Change or translate them freely.
- `her.birthday` is `MM-DD`. On that exact date the cover adds a small glowing
  "it's today" and throws confetti by itself. Set it to her real date.

## 2. Add the photos

Drop her photos into `memories/` and list the filenames in `content.js`:

```js
{ src: "memories/1.jpg", date: "the first one", caption: "..." },
```

Resize them to about 1000px on the long side first, so the page loads instantly
on mobile data. If a photo is missing, that card just shows the caption — nothing breaks.

## 3. Optional: get her scoldings emailed to you

By default Chapter 7 answers her on her phone and nothing is stored.

To have every scolding land in your inbox:

1. Go to **formspree.io**, make a free form, copy the endpoint
   (looks like `https://formspree.io/f/xnqrabcd`).
2. Paste it into `content.js`:
   ```js
   endpoint: "https://formspree.io/f/xnqrabcd",
   ```

## 4. Optional: music

The music button is always there in the corner. Drop an mp3 named `music.mp3` in
this folder and that button plays it on a loop. If you don't add a file, the same
button still works — it plays a soft chime on each page turn instead.
Keep any mp3 under ~3MB. It never autoplays; she has to tap it.

---

## 5. Deploy to Vercel

### The fast way (2 minutes, no terminal)

1. Go to **vercel.com/new**
2. Drag this whole folder onto the page.
3. Framework preset: **Other**. Leave build command and output directory empty.
4. Deploy. You get a URL like `https://for-kira.vercel.app`.

### The CLI way

```bash
npm i -g vercel
cd kira
vercel --prod
```

Answer the prompts with the defaults; when it asks about a framework, choose **Other**.

### Making the URL nicer

In the Vercel dashboard → your project → **Settings → Domains**, you can rename it
to something like `kira-is-27.vercel.app`. Do this before you send the link.

### Changing something after deploying

Edit `content.js`, then drag the folder onto vercel.com/new again (or run
`vercel --prod`). Same URL, new words, about 20 seconds.

---

## Notes

- **Mobile first.** She'll open it on her phone. Test it on yours before sending.
- **The link preview** (the card WhatsApp shows) comes from `og.png` and the
  `og:` meta tags in `index.html`. Change the text there if you want it to give
  less away.
- Navigation: swipe, tap the page, or arrow keys on a laptop. Taps on buttons,
  cards, photos and the text box never turn the page.
- **Colours** live in `app.js`, at the end of each chapter, on the line that reads
  `return { el: page, name:…, accent:"#…", accent2:"#…", glow:[…] }`. `accent` and
  `accent2` are the two colours that chapter runs on; `glow` is the three background
  colours. Change a hex, save, reload — that chapter re-themes itself completely.
- Everything she does is stored under `kira.` keys in her browser's local storage,
  and never leaves her phone.
