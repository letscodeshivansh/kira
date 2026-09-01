/* =========================================================================
   content.js  —  EVERYTHING YOU WANT TO CHANGE LIVES IN THIS ONE FILE.
   Edit the text below, save, redeploy. You never need to touch the others.

   *asterisks* around a word make it glow in that chapter's colour.
   ========================================================================= */

const CONTENT = {

  her: {
    name: "Kira",
    tabTitle: "For Kira",
    // MM-DD. On this exact date the cover says "it's today" and throws confetti.
    birthday: "09-02",
  },

  /* ---- Small bits of interface text. Change or translate freely. -------- */
  ui: {
    menuTitle: "The chapters",
    resume: "you left off at",
    startOver: "start over",
    today: "it's today",
    shareText: "Something I made for you.",
    linkCopied: "link copied",
  },

  /* ---- The duck. She gets teased by it on every single page. ------------ */
  duck: {
    // random things the duck says when she taps it, anywhere on the site
    quacks: [
      "quack.",
      "batakh spotted.",
      "you're the batakh, not me.",
      "he told me everything.",
      "quack quack (that means happy birthday)",
      "I'm just a duck. He's the problem.",
      "waddle waddle. like someone I know.",
      "stop tapping me, I'm working",
    ],
  },

  /* --- Ch.0  THE COVER -------------------------------------------------- */
  cover: {
    kicker: "2nd of September",
    title: "Kira",
    subtitle: "there is a whole book about you in here.",
    button: "Open it",
    hint: "swipe, or tap the page",
  },

  /* --- Ch.1  HAPPY BIRTHDAY --------------------------------------------- */
  birthday: {
    chapter: "Chapter One",
    heading: "Happy Birthday",
    lines: [
      "The world got quietly better on the 2nd of September, and it took me years to find out why.",
      "Blow them out. I'll wait — I'm good at waiting for you.",
    ],
    afterBlow: [
      "Don't tell me the wish.",
      "But if it was me, you should know it already came true.",
    ],
    blowPrompt: "tap the candles",
  },

  /* --- Ch.2  YOUR BEAUTY  ===  YOUR POEM GOES HERE  --------------------- *
     One line per screen-beat. She taps to reveal the next.
     Replace these with your own lines — keep them short, they hit harder.   */
  beauty: {
    chapter: "Chapter Two",
    heading: "On the subject of your face",
    lines: [
      "Some faces are looked at. Yours is *read* — slowly, twice, and then again.",
      "Your eyes don't sparkle. That word is too cheap. They *decide* things.",
      "When you laugh properly, your nose does something small and ridiculous, and I lose the argument I was winning.",
      "You walk into a room and the room rearranges itself politely around you.",
      "They gave the white rose to poetry because they hadn't met you yet.",
      "And on your worst morning — hair like a crime scene, one eye still asleep —",
      "you are still the most beautiful thing that has ever happened to my life.",
    ],
    tapHint: "tap for the next line",
  },

  /* --- Ch.3  SMALL CRIMES  (teasing) ------------------------------------ */
  crimes: {
    chapter: "Chapter Three",
    heading: "A list of your crimes",
    subheading: "Evidence collected over a month. Tap each one.",
    items: [
      { front: "\"tum bhot ajeeb ho\"",
        back:  "Haan ji, ajeeb to hoon — aapke pyar me jo hoon. 🙈" },
      { front: "Baat baat pe naraz ho jana.",
        back:  "Koi ni darling — I'm there. Mana lunga waps se, har baar, bina thake. Naraz hone ka haq bhi sirf tumhara hai." },
      { front: "\"I'm not angry.\"",
        back:  "You are. Magnificently. And I'd rather be scolded by you than praised by anyone else." },
      { front: "Cancelling plans.",
        back:  "Huhhh. Lulu mall, arcade games, bowling... poori list *pending* hai. 😔" },
      { front: "\"Two minutes!\" — forty minutes ago.",
        back:  "You always come down looking like that, so honestly, take fifty." },
      { front: "Not sharing the address.",
        back:  "Kyu ki mai to terrorist hoon na. 😭" },
      { front: "\"aap mujhe bass show krte ho, that you are only mine\"",
        back:  "But sweetheart, I don't just *show* it. I am completely yours — showing is only the part you get to see." },
      { front: "Argues with me, wins, then asks if I'm okay.",
        back:  "That's the whole thing right there. That's why it's you." },
    ],
    verdict: "Verdict: guilty on all counts. Sentence: life, with me.",
  },

  /* --- Ch.4  THE BATAKH  ------------------------------------------------ */
  batakh: {
    chapter: "Chapter Four",
    heading: "Exhibit D: the Batakh",
    intro: "Your Honour, I'd like to present the defendant's nickname.",
    // she has to catch the duck. it runs. these are its taunts, in order.
    taunts: [
      "catch me",
      "too slow",
      "batakh reflexes",
      "this is embarrassing",
      "for you, obviously",
      "okay okay OKAY",
    ],
    caught: "Caught. Fine. You win. You always win.",
    // shown after she catches it
    reasons: [
      "You walk fast and slightly sideways when you're excited. That's a batakh.",
      "You make one noise when you're annoyed and it is, factually, a quack.",
      "You'll defend something tiny and unimportant like it's your child. Batakh energy.",
      "And I could call you a hundred beautiful things — but nothing makes you look at me like that word does.",
    ],
    catchPrompt: "catch the batakh",
  },

  /* --- Ch.5  DO YOU LOVE ME? (the runaway button) ----------------------- */
  game1: {
    chapter: "Chapter Five",
    heading: "One quick question",
    question: "Do you love me?",
    yes: "Yes",
    no: "No",
    taunts: [
      "No", "Are you sure?", "Think again", "Wrong button", "Stop it",
      "This is embarrassing", "For me, obviously", "Okay you're fast",
      "I'm telling your mother", "Fine. FINE.",
      "Huhhh, its fine?", "aise kaise No", "Heheh",
      "pakad pao to pakad lo", "hehe", "ale ale", "Aww my cutie",
      "batakh ho tum", "thak gaye? 🥺", "chalo na, haan bol do",
      "ek baar. bas ek baar.", "please? please? please?",
      "okay okay, Yes wala button udhar hai", "main haar gaya. tum jeet gayi.",
    ],
    win: "I knew it. I just wanted to see you chase something of mine for once.",
  },

  /* --- Ch.6  MEMORY LANE ------------------------------------------------ *
     Drop your photos into the /memories folder and put the filenames here.
     If a photo is missing, the card still shows the caption — nothing breaks. */
  memories: {
    chapter: "Chapter Six",
    heading: "Exhibits A through F",
    subheading: "swipe the photos",
    items: [
      { src: "memories/1.jpg", date: "the first one",  caption: "You were talking. I was pretending to listen and completely failing." },
      { src: "memories/2.jpg", date: "that trip",      caption: "You said you'd only stay ten minutes. We watched the whole sun go down." },
      { src: "memories/3.jpg", date: "the bad week",   caption: "You held it together for both of us. I've never said thank you properly." },
      { src: "memories/4.jpg", date: "an ordinary Tuesday", caption: "Nothing happened. It's still one of my favourites." },
      { src: "memories/5.jpg", date: "last year",      caption: "You laughed at something I said. I've been chasing that sound ever since." },
    ],
  },

  /* --- Ch.7  THE PRESCRIPTION  (MBBS) ----------------------------------- */
  doctor: {
    chapter: "Chapter Seven",
    heading: "A prescription, from me to the doctor",
    clinic: "Dr. Kira — MBBS (in progress, and terrifyingly good at it)",
    patient: "Patient: Shivansh. Complaint: chronic, incurable.",
    disease: "Disease: in love with Kira.",
    diagnosis: "Diagnosis: severe and permanent. No treatment recommended.",
    // Rx lines she reveals one by one
    rx: [
      { dose: "1 × daily", text: "Eat properly. A doctor who skips meals is just a hypocrite with a stethoscope." },
      { dose: "8 hrs",     text: "Sleep. The syllabus will still be there. It's very loyal that way." },
      { dose: "PRN",       text: "Call me when the ward breaks your heart. Any hour. I mean it." },
      { dose: "∞",         text: "Believe the marks are earned, not lucky. You've never once been lucky — you've been relentless." },
      { dose: "2 × daily", text: "One kiss on the forehead, morning and night. I've checked — there is *no* substitute on the market." },
      { dose: "STAT",      text: "Send me the selfie you decided was bad. It isn't. It's the one I'd frame." },
      { dose: "60 sec",    text: "One hug, held long enough that you forget what you were worried about. Repeat until symptoms stop." },
      { dose: "1 × nightly", text: "Fall asleep on call with me. Yes, you snore. It's the best sound in my day, so don't fix it." },
      { dose: "lifelong",  text: "Keep letting me be this obsessed with you. There is no cure, doctor, and I'm not looking for one." },
    ],
    signOff: "Signed, the only patient who refuses to get better.",
    note: "One day someone's family is going to breathe easier because you didn't give up in second year. I hope you know that.",
    revealPrompt: "tap the pad",
  },

  /* --- Ch.8  THE GYM ---------------------------------------------------- */
  gym: {
    chapter: "Chapter Eight",
    heading: "Personal bests",
    subheading: "tap the dumbbell. one rep at a time.",
    // one line per rep — she taps to lift
    reps: [
      "One. Look at you.",
      "Two. Nobody made you go. You just went.",
      "Three. On days you didn't feel like it. That's the whole secret.",
      "Four. Stronger than last year. Stronger than you admit.",
      "Five. You lift heavier things than dumbbells, and you never count those.",
      "Six. Exams. Wards. Family. Me. All of it, carried.",
      "Seven. This is the part where I get to be proud out loud.",
      "Eight. Batakh with biceps. Terrifying combination.",
    ],
    done: "Set complete. Personal best: being you, every single day, without applause.",
    counterLabel: "reps",
  },

  /* --- Ch.9  WHAT YOU ARE  (inspiration) -------------------------------- */
  inspire: {
    chapter: "Chapter Nine",
    heading: "Now the serious part",
    intro: "People tell you you're beautiful. Fine. Easy. Here's the harder truth:",
    points: [
      { title: "You are not fragile.",
        body:  "I've watched you carry things that would have folded me, and then ask everyone else if they were okay. Stop calling that 'nothing'." },
      { title: "You are better than you let yourself believe.",
        body:  "The gap between what you are and what you think you are is the only thing I'd change about you." },
      { title: "You finish things.",
        body:  "Do you know how rare that is? Most people are a folder of unopened plans. You actually do the thing." },
      { title: "You make people braver.",
        body:  "I am measurably less of a coward than I was before you. That's not a compliment, that's data." },
    ],
    outro: "So this year — ask for more. Loudly. I'm right here, and I've got you.",
  },

  /* --- Ch.10  SCOLD ME -------------------------------------------------- */
  scold: {
    chapter: "Chapter Ten",
    heading: "Your turn. Scold me.",
    subheading: "Go on. Everything I've done wrong. I'll take it.",
    placeholder: "Type it. Don't hold back.",
    send: "Send it",
    replies: [
      "...okay. That's fair. I'm listening.",
      "You're right and I hate that you're right.",
      "In my defence — no. I have no defence. Continue.",
      "This is going in my permanent record, isn't it.",
      "I'd argue, but you get this face when you win and I'm weak.",
      "Noted. Written down. Framed. I'm sorry.",
      "Keep going, I deserve worse.",
      "Okay now you're enjoying this. (So am I. Don't stop.)",
    ],
    final: "Everything you just typed is going straight to me. I'll fix it. Slowly, badly, but I'll fix it.",
    // Leave "" to keep scoldings on her phone only.
    // Paste a Formspree endpoint (https://formspree.io/f/xxxxxxx) to have them emailed to you.
    endpoint: "",
  },

  /* --- Ch.11  THE QUIZ (she cannot lose) -------------------------------- */
  quiz: {
    chapter: "Chapter Eleven",
    heading: "How well do you know me?",
    subheading: "Trick question. Every answer is right.",
    questions: [
      { q: "What's my favourite thing about you?",
        options: ["My eyes", "My laugh", "When I'm angry", "All of it"],
        responses: [
          "Correct. I've lost entire afternoons in them.",
          "Correct. It's my favourite sound in any room.",
          "Correct, and slightly worrying. You're spectacular when you're furious.",
          "Correct. Obviously. Greedy, but correct.",
        ] },
      { q: "What do I think about when it's late and I can't sleep?",
        options: ["Work", "Your exams", "You", "Food"],
        responses: [
          "Wrong. It's you. It's always been you.",
          "Okay — sometimes. I worry about them more than you do.",
          "Correct. Every single time.",
          "Wrong, but only just.",
        ] },
      { q: "If I could relive one day, which one?",
        options: ["The day we met", "Our worst fight", "A boring Sunday with you", "The day you said yes"],
        responses: [
          "Correct. I'd do it again slower.",
          "Correct, actually — because of how it ended.",
          "Correct. That's the real answer. The boring ones are the treasure.",
          "Correct. Best day of my life, and it wasn't close.",
        ] },
    ],
    done: "Full marks. You know me better than I know myself — which is annoying, and the reason this works.",
  },

  /* --- Ch.12  THE LAST PAGE --------------------------------------------- */
  letter: {
    chapter: "The Last Page",
    paragraphs: [
      "Kira,",
      "I made you a whole website because I couldn't fit it into a message, and a card felt like an insult.",
      "I don't know how to say the big thing without sounding like a song, so here it is plainly: my life divides neatly into before you and after you, and the after is unrecognisably better.",
      "You are the person I want to tell things to first. Good news, bad news, stupid news at 2am. That's the whole test of love, I think, and you pass it every day without noticing.",
      "Happy birthday, batakh. Be greedy this year. Ask for everything.",
      "I'm not going anywhere.",
    ],
    signature: "— always yours",
    replayButton: "read it again",
    rosesNote: "a hundred white roses, and none of them are as good as you",
  },
};
