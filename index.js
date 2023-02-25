/*Please include index.css in HTML code for using this.*/

const parentDiv = document.getElementById("parent");
const messageDiv = document.getElementById("message");
const btn = document.getElementById("btn");

const removeRedBorders = () => {
  const redPieces = document.querySelectorAll(".selected-piece");
  for (let i = 0; i < redPieces.length; i++) {
    redPieces[i].classList.remove("red-border");
    redPieces[i].classList.remove("selected-piece");
  }
};

const removeSelectedPiece = () => {
  const selectedPieces = document.querySelectorAll(".selected-piece");
  for (let i = 0; i < selectedPieces.length; i++) {
    selectedPieces[i].remove();
  }
};

const showError = (message) => {
  messageDiv.innerHTML = `${message}`;
  setTimeout(() => {
    messageDiv.innerHTML = "";
  }, 2000);
};
const movePiece = (chessSquare) => {
  const piece = document.createElement("div");
  if (chessSquare.classList.contains("white")) {
    piece.setAttribute("class", `piece-white`);
    removeSelectedPiece();
  } else {
    piece.setAttribute("class", `piece-black`);
    removeSelectedPiece();
  }
  chessSquare.appendChild(piece);
};

const validateMove = (chessSquare) => {
  let clickedSquare = chessSquare.getAttribute("row");
  let pieceOrigine = sessionStorage.getItem("pieceOrigine");
  chessSquare.childElementCount;
  if (pieceOrigine == 1 || pieceOrigine == 2) {
    clickedSquare < sessionStorage.getItem("pieceRow") ||
    chessSquare.childElementCount
      ? showError("Move not allowed!")
      : movePiece(chessSquare);
  } else if (pieceOrigine == 7 || pieceOrigine == 8) {
    clickedSquare > sessionStorage.getItem("pieceRow") ||
    clickedSquare < sessionStorage.getItem("pieceRow") - 1 ||
    chessSquare.childElementCount
      ? showError("Move not allowed!")
      : movePiece(chessSquare);
  }
};

const setClickedPiece = (params) => {
  sessionStorage.setItem("pieceRow", `${params.row}`);
  sessionStorage.setItem("pieceColumn", `${params.column}`);
  sessionStorage.setItem("pieceClass", `${params.pieceClass}`);
  sessionStorage.setItem("pieceOrigine", `${params.pieceOrigine}`);
};

const createPiece = (square, cssClass) => {
  const piece = document.createElement("div");
  piece.setAttribute("class", `piece-${cssClass}`);

  if (3 > square.getAttribute("row") || 6 < square.getAttribute("row")) {
    square.appendChild(piece);
    piece.addEventListener("click", (e) => {
      e.stopPropagation();
      removeRedBorders();
      piece.classList.add("red-border");
      piece.classList.add("selected-piece");
      const pieceParent = piece.parentNode;
      const pieceParentRow = pieceParent.getAttribute("row");
      const pieceParentColumn = pieceParent.getAttribute("column");
      const params = {
        row: pieceParentRow,
        column: pieceParentColumn,
        pieceClass: `piece-${cssClass}`,
        pieceOrigine: pieceParentRow,
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

        //set square values to sessionStorage
        sessionStorage.setItem("squareRow", chessSquare.getAttribute("row"));
        sessionStorage.setItem(
          "squareColumn",
          chessSquare.getAttribute("column")
        );
        sessionStorage.setItem(
          "squareClass",
          chessSquare.getAttribute("class")
        );

        validateMove(chessSquare);
        setTimeout(() => {
          chessSquare.classList.remove("red-border");
        }, 2000);
      });
      chessBoard.appendChild(chessSquare);
    }
  }
};
const resetTable = () => {
  sessionStorage.clear();
  document.getElementById("chessBoard").remove();
  newBoard();
};
btn.addEventListener("click", () => resetTable());
window.onload = newBoard();
