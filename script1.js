let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#new_game");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let msg1=document.querySelector("#msg1");

let turnO = true;
const winPatterns=[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
];

const reset = () =>{
     turnO =true;
     enableBoxes();
     msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
           if(turnO){
           box.innerHTML ="O";
           turnO=false;
           }
           else{
            box.innerHTML="X";
            turnO=true;
           }
           box.disabled = true;
           checkWinner();
    });
});

const disabledBoxes =() => {
          for(let box of boxes) {
            box.disabled = true;
          }
}

const enableBoxes =() => {
          for(let box of boxes) {
            box.disabled = false;
            box.innerText="";
          }
}

const showWinner =(winner) =>{
  msg1.innerText="";
    msg.innerText=`Congratualations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const drawMsz =() =>{
  msg.innerText ="";
     msg1.innerText=`Ops! It's Draw`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
  let winnerFound =false;
     for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                disabledBoxes();
                winnerFound =true;
                return;
            }
        }
     }
     let allFilled = [...boxes].every(box => box.innerText !== "");
     if(!winnerFound && allFilled){
      drawMsz();
      disabledBoxes();
     }
};
newbtn.addEventListener("click",reset);
resetbtn.addEventListener("click",reset);