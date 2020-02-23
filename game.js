console.log("game script loaded");

const gameContent = document.getElementById("gameContent");
//gameContent.textContent = "";

function stateUpdate(newGameState) {
  Object.assign(gameState, newGameState);
  render();
}

const allLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

const phrases = ["super test", "fantastyczny test"];

function randomPhrase() {
  const phraseIndex = Math.floor(Math.random() * phrases.length);
  return phrases[phraseIndex];
}
const gameState = {
  name: "",
  activeView: "welcome",
  selectedLetters: [],
  secretPhrase: "",
  mistakes: 0
};
function welcomeView() {
  const header = document.createElement("h1");
  header.textContent = "Welcome to Hangman!";

  const nameInput = document.createElement("input");

  nameInput.addEventListener("input", event => {
    stateUpdate({ name: event.target.value });
  });

  const nameInputLabel = document.createElement("div");
  nameInputLabel.textContent = "Enter your name:";

  const playButton = document.createElement("button");
  playButton.textContent = "Play game!";
  playButton.addEventListener("click", event => {
    stateUpdate({ activeView: "play", secretPhrase: randomPhrase() });
    stateUpdate({ selectedLetters: [] });
  });

  setTimeout(() => {
    nameInput.value = gameState.name;
    nameInput.focus();
  }, 0);

  gameContent.appendChild(header);
  gameContent.appendChild(nameInputLabel);
  gameContent.appendChild(nameInput);
  gameContent.appendChild(playButton);
}
function playView() {
  let phraseLetterVisibleCount = 0;
  const hiMessage = document.createElement("h1");
  hiMessage.textContent = `Hi, ${gameState.name}`;

  const phraseLettersContainer = document.createElement("div");
  const phraseLetters = gameState.secretPhrase.split("");
  phraseLetters.forEach(phraseLetter => {
    const phraseLetterSpan = document.createElement("span");
    const phraseLetterVisible =
      phraseLetter === " " || gameState.selectedLetters.includes(phraseLetter);

    phraseLetterSpan.textContent = phraseLetterVisible ? phraseLetter : "*";
    if (phraseLetterVisible) {
      phraseLetterVisibleCount++;
    }
    phraseLettersContainer.appendChild(phraseLetterSpan);
  });

  const buttonsContainer = document.createElement("div");

  for (let i = 0; i < allLetters.length; i++) {
    const letterButton = document.createElement("button");
    const letter = allLetters[i];

    letterButton.textContent = letter;
    letterButton.disabled = gameState.selectedLetters.includes(letter);
    letterButton.addEventListener("click", () => {
      stateUpdate({
        selectedLetters: gameState.selectedLetters.concat([letter])
      });
    });

    buttonsContainer.appendChild(letterButton);
  }
  if (phraseLetterVisibleCount === gameState.secretPhrase.length) {
    stateUpdate({ activeView: "endGame", selectedLetters: [] });
    return;
  }

  const endGameButton = document.createElement("button");
  endGameButton.textContent = "End game";
  endGameButton.addEventListener("click", event => {
    stateUpdate({ activeView: "endGame" });
  });

  gameContent.appendChild(hiMessage);
  gameContent.appendChild(phraseLettersContainer);
  gameContent.appendChild(endGameButton);
  gameContent.appendChild(buttonsContainer);

  return gameContent;
}
function endGameView() {
  const header = document.createElement("h1");
  header.textContent = "Game finished!";
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play again";
  playAgainButton.addEventListener("click", event => {
    stateUpdate({ activeView: "welcome" });
  });

  gameContent.appendChild(header);
  gameContent.appendChild(playAgainButton);
}
function render() {
  gameContent.textContent = "";
  if (gameState.activeView === "welcome") {
    welcomeView();
  } else if (gameState.activeView === "play") {
    playView();
  } else {
    endGameView();
  }
}
render();
