/*Please include index.css in HTML code for using this.*/

const parentDiv = document.getElementById("parent");
const messageDiv = document.getElementById("message");

const setClickedPiece = (params) => {
  sessionStorage.setItem("row", `${params.row}`);
  sessionStorage.setItem("column", `${params.column}`);
  sessionStorage.setItem("pieceClass", `${params.pieceClass}`);
};

const createPiece = (square, cssClass) => {
  const piece = document.createElement("div");
  piece.setAttribute("class", `piece-${cssClass}`);

  if (3 > square.getAttribute("row") || 6 < square.getAttribute("row")) {
    square.appendChild(piece);
    piece.addEventListener("click", (e) => {
      e.stopPropagation();
      piece.classList.add("red-border");
      const pieceParent = piece.parentNode;

      const pieceParentRow = pieceParent.getAttribute("row");
      const pieceParentColumn = pieceParent.getAttribute("column");
      const params = {
        row: pieceParentRow,
        column: pieceParentColumn,
        pieceClass: `piece-${cssClass}`,
      };

      setClickedPiece(params);
    });
  }
};
const newBoard = () => {
  const chessBoard = document.createElement("div");
  chessBoard.setAttribute("id", "chessBoard");
  parentDiv.appendChild(chessBoard);

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
      chessSquare.addEventListener("click", () => {
        chessSquare.classList.add("red-border");
        //TODO separate func for this logic
        if (chessSquare.getAttribute("row") < sessionStorage.getItem("row")) {
          messageDiv.innerHTML = "Move not allowed";
        }
      });
      chessBoard.appendChild(chessSquare);
    }
  }
};
const init = () => {
  sessionStorage.clear();
  newBoard();
};
window.onload = init();
