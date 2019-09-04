
let numQueens = 4;
let bgColor = "#000000";
let queenColor = "#000000";
let gridSize = 100;
let gridPadding = 50;
let offset = gridSize / 2;
let populationSize = 4;
let mutationRate = 1;
let started = false;
let finished = false;

let population = new Population(populationSize, numQueens, mutationRate);

function run(){
  numQueens = document.getElementById("numQueens").value;
  bgColor = document.getElementById("bgColor").value;
  queenColor = document.getElementById("queenColor").value;
  populationSize = document.getElementById("populationSize").value;
  mutationRate = document.getElementById("mutationRate").value;

  switch (numQueens) {
    case '4': gridSize = 100; break;
    case '5': gridSize = 80; break;
    case '6': gridSize = 67; break;
    case '7': gridSize = 56; break;
    case '8': gridSize = 50; break;
    case '9': gridSize = 44; break;
    case '10': gridSize = 40; break;
    case '20': gridSize = 20; break;

    default: gridSize = 10;

  }
  offset = gridSize / 2;
  population = new Population(populationSize, numQueens, mutationRate);
  started = true;
  finished = false;

}

function randomInt(first, second){
  return Math.floor(Math.random() * second) + first;
}

function placeQueen(row, col){
  ellipse(row * gridSize + gridPadding + offset, col * gridSize + gridPadding + offset, gridSize * (2/3), gridSize * (2/3));
}

function drawGrid() {
  background(bgColor);
  strokeWeight(2);
  stroke(queenColor);
  fill(queenColor);
  //Draw board
  for(let i = 0; i < numQueens; i++){
    for(let j = 0; j < numQueens; j++){
      line(i * gridSize + gridPadding, j * gridSize + gridPadding, numQueens * gridSize + gridPadding, j * gridSize + gridPadding)
      line(i * gridSize + gridPadding, j * gridSize + gridPadding, i * gridSize + gridPadding, numQueens * gridSize + gridPadding)
    }
  }
  line(numQueens * gridSize + gridPadding, 0 * gridSize + gridPadding, numQueens * gridSize + gridPadding, numQueens * gridSize + gridPadding);
  line(0 * gridSize + gridPadding, numQueens * gridSize + gridPadding, numQueens * gridSize + gridPadding, numQueens * gridSize + gridPadding);
}

function setup() {
 createCanvas(500,500);
}

function draw() {
  if(started && !finished){
    drawGrid();
    population.update2();
    if (population.bestSolution.fitness == 0){
      finished = true;
    }
    for(let i = 0; i < population.bestSolution.queenArr.length; i++){
      placeQueen(i, population.bestSolution.queenArr[i]);
    }

  }


}
