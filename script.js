
/* =====================================
   THE SECRET GARDEN
   INTERACTIVE JAVASCRIPT
===================================== */

// INTRO

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterGarden");

enterButton.addEventListener("click", () => {
    intro.classList.add("hidden");
    showSecret("Welcome to your secret garden. 🌿");
});


// SECRET POPUP

const secretPopup = document.getElementById("secretPopup");
const secretText = document.getElementById("secretText");
const closeSecret = document.getElementById("closeSecret");

function showSecret(message) {
    secretText.textContent = message;
    secretPopup.classList.add("show");
}

closeSecret.addEventListener("click", () => {
    secretPopup.classList.remove("show");
});


// ARCHIVE FILTER

const filterButtons = document.querySelectorAll(".filter");
const plantCards = document.querySelectorAll(".plant-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        plantCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || filter === category) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});


// PLANT DETAIL WINDOWS

const specimenModal = document.getElementById("specimenModal");

const modalName = document.getElementById("modalName");
const modalLatin = document.getElementById("modalLatin");
const modalDescription = document.getElementById("modalDescription");

const detailButtons = document.querySelectorAll(".details-button");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalName.textContent = button.dataset.name;
        modalLatin.textContent = button.dataset.latin;
        modalDescription.textContent = button.dataset.description;

        specimenModal.classList.add("show");

    });

});

document.getElementById("closeSpecimen").addEventListener("click", () => {
    specimenModal.classList.remove("show");
});

specimenModal.addEventListener("click", event => {

    if (event.target === specimenModal) {
        specimenModal.classList.remove("show");
    }

});


// DIGITAL GREENHOUSE

const garden = document.getElementById("garden");
const emptyMessage = document.getElementById("emptyMessage");
const plantCounter = document.getElementById("plantCounter");

const seedButtons = document.querySelectorAll(".seed-button");

let plantedPlants = 0;
const maxPlants = 8;

seedButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (plantedPlants >= maxPlants) {
            showSecret("Your greenhouse is full! 🌿");
            return;
        }

        const seed = button.dataset.seed;

        const newPlant = document.createElement("span");

        newPlant.className = "garden-plant";
        newPlant.textContent = seed;
        newPlant.title = "Click to remove this plant";

        newPlant.addEventListener("click", () => {

            newPlant.remove();

            plantedPlants--;

            updateGarden();

            showSecret("One plant has returned to the earth. 🍃");

        });

        garden.appendChild(newPlant);

        plantedPlants++;

        updateGarden();

        if (plantedPlants === 1) {
            showSecret("Your first plant has grown! 🌱");
        }

    });

});

function updateGarden() {

    plantCounter.textContent = plantedPlants + " / " + maxPlants + " PLANTS";

    if (plantedPlants === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}


// QUIZ

const questions = [

    {
        question: "Which plant is famous for its enormous flower?",
        answers: [
            "Rafflesia arnoldii",
            "Sunflower",
            "Tulip",
            "Lavender"
        ],
        correct: 0,
        explanation: "Correct! Rafflesia can produce flowers around one metre wide."
    },

    {
        question: "Which plant can close its leaves when touched?",
        answers: [
            "Baobab",
            "Mimosa pudica",
            "Oak tree",
            "Rose"
        ],
        correct: 1,
        explanation: "Exactly! Mimosa pudica is also called the sensitive plant."
    },

    {
        question: "What is a carnivorous plant?",
        answers: [
            "A plant that only grows at night",
            "A plant that eats soil",
            "A plant that catches and digests animals",
            "A plant without roots"
        ],
        correct: 2,
        explanation: "Well done! Carnivorous plants obtain nutrients from captured prey."
    },

    {
        question: "When does Queen of the Night usually bloom?",
        answers: [
            "In the middle of winter",
            "At night",
            "Only in the morning",
            "During a storm"
        ],
        correct: 1,
        explanation: "Yes! Its beautiful flowers usually open after sunset."
    },

    {
        question: "What can a cactus store in its stem?",
        answers: [
            "Sand",
            "Air",
            "Water",
            "Seeds only"
        ],
        correct: 2,
        explanation: "Correct! Many cacti store water in their thick stems."
    },

    {
        question: "Which tree is famous for its enormous trunk?",
        answers: [
            "Baobab",
            "Birch",
            "Apple tree",
            "Pine"
        ],
        correct: 0,
        explanation: "Amazing! Baobabs are known for their huge trunks."
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizModal = document.getElementById("quizModal");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizProgress = document.getElementById("quizProgress");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

document.getElementById("startQuiz").addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    quizModal.classList.add("show");

    displayQuestion();

});

document.getElementById("closeQuiz").addEventListener("click", () => {
    quizModal.classList.remove("show");
});

quizModal.addEventListener("click", event => {

    if (event.target === quizModal) {
        quizModal.classList.remove("show");
    }

});

function displayQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    quizProgress.textContent =
        "QUESTION " + (currentQuestion + 1) + " / " + questions.length;

    quizQuestion.textContent = q.question;

    quizAnswers.innerHTML = "";

    quizFeedback.textContent = "";

    nextQuestion.hidden = true;

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        quizAnswers.appendChild(button);

    });

}

function checkAnswer(index, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const allAnswers = document.querySelectorAll(".answer-button");

    allAnswers.forEach((button, i) => {

        button.disabled = true;

        if (i === q.correct) {
            button.classList.add("correct");
        }

    });

    if (index === q.correct) {

        score++;

        quizFeedback.textContent = "✦ " + q.explanation;

    } else {

        selectedButton.classList.add("wrong");

        quizFeedback.textContent =
            "Not quite! " + q.explanation;

    }

    nextQuestion.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextQuestion.textContent = "SEE MY RESULTS ↗";
    } else {
        nextQuestion.textContent = "NEXT QUESTION ↗";
    }

}

nextQuestion.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        displayQuestion();

    } else {

        showResults();

    }

});

function showResults() {

    quizProgress.textContent = "YOUR BOTANICAL RESULTS";

    quizQuestion.textContent =
        score + " / " + questions.length;

    quizAnswers.innerHTML = "";

    quizFeedback.textContent =
        score === 6
        ? "Perfect! You are a true botanical expert. ✨"
        : score >= 4
        ? "Wonderful! You know your plants very well. 🌿"
        : score >= 2
        ? "A curious explorer! Keep discovering. 🌱"
        : "Every great botanist starts somewhere. 🌷";

    nextQuestion.textContent = "TRY AGAIN ↗";

    nextQuestion.hidden = false;

    // Restart quiz on next click
    nextQuestion.onclick = () => {

        currentQuestion = 0;
        score = 0;

        nextQuestion.onclick = null;

        displayQuestion();

    };

}


// SECRET 1: THE MOON BUTTON

document.getElementById("moonButton").addEventListener("click", () => {

    document.body.classList.toggle("moon-mode");

    if (document.body.classList.contains("moon-mode")) {

        showSecret("The garden is now under the moonlight. ☾");

    } else {

        showSecret("Welcome back to the daylight. ☀");

    }

});


// SECRET 2: CLICK THE LOGO FIVE TIMES

let logoClicks = 0;

document.getElementById("logo").addEventListener("click", event => {

    logoClicks++;

    if (logoClicks >= 5) {

        event.preventDefault();

        showSecret("You found the forgotten gardener's secret! ✿");

        logoClicks = 0;

    }

});


// SECRET 3: CLICK THE FEATURE FLOWER

document.querySelector(".feature-symbol").addEventListener("click", () => {

    showSecret("A flower never hurries, yet everything blooms in its own time. 🌸");

});


// SECRET 4: CLICK THE FOOTER SYMBOL

document.querySelector(".footer-symbol").addEventListener("click", () => {

    showSecret("ARCHIVE 008 UNLOCKED — The garden remembers you. ✧");

});


// SPECIAL CURSOR FLOWER

const cursorFlower = document.getElementById("cursorFlower");

document.addEventListener("mousemove", event => {

    cursorFlower.style.left = (event.clientX + 12) + "px";
    cursorFlower.style.top = (event.clientY + 12) + "px";
    cursorFlower.style.opacity = "1";

});

document.addEventListener("mouseleave", () => {
    cursorFlower.style.opacity = "0";
});


// SECRET 5: DOUBLE CLICK THE BACKGROUND

let backgroundClicks = 0;

document.querySelector(".hero-plant").addEventListener("dblclick", () => {

    backgroundClicks++;

    showSecret("A tiny secret is growing somewhere... 🌱");

});


// ESCAPE KEY CLOSES WINDOWS

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        specimenModal.classList.remove("show");
        quizModal.classList.remove("show");
        secretPopup.classList.remove("show");

    }

});


// WELCOME MESSAGE IN CONSOLE

console.log("%c✳ THE SECRET GARDEN ✳",
    "color:#bd9b60;font-size:25px;font-family:serif;");

console.log("%cYou found the hidden botanical laboratory.",
    "color:#a5ad8c;font-size:13px;");

console.log("Try clicking the logo five times...");
