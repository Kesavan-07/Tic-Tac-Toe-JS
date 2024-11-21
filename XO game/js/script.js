const board = Array(9).fill("");
let currentplayer = "X";
let xWins = 0;
let oWins = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initboard() {
  const boardElemt = document.getElementById("board");
  const playerStatus = document.getElementById("playerstatus");
  const body = document.body;

  boardElemt.innerHTML = "";

  // Reset game UI and background image
  playerStatus.textContent = "Player X's turn";
  body.style.backgroundImage =
    "url('./cc673c1f-3e80-4c9f-8149-5b0723465876.jpg')"; // Default background

  for (let ind = 0; ind < 9; ind++) {
    const box = document.createElement("div");
    box.classList.add(
      "w-28",
      "h-28",
      "border-2",
      "border-black",
      "flex",
      "items-center",
      "justify-center",
      "font-bold",
      "text-6xl",
      "cursor-pointer"
    );
    box.addEventListener("click", () => handleBoxClick(box, ind));
    boardElemt.appendChild(box);
  }
}

function handleBoxClick(box, ind) {
  const playerStatus = document.getElementById("playerstatus");
  const body = document.body;

  if (box.innerHTML === "" && !checkwin() && !checkdraw()) {
    box.innerHTML = currentplayer;
    board[ind] = currentplayer;

    if (checkwin()) {
      playerStatus.textContent = `Player ${currentplayer} Wins! 🎉`;

      // Update win count and background image
      if (currentplayer === "X") {
        xWins++;
        document.getElementById("xWins").textContent = xWins;
        body.style.backgroundImage =
          "url('./tom-swinnen-7rv04mazX7g-unsplash.jpg')"; // X's win background
        applyWinAnimation("X");
      } else {
        oWins++;
        document.getElementById("oWins").textContent = oWins;
        body.style.backgroundImage =
          "url('./DALL·E 2024-11-21 18.48.40 - A stunning futuristic cityscape, featuring towering skyscrapers with sleek, organic designs and glowing neon lights. The city is set during twilight w.webp')"; // O's win background
        applyWinAnimation("O");
      }

      return;
    } else if (checkdraw()) {
      handleDraw();
      return;
    }

    currentplayer = currentplayer === "X" ? "O" : "X";
    playerStatus.textContent = `Player ${currentplayer}'s turn`;
  }
}

function checkwin() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function checkdraw() {
  return board.every((box) => box !== "");
}

function handleDraw() {
  const playerStatus = document.getElementById("playerstatus");
  playerStatus.textContent = "It's a Draw! 🤝";

  // Add animation for draw
  playerStatus.classList.add("animate-bounceIn");
  playerStatus.addEventListener("animationend", () => {
    playerStatus.classList.remove("animate-bounceIn");
  });
}

function applyWinAnimation(winner) {
  const playerStatus = document.getElementById("playerstatus");

  // Add animation class for bounce effect
  playerStatus.classList.add("animate-bounceIn");

  // Remove animation class after animation ends
  playerStatus.addEventListener("animationend", () => {
    playerStatus.classList.remove("animate-bounceIn");
  });

  // Optionally, apply animation to the entire board
  const boardElement = document.getElementById("board");
  boardElement.classList.add("animate-fadeOut");

  boardElement.addEventListener("animationend", () => {
    boardElement.classList.remove("animate-fadeOut");
  });
}

function resetboard() {
  board.fill("");
  currentplayer = "X";

  const playerStatus = document.getElementById("playerstatus");
  playerStatus.textContent = "Player X's turn";

  const body = document.body;
  body.style.backgroundImage =
    "url('./images/cc673c1f-3e80-4c9f-8149-5b0723465876.jpg')"; // Default background

  // Clear animations
  playerStatus.classList.remove("animate-bounceIn");
  const boardElement = document.getElementById("board");
  boardElement.classList.remove("animate-fadeOut");

  initboard();
}

initboard();
