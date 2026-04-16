// Service Worker registration (ADD HERE)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const size=4;
let board;

function reset(){
board=Array(size).fill().map(()=>Array(size).fill(0));
add();
add();
draw();
}

function add(){
let empty=[];
board.forEach((r,i)=>r.forEach((c,j)=>!c && empty.push([i,j])));
if(!empty.length) return;
let [r,c]=empty[Math.floor(Math.random()*empty.length)];
board[r][c]=2;
}

function draw(){
const g=document.getElementById("game");
g.innerHTML="";
board.forEach(r=>{
r.forEach(v=>{
let d=document.createElement("div");
d.className="tile";
d.textContent=v||"";
g.appendChild(d);
});
});
}

reset();
