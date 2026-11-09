
// HOTEL IMPOSSIBLE
// The hotel has a few secrets...

const intro = document.getElementById("intro");
const hotel = document.getElementById("hotel");
const modal = document.getElementById("modal");
const secretMessage = document.getElementById("secretMessage");

let symbolsFound = 0;
let brandClicks = 0;
let pageNumber = 0;
let soundOn = false;

// INTRO
document.getElementById("enterButton").addEventListener("click", () => {
  intro.classList.add("fade-out");
  hotel.classList.remove("hidden");

  setTimeout(() => {
    intro.style.display = "none";
  }, 1100);
});

// CUSTOM CURSOR
const cursor = document.querySelector(".cursor-key");

document.addEventListener("mousemove", (event) => {
  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
});

// NAVIGATION
document.querySelectorAll(".key-card").forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.getElementById(card.dataset.target);

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// RECEPTION BUTTON
document.getElementById("receptionButton").addEventListener("click", () => {
  showMessage(
    "THE RECEPTIONIST",
    "Good evening. We have been expecting you. Your room is ready. We just cannot remember which one."
  );
});

// MODAL SYSTEM
function openModal(eyebrow, symbol, title, text, extra = "") {
  document.getElementById("modalEyebrow").textContent = eyebrow;
  document.getElementById("modalSymbol").textContent = symbol;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = text;
  document.getElementById("modalExtra").textContent = extra;

  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalAction").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

// ROOM INFORMATION
const rooms = {
  "13": {
    symbol: "☾",
    title: "The Midnight Room",
    text: "Welcome to room 013. The clock has stopped at 11:59 PM. It has been that way for 103 years.",
    extra: "ROOM RULE: Never ask what happens at midnight."
  },
  "27": {
    symbol: "❄",
    title: "The Frozen Summer",
    text: "Outside, it is always summer. Inside, snowflakes float upwards and the fireplace burns with blue flames.",
    extra: "ROOM RULE: Do not open the window."
  },
  "42": {
    symbol: "⌛",
    title: "The Lost Afternoon",
    text: "This room contains all the afternoons people have forgotten. You may hear someone laughing in the next room.",
    extra: "ROOM RULE: Do not take anything home."
  },
  "66": {
    symbol: "♧",
    title: "The Whispering Garden",
    text: "A garden grows behind the walls. The flowers whisper the names of everyone who has ever stayed here.",
    extra: "ROOM RULE: The roses are listening."
  }
};

document.querySelectorAll("[data-open-room]").forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.openRoom;
    const room = rooms[number];

    openModal(
      "ROOM Nº " + number,
      room.symbol,
      room.title,
      room.text,
      room.extra
    );

    discoverSymbol();
  });
});

// ELEVATOR
const floorMessages = {
  "1": "The ordinary floor. Almost suspiciously ordinary.",
  "2": "A corridor filled with paintings. Their eyes follow you.",
  "7": "A library where every book tells the future.",
  "13": "The lights flicker. Someone has already pressed this button.",
  "27": "A beach at night. There is no sea, only stars.",
  "99": "The roof. But the sky looks like a ceiling.",
  "0": "The elevator is going down. The building has no basement.",
  "000": "THE SECRET FLOOR. You were not supposed to find this."
};

document.querySelectorAll("[data-floor]").forEach((button) => {
  button.addEventListener("click", () => {
    const floor = button.dataset.floor;
    const display = document.getElementById("floorDisplay");
    const result = document.getElementById("elevatorResult");

    display.textContent = "•••";
    result.textContent = "The elevator is moving...";

    setTimeout(() => {
      display.textContent = floor === "000" ? "???": floor.padStart(2, "0");
      result.textContent = floorMessages[floor];

      if (floor === "000") {
        setTimeout(() => {
          openModal(
            "RESTRICTED FLOOR",
            "⚿",
            "Welcome to Room 000",
            "There is no room here. Only a door. And behind that door, the hotel itself.",
            "YOU HAVE FOUND THE FIRST CLUE."
          );
          discoverSymbol();
        }, 600);
      }

      if (floor === "13") {
        discoverSymbol();
      }
    }, 1000);
  });
});

// GUESTBOOK PAGE TURN
const guestEntries = [
  [
    ["22 JANUARY 1901", "I have been here for three days. My watch says it is 1901. The newspaper says 1984.", "— E. W."],
    ["UNKNOWN DATE", "The receptionist has not aged a single day. I think she knows.", "— MYSTERY GUEST"],
    ["17 AUGUST 2003", "I found a key under my pillow. It had no number. I wish I had never picked it up.", "— L. R."]
  ],
  [
    ["04 APRIL 1933", "There is a staircase behind the wallpaper. I heard music coming from below.", "— MR. H."],
    ["UNKNOWN DATE", "Room 27 has a second door. I opened it. It led to the same room.", "— A GUEST"],
    ["31 DECEMBER 1897", "Tonight the hotel opens. Nobody has told me what year it is.", "— THE FIRST GUEST"]
  ],
  [
    ["NO DATE", "If you are reading this, the hotel has noticed you.", "— ???"],
    ["NO DATE", "Do not trust the floor numbers. They change when you are asleep.", "— ???"],
    ["NO DATE", "I think I am writing this before you arrive.", "— ???"]
  ]
];

document.getElementById("nextEntry").addEventListener("click", () => {
  pageNumber = (pageNumber + 1) % guestEntries.length;

  const entries = document.querySelectorAll(".guest-entry");

  entries.forEach((entry, index) => {
    const data = guestEntries[pageNumber][index];

    entry.querySelector("span").textContent = data[0];
    entry.querySelector("p").textContent = '"' + data[1] + '"';
    entry.querySelector("small").textContent = data[2];
  });

  const button = document.getElementById("nextEntry");
  button.textContent = pageNumber === 0 ? "TURN THE PAGE →" : "NEXT PAGE →";

  discoverSymbol();
});

// SECRET SYMBOLS
function discoverSymbol() {
  if (symbolsFound >= 5) return;

  symbolsFound++;

  document.getElementById("symbolCounter").textContent =
    "HIDDEN SYMBOLS FOUND: " + symbolsFound + " / 5";

  if (symbolsFound === 5) {
    const archive = document.getElementById("lockedArchive");

    archive.classList.remove("locked-item");
    archive.innerHTML = `
      <span>ARCHIVE 004 · UNLOCKED</span>
      <h3>The Hotel Knows</h3>
      <p>The hotel is not a building. It is a place between moments. It appears to people who are looking for something they have lost.</p>
      <div class="archive-lock">✦</div>
    `;

    showMessage(
      "ARCHIVE UNLOCKED",
      "You found all five symbols. The hotel has a message for you: You were never just a guest."
    );
  }
}

// HIDDEN BRAND SECRET
document.getElementById("brand").addEventListener("click", () => {
  brandClicks++;

  if (brandClicks >= 5) {
    brandClicks = 0;

    showMessage(
      "THE HOTEL REMEMBERS",
      "You have visited this place before. Perhaps not in this life. Perhaps not in this year."
    );

    discoverSymbol();
  }
});

// SECRET FOOTER BUTTON
document.getElementById("footerSecret").addEventListener("click", () => {
  showMessage(
    "A FINAL NOTE",
    "There is one more room. It is not in the hotel. It is the hotel."
  );
  discoverSymbol();
});

// SOUND SWITCH
document.getElementById("soundButton").addEventListener("click", () => {
  soundOn = !soundOn;

  document.getElementById("soundButton").textContent =
    soundOn ? "♫ SOUND ON" : "♫ SOUND OFF";

  showMessage(
    soundOn ? "SOUND ENABLED" : "SOUND DISABLED",
    soundOn
      ? "The hotel is still quiet. Background sound is not included yet."
      : "Silence returns to the hotel."
  );
});

// MESSAGE POPUP
function showMessage(title, text) {
  document.querySelector(".secret-message span").textContent = title;
  document.getElementById("secretText").textContent = text;
  secretMessage.classList.add("show");
}

document.getElementById("secretClose").addEventListener("click", () => {
  secretMessage.classList.remove("show");
});

// EXTRA EASTER EGG: PRESS H
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "h") {
    showMessage(
      "A SECRET MESSAGE",
      "H stands for Hotel. But perhaps it also stands for something else..."
    );
  }

  if (event.key === "Escape") {
    closeModal();
    secretMessage.classList.remove("show");
  }
});

// THE CLOCK GLITCH
let clockGlitch = 0;

document.querySelector(".hero-number").addEventListener("click", () => {
  clockGlitch++;

  const number = document.querySelector(".hero-number");

  if (clockGlitch >= 3) {
    number.textContent = "YOU ARE HERE";
    number.style.color = "#e8c987";

    showMessage(
      "LOCATION DETECTED",
      "The hotel has found your location. You are standing in the Grand Lobby."
    );

    discoverSymbol();
  }
});

// RANDOM HOTEL MESSAGE
const randomMessages = [
  "The receptionist says hello. She has been waiting for 126 years.",
  "A bell rings somewhere upstairs. Nobody is there.",
  "The hotel lights flicker. Then everything is normal again.",
  "You hear footsteps in the corridor. They stop when you stop.",
  "A key has appeared on the reception desk."
];

document.addEventListener("dblclick", (event) => {
  if (
    event.target.closest("button") ||
    event.target.closest(".modal") ||
    event.target.closest(".secret-message")
  ) return;

  if (Math.random() > 0.65) {
    const message = randomMessages[
      Math.floor(Math.random() * randomMessages.length)
    ];

    showMessage("A HOTEL OCCURRENCE", message);
  }
});
