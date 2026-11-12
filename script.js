
/* =========================================
   1. FOTO
========================================= */

document.querySelectorAll(".ph img").forEach(img => {
  img.addEventListener("error", () => {
    img.remove();
  });
});


/* =========================================
   2. ANIMASI SAAT SCROLL
========================================= */

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".slide").forEach(slide => {
  io.observe(slide);
});

/* =========================================
   3. MUSIK DAN PIRINGAN VINYL
========================================= */

const vinyl = document.getElementById("vinyl");
const audio = document.getElementById("audio");
const musicStatus = document.getElementById("music-status");

if (vinyl && audio) {

  // Atur volume tanpa memutar otomatis
  audio.volume = 1;

  // Animasi vinyl mengikuti kondisi audio
  audio.addEventListener("play", () => {
    vinyl.classList.add("play");
  });

  audio.addEventListener("pause", () => {
    vinyl.classList.remove("play");
  });

  audio.addEventListener("ended", () => {
    vinyl.classList.remove("play");
  });

  // Hanya klik pada vinyl yang mengontrol musik
  vinyl.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.log("Musik belum dapat diputar.");
      }
    } else {
      audio.pause();
    }
  });

}

// Status musik
if (audio && musicStatus) {

  audio.addEventListener("playing", () => {
    musicStatus.textContent = "Now playing for you ♡";
  });

  audio.addEventListener("pause", () => {
    musicStatus.textContent = "Paused — click the record ♡";
  });

  audio.addEventListener("error", () => {
    musicStatus.textContent = "Check your music file ♡";
  });

}


/* =========================================
   4. STIKER RANDOM DI SETIAP HALAMAN
========================================= */

const stickerList = [
  "img/stiker.png",
  "img/stiker2.png",
  "img/stiker3.png",
  "img/stiker4.png",
  "img/stiker5.png",
  "img/stiker6.png",
  "img/stiker7.png",
  "img/stiker8.png",
  "img/stiker9.png",
  "img/stiker10.png"
];

const stickerPositions = [
  { top: "-25px", left: "15px" },
  { top: "-20px", right: "15px" },
  { bottom: "-20px", left: "15px" },
  { bottom: "-25px", right: "15px" }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

document.querySelectorAll(".slide").forEach(slide => {

  const selectedStickers = shuffle(stickerList).slice(0, 4);
  const selectedPositions = shuffle(stickerPositions);

  selectedStickers.forEach((src, index) => {

    const sticker = document.createElement("img");

    sticker.src = src;
    sticker.classList.add("random-sticker");

    const sizes = ["small", "medium", "large"];
    const randomSize = sizes[
      Math.floor(Math.random() * sizes.length)
    ];

    sticker.classList.add(randomSize);

    Object.assign(sticker.style, selectedPositions[index]);

    const rotation = Math.floor(Math.random() * 31) - 15;

    sticker.style.transitionDelay = `${index * 0.12}s`;
    sticker.dataset.rotation = rotation;

    slide.appendChild(sticker);

    function showSticker() {
      if (slide.classList.contains("show")) {
        sticker.style.transform =
          `rotate(${rotation}deg) scale(1)`;
        return true;
      }

      return false;
    }

    if (!showSticker()) {
      const observer = new MutationObserver(() => {
        if (showSticker()) {
          observer.disconnect();
        }
      });

      observer.observe(slide, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

  });

});


/* =========================================
   5. ONE LAST SURPRISE - GIFT BOX
========================================= */

(() => {

  const giftBox = document.getElementById("giftBox");
  const giftHint = document.getElementById("giftHint");
  const giftReveal = document.getElementById("giftReveal");
  const giftReplay = document.getElementById("giftReplay");
  const giftConfetti = document.getElementById("giftConfetti");

  if (!giftBox || !giftHint || !giftReveal ||
      !giftReplay || !giftConfetti) return;

  let opened = false;
  let confettiTimer;

  function launchConfetti() {

    clearTimeout(confettiTimer);
    giftConfetti.replaceChildren();

    const colors = [
      "#f2a0b9",
      "#f7c9d5",
      "#ffe7a8",
      "#d9b8e8",
      "#ffffff",
      "#e77f9e"
    ];

    for (let i = 0; i < 65; i++) {

      const piece = document.createElement("span");
      piece.className = "gift-confetti-piece";

      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 250;

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 50;

      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.setProperty("--x", `${x}px`);
      piece.style.setProperty("--y", `${y}px`);

      piece.style.setProperty(
        "--rotation",
        `${Math.random() * 900 - 450}deg`
      );

      piece.style.setProperty(
        "--duration",
        `${1.2 + Math.random() * 1.5}s`
      );

      piece.style.setProperty(
        "--delay",
        `${Math.random() * 0.35}s`
      );

      if (Math.random() > 0.6) {
        piece.style.width = "7px";
        piece.style.height = "7px";
        piece.style.borderRadius = "50%";
      }

      giftConfetti.appendChild(piece);
    }

    confettiTimer = setTimeout(() => {
      giftConfetti.replaceChildren();
    }, 2500);

  }

  function openGift() {

    if (opened) {
      launchConfetti();
      return;
    }

    opened = true;

    giftBox.classList.add("opened");
    giftBox.setAttribute("aria-expanded", "true");

    giftHint.textContent = "Yay! Your surprise is here ♡";
    giftReveal.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      giftReveal.classList.add("visible");
      launchConfetti();
    }, 350);

  }

  giftBox.addEventListener("click", openGift);

  giftReplay.addEventListener("click", () => {

    launchConfetti();

    giftReplay.textContent = "One more time! ♡";

    setTimeout(() => {
      giftReplay.textContent = "Open it again ↻";
    }, 1800);

  });

})();


/* =========================================
   6. PETALS & HEARTS ON SCROLL
========================================= */

(() => {

  const symbols = [
    { char: "🌸", type: "petal" },
    { char: "🌷", type: "petal" },
    { char: "🌺", type: "petal" },
    { char: "💗", type: "heart" },
  ];

  let lastSection = null;
  let lastBurst = 0;

  function createPetal() {

    const item = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    const el = document.createElement("span");

    el.className = `scroll-petal ${item.type}`;
    el.textContent = item.char;

    const fromLeft = Math.random() < 0.5;
    const side = fromLeft
      ? Math.random() * 12
      : 88 + Math.random() * 12;

    el.style.left = `${side}%`;
    el.style.fontSize = `${14 + Math.random() * 19}px`;

    el.style.setProperty(
      "--duration",
      `${3.5 + Math.random() * 2.5}s`
    );

    el.style.setProperty(
      "--drift1",
      `${-35 + Math.random() * 70}px`
    );

    el.style.setProperty(
      "--drift2",
      `${-45 + Math.random() * 90}px`
    );

    el.style.setProperty(
      "--drift3",
      `${-30 + Math.random() * 60}px`
    );

    document.body.appendChild(el);

    el.addEventListener(
      "animationend",
      () => el.remove(),
      { once: true }
    );

  }

  function makeBurst() {

    const now = Date.now();

    if (now - lastBurst < 700) return;

    lastBurst = now;

    const total = window.innerWidth < 600 ? 5 : 8;

    for (let i = 0; i < total; i++) {
      setTimeout(createPetal, i * 130);
    }

  }

  const sections = document.querySelectorAll(".slide");

  const observer = new IntersectionObserver(entries => {

    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort(
        (a, b) => b.intersectionRatio - a.intersectionRatio
      )[0];

    if (!visible) return;

    const currentSection = visible.target;

    if (currentSection !== lastSection) {
      lastSection = currentSection;
      makeBurst();
    }

  }, {
    threshold: [0.25, 0.5, 0.7]
  });

  sections.forEach(section => observer.observe(section));

})();


/* =========================================
   7. GUESTBOOK - LOCAL STORAGE
   Aman jika bagian Guestbook tidak ada
========================================= */

const guestbookForm = document.getElementById("guestbookForm");
const guestbookList = document.getElementById("guestbookList");
const guestbookEmpty = document.getElementById("guestbookEmpty");

const GUESTBOOK_KEY = "birthday_guestbook_messages";

function getGuestbookMessages() {

  try {
    return JSON.parse(
      localStorage.getItem(GUESTBOOK_KEY) || "[]"
    );
  } catch {
    return [];
  }

}

function displayGuestbookMessages() {

  if (!guestbookList || !guestbookEmpty) return;

  const messages = getGuestbookMessages();

  guestbookList.replaceChildren();

  guestbookEmpty.style.display =
    messages.length ? "none" : "block";

  messages.slice().reverse().forEach(message => {

    const card = document.createElement("div");
    card.className = "guestbook-card";

    const name = document.createElement("strong");
    name.textContent = message.name;

    const content = document.createElement("p");
    content.textContent = message.text;

    const date = document.createElement("small");
    date.textContent = message.date;

    card.append(name, content, date);
    guestbookList.appendChild(card);

  });

}

if (guestbookForm) {

  guestbookForm.addEventListener("submit", e => {

    e.preventDefault();

    const name =
      document.getElementById("guestName")?.value.trim() || "";

    const message =
      document.getElementById("guestMessage")?.value.trim() || "";

    if (!message) return;

    const messages = getGuestbookMessages();

    messages.push({
      name: name || "Someone special ♡",
      text: message,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    });

    try {

      localStorage.setItem(
        GUESTBOOK_KEY,
        JSON.stringify(messages)
      );

      guestbookForm.reset();
      displayGuestbookMessages();

    } catch {
      alert("Pesan tidak dapat disimpan.");
    }

  });

}

displayGuestbookMessages();


/* =========================================
   8. BIRTHDAY COUNTDOWN
========================================= */

(() => {

  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minutesEl = document.getElementById("count-minutes");
  const secondsEl = document.getElementById("count-seconds");
  const messageEl = document.getElementById("countdown-message");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.error("Countdown: elemen HTML tidak ditemukan!");
    return;
  }

  // 19 November 2026 pukul 00.00 waktu lokal
  const targetDate = new Date(2026, 10, 19, 0, 0, 0).getTime();

  function updateCountdown() {

    const remaining = targetDate - Date.now();

    if (remaining <= 0) {

      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      if (messageEl) {
        messageEl.textContent = "Happy Birthday, My Love! ♡";
      }

      clearInterval(timer);
      return;

    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

  }

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);

  console.log("♡ Birthday countdown berhasil dijalankan!");

})();

// ==================================
// HIDDEN LOVE - FIND 5 HEARTS
// ==================================

const hiddenHearts = document.querySelectorAll(".hidden-love-heart");
const hiddenLoveCount = document.getElementById("hiddenLoveCount");
const hiddenLoveModal = document.getElementById("hiddenLoveModal");
const closeSecretMessage = document.getElementById("closeSecretMessage");

let foundHearts = 0;

hiddenHearts.forEach((heart) => {
  heart.addEventListener("click", () => {

    // Cegah hati dihitung dua kali
    if (heart.classList.contains("found")) return;

    heart.classList.add("found");
    foundHearts++;

    // Perbarui penghitung
    hiddenLoveCount.textContent = foundHearts;

    // Tampilkan pesan setelah semua hati ditemukan
    if (foundHearts === 5) {
      setTimeout(() => {
        hiddenLoveModal.classList.add("active");
      }, 700);
    }

  });
});

// Tutup pesan rahasia
if (closeSecretMessage && hiddenLoveModal) {
  closeSecretMessage.addEventListener("click", () => {
    hiddenLoveModal.classList.remove("active");
  });
}

// Tutup jika area luar pesan diklik
if (hiddenLoveModal) {
  hiddenLoveModal.addEventListener("click", (event) => {
    if (event.target === hiddenLoveModal) {
      hiddenLoveModal.classList.remove("active");
    }
  });
}

// =================================
// WELCOME OPENING SCREEN
// =================================

const welcomeScreen = document.getElementById("welcomeScreen");
const openBirthday = document.getElementById("openBirthday");

if (welcomeScreen && openBirthday) {

  // Kunci scroll sebelum tombol ditekan
  document.body.style.overflow = "hidden";

  openBirthday.addEventListener("click", () => {

    welcomeScreen.classList.add("opening");

    // Setelah tirai terbuka
    setTimeout(() => {
      welcomeScreen.classList.add("finished");

      document.body.style.overflow = "";

    }, 2100);

  });

}

/* =====================================
   ELEGANT CHAPTER NAVIGATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const chapterNav = document.getElementById("chapterNav");

  if (!chapterNav) return;

  // Nama halaman sesuai urutan section.slide di HTML
  const chapterNames = [
    "Birthday",
    "my favorite person",
    "My Wishes & Prayers for You",
    "Open When",
    "This song is just like you.",
    "A Little Love Letter for You",
    "A little look into your little world ",
    "The Little Things",
    "One Last Surprise",
    
    
  ];

  const chapters = document.querySelectorAll(".slide");

  if (!chapters.length) return;

  const navItems = [];

  chapters.forEach((chapter, index) => {

    const number = String(index + 1).padStart(2, "0");
    const label = chapterNames[index] || `Chapter ${number}`;

    const button = document.createElement("button");

    button.className = "chapter-nav-item";
    button.type = "button";
    button.setAttribute("aria-label", `${number} - ${label}`);

    button.innerHTML = `
      ${number}
      <span>${label}</span>
    `;

    // Klik untuk menuju halaman
    button.addEventListener("click", () => {
      chapter.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    chapterNav.appendChild(button);
    navItems.push(button);
  });

  // Deteksi halaman yang sedang terlihat
  const chapterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        const index = [...chapters].indexOf(entry.target);

        navItems.forEach((item, i) => {
          item.classList.toggle("active", i === index);
        });

      }

    });

  }, {
    threshold: 0.35
  });

  chapters.forEach((chapter) => {
    chapterObserver.observe(chapter);
  });

});

/* =================================
   MINI FLOATING MUSIC CONTROL
================================= */

document.addEventListener("DOMContentLoaded", () => {
  const floatingMusic = document.getElementById("floatingMusic");
  const floatingMusicBtn = document.getElementById("floatingMusicBtn");
  const floatingMusicIcon = document.getElementById("floatingMusicIcon");

  // Menggunakan audio dan vinyl yang sudah ada
  const audio = document.getElementById("audio");
  const vinyl = document.getElementById("vinyl");

  if (!floatingMusic || !floatingMusicBtn || !audio) return;

  // Sinkronisasi tampilan tombol dengan kondisi musik
  function updateFloatingMusic() {
    const isPlaying = !audio.paused;

    floatingMusic.classList.toggle("playing", isPlaying);

    floatingMusicIcon.textContent = isPlaying ? "Ⅱ" : "▶";

    floatingMusicBtn.setAttribute(
      "aria-label",
      isPlaying ? "Jeda musik" : "Putar musik"
    );

    floatingMusicBtn.title = isPlaying ? "Jeda musik" : "Putar musik";

    // Sinkronkan juga animasi vinyl
    if (vinyl) {
      vinyl.classList.toggle("play", isPlaying);
    }
  }

  // Tombol Play / Pause
  floatingMusicBtn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.log("Musik belum dapat diputar:", error);
      }
    } else {
      audio.pause();
    }

    updateFloatingMusic();
  });

  // Update otomatis ketika audio berubah
  audio.addEventListener("play", updateFloatingMusic);
  audio.addEventListener("pause", updateFloatingMusic);
  audio.addEventListener("ended", updateFloatingMusic);

  // Munculkan kontrol setelah pengunjung mulai scroll
  window.addEventListener("scroll", () => {
    floatingMusic.classList.toggle("visible", window.scrollY > 300);
  }, { passive: true });

  updateFloatingMusic();
});


/* ==========================================
   OPEN WHEN — LETTER INTERACTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".open-when-envelope");
  const dialog = document.getElementById("openWhenDialog");
  const closeButton = document.getElementById("closeOpenWhen");
  const title = document.getElementById("openWhenTitle");
  const content = document.getElementById("openWhenContent");

  if (!envelopes.length || !dialog || !closeButton || !title || !content) {
    return;
  }

  const letters = {
    miss: {
      title: "When You Miss Me ♡",
      paragraphs: [
        "My love,",
        "If you're reading this, maybe you're missing me right now.",
        "I wish I could be there beside you, hold your hand, and give you the warmest hug.",
        "But until that moment comes, remember that distance doesn't change how much you mean to me.",
        "I'm always cheering for you, thinking of you, and hoping you're doing okay.",
        "I miss you too, more than words can say. ♡"
      ]
    },

    sad: {
      title: "When You Feel Sad ♡",
      paragraphs: [
        "Hey, my favorite girl.",
        "I don't know exactly what happened today, but I want you to know that it's okay not to be okay.",
        "You don't have to be strong every second. You are allowed to rest, cry, and take your time.",
        "Please remember that one difficult day doesn't make your whole life difficult.",
        "I hope tomorrow brings you a little more happiness. And I hope you never forget how precious you are to me.",
        "Sending you the biggest hug. ♡"
      ]
    },

    hug: {
      title: "When You Need a Hug ♡",
      paragraphs: [
        "Come here, my love.",
        "Imagine me wrapping my arms around you right now, holding you close and telling you that everything will be alright.",
        "No words are needed sometimes. Just a warm hug, a little silence, and the feeling that someone is there for you.",
        "If I could, I would stay in that hug a little longer.",
        "Until I can do that in person, let this little letter be my hug for you. ♡"
      ]
    },

    doubt: {
      title: "When You Doubt Yourself ♡",
      paragraphs: [
        "My beautiful girl,",
        "I wish you could see yourself through my eyes, even just for a moment.",
        "You are more capable, more beautiful, and stronger than you sometimes believe.",
        "Don't let one mistake or one bad day make you question your worth.",
        "You don't have to be perfect to be wonderful. You are already someone worth being proud of.",
        "I believe in you, always. ♡"
      ]
    }
  };

  let openingTimer;

  envelopes.forEach((envelope) => {
    envelope.addEventListener("click", () => {
      const letterKey = envelope.dataset.letter;
      const letter = letters[letterKey];

      if (!letter || envelope.classList.contains("opening")) return;

      envelopes.forEach(item => item.classList.remove("opening"));
      envelope.classList.add("opening");

      clearTimeout(openingTimer);

      openingTimer = setTimeout(() => {
        title.textContent = letter.title;

        content.replaceChildren();

        letter.paragraphs.forEach((paragraph) => {
          const p = document.createElement("p");
          p.textContent = paragraph;
          content.appendChild(p);
        });

        if (!dialog.open) {
          dialog.showModal();
        }

        envelope.classList.remove("opening");
      }, 350);
    });
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // Klik area gelap di luar surat untuk menutup
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});


