export const mentors = {
  ama: {
    id: "ama",
    name: "Ama",
    emoji: "👩🏾‍🎓",
    personality: "calm",
    color: "#A55EEA",
    gradient: "linear-gradient(135deg, #A55EEA, #6366F1)",
    title: "Your Study Sister",
    description: "Calm, patient and reassuring. Ama breaks things down step by step and never lets you feel behind.",
    greetings: {
      earlyMorning: [
        "Early rise! You're already ahead of everyone still sleeping. Let's make this count.",
        "5AM energy! Your brain is fresh — perfect time for something challenging.",
        "Wow, up before sunrise? That's the kind of dedication that passes BECE. Let's go."
      ],
      morning: [
        "Good morning! A fresh day, a fresh start. What are we conquering today?",
        "Morning! Your brain is at peak power right now. Let's use it well.",
        "Rise and shine! Every lesson you do today is one less thing to worry about later."
      ],
      afternoon: [
        "Hey! Afternoon sessions build real discipline. You showed up — that already matters.",
        "Good afternoon! Even 20 minutes of focused study beats 2 hours of distraction.",
        "You're here in the afternoon — that tells me you're serious. Let's not waste it."
      ],
      evening: [
        "Evening study session — this is where champions are made. Ready?",
        "Hey! The quiet evening is perfect for deep focus. Let's get into it.",
        "Evening already? Time flies. But you're here, and that's what matters. Let's go."
      ],
      lateNight: [
        "Late night? Don't burn out. Just 5 minutes of flashcards, then get some good sleep.",
        "Hey, it's late. Your brain needs rest to actually store what you're learning. Quick review then sleep?",
        "You're still studying this late — I see you. Just a short session, then rest. Deal?"
      ]
    },
    failureMessages: [
      "Hey, don't sweat it. This topic trips everyone up at first. Let's break it down together.",
      "Missing these is completely normal — it means you're learning something new. Let's try a different approach.",
      "I've seen students go from failing this to acing it. You just need to see it from a different angle.",
      "Wrong answers now mean right answers on exam day. Let's understand why together."
    ],
    streakMessages: [
      "Yes! That's the Ama student I know. Keep that energy going!",
      "Correct again! Your understanding of this is growing with every question.",
      "That's two in a row — your brain is locking this in. Don't stop now!"
    ],
    sessionClose: [
      "You just put in real work today. Your brain is building muscle you can't see yet — but it's there.",
      "Session done! You studied when you could have been doing something else. That discipline will show on exam day.",
      "Every session like this one is a deposit into your BECE bank account. You're getting richer."
    ]
  },
  kofi: {
    id: "kofi",
    name: "Kofi",
    emoji: "👨🏾‍💻",
    personality: "energetic",
    color: "#00C896",
    gradient: "linear-gradient(135deg, #00C896, #4B7BEC)",
    title: "Your Hype Coach",
    description: "High energy, motivating and direct. Kofi pushes you harder and celebrates every win loudly.",
    greetings: {
      earlyMorning: [
        "EARLY MORNING GRIND! You're already winning before most people wake up. LET'S GO!",
        "5AM?! That's not studying, that's a different level entirely. Champion behaviour!",
        "Up before sunrise to study? The BECE doesn't know what's coming. Let's attack this!"
      ],
      morning: [
        "GOOD MORNING CHAMPION! Today is another chance to get better. Don't waste it!",
        "Morning! Your competition is still sleeping. You're already ahead. Push harder!",
        "Rise up! The BECE is coming and you're out here putting in work. Respect. Let's go!"
      ],
      afternoon: [
        "AFTERNOON SESSION! No excuses, just results. What are we smashing today?",
        "You showed up in the afternoon — that's discipline. Now let's go even harder!",
        "Afternoon grind hits different. You're building something real here. Let's attack it!"
      ],
      evening: [
        "EVENING WARRIOR! While others relax, you're here building your future. LEGENDARY!",
        "Evening study? That's next level commitment. The BECE results will show it. Push!",
        "You're here in the evening — I respect that MORE than anything. Let's make it count!"
      ],
      lateNight: [
        "Okay okay, late night warrior! But real talk — get some sleep after this. Brain needs rest to win.",
        "Late night hustle is real but so is burnout. Quick power session then REST. Deal?",
        "You're still going at this hour?! Respect. But 20 minutes max then sleep — that's how champions recover."
      ]
    },
    failureMessages: [
      "HEY! Missing questions is PART of the process. Every wrong answer is making you stronger!",
      "Wrong answer? Good! Now you know exactly what to fix. That's MORE valuable than guessing right.",
      "Champions don't give up when they miss — they figure out WHY and come back stronger. Let's do that!",
      "This question beat you? Not for long. Let's understand it and make it YOUR question."
    ],
    streakMessages: [
      "YESSS! That's what I'm talking about! You're on fire right now!",
      "Another correct one! You're not just guessing — you KNOW this. Keep pushing!",
      "TWO IN A ROW! Your brain is locked in. This is what peak performance looks like!"
    ],
    sessionClose: [
      "SESSION COMPLETE! You just did what most students won't. That gap between you and them just got bigger!",
      "Done! Every session like this is proof you're built different. BECE doesn't stand a chance!",
      "You put in REAL work today. Write today's date down — this is when things started changing!"
    ]
  }
};

export const getMentorGreeting = (mentorId) => {
  const mentor = mentors[mentorId] || mentors.ama;
  const hour = new Date().getHours();
  let category;
  if (hour >= 4 && hour < 7) category = "earlyMorning";
  else if (hour >= 7 && hour < 12) category = "morning";
  else if (hour >= 12 && hour < 17) category = "afternoon";
  else if (hour >= 17 && hour < 22) category = "evening";
  else category = "lateNight";
  const messages = mentor.greetings[category];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getFailureMessage = (mentorId) => {
  const mentor = mentors[mentorId] || mentors.ama;
  const msgs = mentor.failureMessages;
  return msgs[Math.floor(Math.random() * msgs.length)];
};

export const getStreakMessage = (mentorId) => {
  const mentor = mentors[mentorId] || mentors.ama;
  const msgs = mentor.streakMessages;
  return msgs[Math.floor(Math.random() * msgs.length)];
};

export const getSessionCloseMessage = (mentorId) => {
  const mentor = mentors[mentorId] || mentors.ama;
  const msgs = mentor.sessionClose;
  return msgs[Math.floor(Math.random() * msgs.length)];
};