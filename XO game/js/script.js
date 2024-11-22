const board = Array(9).fill("");
let currentplayer = "X";
let isGameActive = true;
const wins = { X: 0, O: 0 };

const checkdraw = () => {
  return board.every((value) => value != "");
};

const handleDraw = () => {
  const playerstatus = document.getElementById("playerstatus");
  playerstatus.innerHTML = "It's a Draw!!";
};
const winconditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const checkwin = () => {
  return winconditions.some((condition) => {
    const line = condition.map((index) => board[index]);
    return line.every((value) => value === currentplayer);
  });
};

const handlewin = () => {
  const playerstatus = document.getElementById("playerstatus");
  playerstatus.innerHTML = `player ${currentplayer} Wins!!`;
  wins[currentplayer]++;
  document.getElementById("win-by-X").innerHTML = wins.X;
  document.getElementById("win-by-O").innerHTML = wins.O;

  document
    .getElementById("root")
    .classList.add(currentplayer == "X" ? "bg-green-100" : "bg-blue-200");
  playerstatus.classList.add(
    "text-5xl",
    "font-bold",
    currentplayer == "X" ? "text-green-500" : "text-blue-500",
    "animate-pulse"
  );
  winconditions.some((condition) => {
    const line = condition.map((index) => board[index]);
    if (line.every((value) => value === currentplayer)) {
      condition.forEach((X) =>
        document.getElementById("box" + X).classList.add("animate-ping")
      );
    }
  });
};

const updatestatus = () => {
  const playerstatus = document.getElementById("playerstatus");
  playerstatus.innerHTML = `current player : ${currentplayer}`;
};

function initboard() {
  isGameActive = true;
  const boardElemt = document.getElementById("board");
  boardElemt.innerHTML = "";
  for (let ind = 0; ind < 9; ind++) {
    const box = boardElemt.appendChild(document.createElement("div"));
    box.classList.add(
      "w-28",
      "h-28",
      "bg-red-300",
      "border-2",
      "border-black",
      "flex",
      "items-center",
      "justify-center",
      "font-bold",
      "text-6xl",
      "cursor-pointer"
    );
    box.addEventListener("click", () => {
      if (box.innerHTML == "" && isGameActive) {
        box.innerHTML = currentplayer;
        box.id = "box" + ind;
        board[ind] = currentplayer;
        box.classList.remove("cursor-pointer");
        box.classList.add(
          "cursor-not-allowed",
          currentplayer == "X" ? "text-green-500" : "text-blue-500",
          currentplayer == "X" ? "bg-green-100" : "bg-blue-100"
        );

        if (checkwin()) {
          handlewin();
          isGameActive = false;
        } else if (checkdraw()) {
          handleDraw();
          isGameActive = false;
        } else {
          currentplayer = currentplayer === "X" ? "O" : "X";
          updatestatus();
        }
      }
    });
  }
}

const resetboard = () => {
  board.fill("");
  document
    .getElementById("root")
    .classList.remove("bg-green-100", "bg-blue-200");
  playerstatus.classList.remove(
    "text-5xl",
    "font-bold",
    "text-green-500",
    "text-blue-500",
    "animate-pulse"
  );
  currentplayer = "X";
  initboard();
  updatestatus();
};

initboard();
updatestatus();
