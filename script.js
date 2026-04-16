if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const size = 4;
let board = [];
let score = 0;
let best = localStorage.getItem("best") || 0;

document.getElementById("best").textContent = best;

function reset(){
board = Array(size).fill().map(()=>Array(size).fill(0));
score = 0;
add();
add();
draw();
}

function add(){
let empty=[];
for(let r=0;r<size;r++)
for(let c=0;c<size;c++)
if(board[r][c]===0) empty.push({r,c});

if(!empty.length) return;

let {r,c} = empty[Math.floor(Math.random()*empty.length)];
board[r][c] = Math.random()<0.9 ? 2 : 4;
}

function draw(){
const g = document.getElementById("game");
g.innerHTML="";

board.forEach(row=>{
row.forEach(val=>{
let d=document.createElement("div");
d.className="tile";
d.dataset.val=val;
d.textContent=val || "";
g.appendChild(d);
});
});

document.getElementById("score").textContent = score;

if(score>best){
best=score;
localStorage.setItem("best",best);
document.getElementById("best").textContent=best;
}
}

function slide(row){
row=row.filter(v=>v);

for(let i=0;i<row.length-1;i++){
if(row[i]===row[i+1]){
row[i]*=2;
score+=row[i];
row[i+1]=0;
}
}

row=row.filter(v=>v);
while(row.length<size) row.push(0);
return row;
}

function rotate(){
board = board[0].map((_,i)=>board.map(row=>row[i]).reverse());
}

function move(dir){
let old = JSON.stringify(board);

if(dir==="up") rotate();
if(dir==="right") rotate(),rotate();
if(dir==="down") rotate(),rotate(),rotate();

board = board.map(row=>slide(row));

if(dir==="up") rotate(),rotate(),rotate();
if(dir==="right") rotate(),rotate();
if(dir==="down") rotate();

if(JSON.stringify(old)!==JSON.stringify(board)){
add();
draw();
}
}

document.addEventListener("keydown",e=>{
if(e.key==="ArrowLeft") move("left");
if(e.key==="ArrowRight") move("right");
if(e.key==="ArrowUp") move("up");
if(e.key==="ArrowDown") move("down");
});

let startX,startY;

document.addEventListener("touchstart",e=>{
startX = e.touches[0].clientX;
startY = e.touches[0].clientY;
});

document.addEventListener("touchend",e=>{
let dx = e.changedTouches[0].clientX - startX;
let dy = e.changedTouches[0].clientY - startY;

if(Math.abs(dx) > Math.abs(dy)){
dx>0 ? move("right") : move("left");
}else{
dy>0 ? move("down") : move("up");
}
});

reset();
