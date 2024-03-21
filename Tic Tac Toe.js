console.log("Life is beautiful with Shree Ji");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset ");

const reset = document.querySelector("#reset");
const newgame = document.querySelector("#newgame");
const msg = document.querySelector(".msg");
const scoreO = document.querySelector("#p1s");
const scoreX = document.querySelector("#p2s");
const nameO = document.querySelector("#nameO");
const nameX = document.querySelector("#nameX");
const actualnameO = prompt("Enter the player's name who chooses O");
const actualnameX = prompt("Enter the player's name who chooses X");

const fullDivPlay1 = document.querySelector("#player1");
const fullDivPlay2 = document.querySelector("#player2");

nameO.innerText = actualnameO.toUpperCase();
nameX.innerText = actualnameX.toUpperCase();


if (actualnameO !== "") {
  fullDivPlay1.style.height = "230px";
}
if (actualnameX !== "") {
  fullDivPlay2.style.height = "230px";
}

let winnerFound = false;
let newGameTurnO = false; //for alternatively giving first turn to both and value is false as initilly chance was given to O
let turnO = true; //playerO  playerX
const winPatterns = [
  //2-D array
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
    for (let pattern of winPatterns){
      console.log(pattern);
      console.log(
        boxes[pattern[0]].innerText,
        boxes[pattern[1]].innerText,
        boxes[pattern[2]].innerText
      );
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          console.log("Winner", pos1Val);
          msg.style.display = "block";
          msg.innerText = `Winner is player ${pos1Val}`;
          boxes.forEach((box) => {
            box.disabled = true;
            winnerFound = true;
          });
          if (pos1Val === "O") {
            scoreO.innerText++;
          } else {
            scoreX.innerText++;
          }
        }
      }
    }
  }; 
  
  
  function chanceTeller() {
        if(turnO){
          fullDivPlay2.style.opacity = 1;
          if (fullDivPlay1.style.opacity == 1) {
            fullDivPlay1.style.opacity = 0.5;
          } 
          else {
            fullDivPlay1.style.opacity = 1;
          }
        } 
        else {
          fullDivPlay1.style.opacity = 1;
          if (fullDivPlay2.style.opacity == 1) {
            fullDivPlay2.style.opacity = 0.5;
          } 
          else {
            fullDivPlay2.style.opacity = 1;
          }
        }
      }
      
  
function interval() {
    if(winnerFound){
        return;
    }
    setInterval(chanceTeller, 200);
  }

    
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
    console.log("box was clicked");
    if (turnO){
      box.innerText = "O";
      turnO = false;
    } 
    else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    interval();
  });
});








reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    scoreO.innerText = "0";
    scoreX.innerText = "0";
    box.disabled = false;
    msg.style.display = "none";
    turnO = true;
  });
});

newgame.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    msg.style.display = "none";
    if(newGameTurnO == true){
      turnO = newGameTurnO;
      newGameTurnO = false;
    } else {
      turnO = newGameTurnO;
      newGameTurnO = true;
    }
  });
});
