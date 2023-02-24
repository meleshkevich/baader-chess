/*Please include index.css in HTML code for using this.*/
const parentDiv = document.getElementById("parent");

const createPiece = (square, cssClass) => {
  const piece = document.createElement("div");
  piece.setAttribute("class", `piece-${cssClass}`);
  if (3 > square.getAttribute("row") || 6 < square.getAttribute("row")) {
    square.appendChild(piece);
  }
};

const newBoard = () => {
  const chessBoard = document.createElement("div");
  chessBoard.setAttribute("id", "chessBoard");
  parentDiv.appendChild(chessBoard);

  // board

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const chessSquare = document.createElement("div");
      chessSquare.className = "chess-square";
      chessSquare.setAttribute("row", `${i + 1}`);
      chessSquare.setAttribute("column", `${j + 1}`);

      if ((i + j) % 2 == 0) {
        chessSquare.classList.add("black");
        createPiece(chessSquare, "black");
      } else {
        chessSquare.classList.add("white");
        createPiece(chessSquare, "white");
      }

      chessBoard.appendChild(chessSquare);
    }
  }
  console.log("window loaded");
};
window.onload = newBoard();
