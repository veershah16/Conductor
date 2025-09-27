const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = 300;
let velocity = 0;
let gravity = 0.5;
let lift = -8;
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(80, birdY, 15, 0, Math.PI*2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 50, p.gapY-80);
    ctx.fillRect(p.x, p.gapY+80, 50, canvas.height - (p.gapY+80));
  });
}

function update() {
  if(gameOver) return;
  frame++;
  birdY += velocity;
  velocity += gravity;
  if(frame % 90 === 0){
    pipes.push({x:canvas.width, gapY: Math.floor(Math.random()*300)+150});
  }
  pipes.forEach(p => p.x -= 2);
  pipes = pipes.filter(p => p.x > -50);
  pipes.forEach(p => {
    if(80+15 > p.x && 80-15 < p.x+50){
      if(birdY-15 < p.gapY-80 || birdY+15 > p.gapY+80){
        gameOver = true;
      }
    }
  });
  if(birdY > canvas.height || birdY < 0){ gameOver = true; }
  if(frame % 90 === 0) score++;
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBird();
  drawPipes();
  ctx.fillStyle = "black";
  ctx.fillText("Score: "+score, 10,20);
  if(gameOver){
    ctx.fillStyle="red";
    ctx.fillText("Game Over", 150, 300);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", ()=>{ velocity = lift; });
loop();