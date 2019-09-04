
class Population {
  constructor(populationSize, numQueens, mutationRate){

    this.populationSize = populationSize;
    this.numQueens = numQueens;
    this.solutions = [];
    this.competitors = [];
    this.mutationRate = mutationRate;
    this.matingPool = [];
    for(let i = 0; i < populationSize; i++){
      let alreadyUsed = [];
      let queenPlacement = [];
      for (let j = 0; j < this.numQueens; j++){
        let temp = false;
        alreadyUsed[j] = temp;
      }
      for (let j = 0; j < this.numQueens; j++) {
        let newNumber = randomInt(0, this.numQueens);
        while(alreadyUsed[newNumber]){
          newNumber = randomInt(0, this.numQueens);
        }
        alreadyUsed[newNumber] = true;
        queenPlacement[j] = newNumber;
      }

      this.solutions[i] = new Solution(queenPlacement);

    }

    this.bestSolution = this.solutions[0];
    this.parent1 = this.solutions[0];
    this.parent2 = this.solutions[0];
    this.child = this.solutions[0];
    this.indexToReplace = -1;
  }

  selectSolution(numCompetitors, isParent){
    let usedIndices = [];
    this.competitors = [];
    for(let i = 0; i < numCompetitors; i++){
      let index = randomInt(0, this.populationSize);
      let usedIndex = true;
      if(usedIndices.length != 0){
        while(usedIndex){
          index = randomInt(0, this.populationSize);
          for(let j = 0; j < usedIndices.length; j++){
            if (index == usedIndices[j]){
              usedIndex = true;
              break;
            } else {
              usedIndex = false;
            }
          }
        }
      }
      usedIndices.push(index);
      this.competitors[i] = this.solutions[index];
    }
    let winner = this.competitors[0];
    for(let i = 0; i < numCompetitors; i++){
      if(isParent){
        if(this.competitors[i].fitness < winner.fitness){
          winner = this.competitors[i];
        }
      } else {
        if(this.competitors[i].fitness > winner.fitness){
          winner = i;
        }
      }
    }
    return winner;
  }

  tournamentSelection(numCompetitors) {
    //console.log(this.solutions);
    this.parent1 = this.selectSolution(numCompetitors, true);
    this.parent2 = this.selectSolution(numCompetitors, true);
    this.solutionToReplace = this.selectSolution(numCompetitors, false);
    //console.log(this.solutions);
  }

  crossover(){
    //console.log(this.solutions);
    let prob = randomInt(0,2);
    if( prob == 0 ){
       this.child = new Solution(this.parent1.queenArr);
    } else {
      this.child = new Solution(this.parent2.queenArr);
    }
    this.mutate();
    //console.log(this.solutions);
  }

  mutate(){
    //console.log(this.solutions);
    let prob = randomInt(0,101);
    //change child
    if(prob < this.mutationRate){
      //indexToChange = [_,_,_,*,_,_]
      let indexToChange = randomInt(0, numQueens);
      //newNumber = number in range 0 - numQueens
      let newNumber = randomInt(0, numQueens);
      //oldNumber = [_,_,_,number currently here,_,_]
      let oldNumber = this.child.queenArr[indexToChange];
      let oldIndex = -1;
      for(let i = 0; i < this.child.queenArr.length; i++){
        if(this.child.queenArr[i] == newNumber){
          oldIndex = i;
        }
      }
      //child's array = [_,_,_,newNumber,_,_]
      this.child.queenArr[indexToChange] = newNumber;
      this.child.queenArr[oldIndex] = oldNumber;

    }
    //console.log(this.solutions);

  }

  replace() {
    this.solutions[this.indexToReplace] = this.child;
  }

  calculateFitness(){
    for(let i = 0; i < this.populationSize; i++){
      this.solutions[i].calculateFitness();
      if(this.solutions[i].fitness < this.bestSolution.fitness){
        this.bestSolution = this.solutions[i];
      }
    }
    //console.log(this.solutions);

  }

  getBestSolution() {
    return this.bestSolution;
  }

  //2ND TYPE OF SELECTION
  selectViaMatingPool() {
    this.matingPool = [];
    for(let i = 0; i < this.populationSize; i++){
      let first = randomInt( 0, this.populationSize - 1 );
      let second = randomInt( 0, this.populationSize - 1 );
      let player1 = this.solutions[ first ];
      let player2 = this.solutions[ second ];
      if( player1.fitness > player2.fitness ){
        this.matingPool[i] = player1;
      } else {
        this.matingPool[i] = player2;
      }
    }
  }

  //2ND TYPE OF SELECTION
  crossover2(parent1, parent2){
    let child;
    let probability = randomInt(0, 100);
    if( probability < 50) {
      child = new Solution(this.parent1.queenArr);
    } else {
      child = new Solution(this.parent2.queenArr);
    }
    return child;
  }

  //2ND TYPE OF SELECTION
  mutate2(offspring){

    //console.log(this.solutions);
    let prob = randomInt(0,101);
    //change child
    if(prob < this.mutationRate){
      //indexToChange = [_,_,_,*,_,_]
      let indexToChange = randomInt(0, numQueens);
      //newNumber = number in range 0 - numQueens
      let newNumber = randomInt(0, numQueens);
      //oldNumber = [_,_,_,number currently here,_,_]
      let oldNumber = offspring.queenArr[indexToChange];
      let oldIndex = -1;
      for(let i = 0; i < offspring.queenArr.length; i++){
        if(offspring.queenArr[i] == newNumber){
          oldIndex = i;
        }
      }
      //child's array = [_,_,_,newNumber,_,_]
      offspring.queenArr[indexToChange] = newNumber;
      offspring.queenArr[oldIndex] = oldNumber;

    }
    return offspring;
  }


  //2ND TYPE OF SELECTION
  updatePopulation2() {
    for(let i = 0; i < this.solutions.length; i++){
      let parent1 = this.matingPool[randomInt(0, this.solutions.length - 1)];
      let parent2 = this.matingPool[randomInt(0, this.solutions.length - 1)];
      let offspring = this.crossover2(parent1, parent2);
      let child = this.mutate2(offspring);
      this.solutions[i] = child;
    }
  }

  update2(){
    this.calculateFitness();
    this.selectViaMatingPool();
    this.updatePopulation2();
  }



  update() {
    this.calculateFitness();
    this.tournamentSelection(3);
    this.crossover();
    this.replace();
  }




}
