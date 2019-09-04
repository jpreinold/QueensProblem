class Solution {
  // queenArr is an array
  // that gives the indices for each queen
  constructor(queenArr){
    this.queenArr = queenArr;
    this.fitness = 0;
    this.calculateFitness();

  }

  //returns the number of failures found
  findFailures(row, col) {
    let numFails = 0;

    //check diagonal rows for a single queen
    for ( let j = 0 - row; j < this.queenArr.length - row; j++){
      let rowIndex = row + j;
      let topToBtmColIndex = col + j;
      let btmToTopColIndex = col - j;
      let checkTTBIndex = false;
      let checkBTTIndex = false;
      if(topToBtmColIndex >= 0 && topToBtmColIndex < this.queenArr.length && rowIndex != row){
        //console.log("(" + rowIndex + ", " + topToBtmColIndex + ")");
        checkTTBIndex = true;
      }

      if(btmToTopColIndex >= 0 && btmToTopColIndex < this.queenArr.length && rowIndex != row){
        //console.log("(" + rowIndex + ", " + btmToTopColIndex + ")");
        checkBTTIndex = true;
      }

      if(checkTTBIndex && this.queenArr[rowIndex] === topToBtmColIndex){
        numFails++;
      }

      if(checkBTTIndex && this.queenArr[rowIndex] === btmToTopColIndex){
        numFails++;
      }

    }
    return numFails;

  }

  calculateFitness(){
    this.fitness = 0;
    let numFails = 0;
    for(let i = 0; i < this.queenArr.length; i++){
      numFails += this.findFailures(i, this.queenArr[i]);
    }
    this.fitness += numFails;

  }
}
