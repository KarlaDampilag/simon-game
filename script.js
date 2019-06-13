const simon = {
  round: 0,
  choices: [1, 2, 3, 4, 5],
  generatedPattern: [4,1,2,2,3],
  playerPattern: [],
  strict: false
}

function newGame() {
  simon.generatedPattern = [];
  simon.round = 0;
  nextRound();
}

function nextRound() {
  simon.round++;
  generatePattern();
}

//addToPattern();
function addToPattern() {
  simon.generatedPattern.push(simon.choices[Math.floor(Math.random()*4)]);
  showPattern();
}

showPattern();
function showPattern() {  
  let index = 0;
  
  let pattern = setInterval(() => {
    lightButton(simon.generatedPattern[index]);
    index++;

    if (index === generatedPattern.length) {
      clearInterval(pattern);
    }
  }, 1000);

  resetPlayer();
}

function lightButton(id) {
  let btn = document.getElementById(id);
  btn.classList.add('clicked');
  setTimeout(() => {
    btn.classList.remove('clicked');
  }, 600);
}


function resetPlayer() {
  simon.playerPattern = [];
}

function addToPlayer(id) {
//TODO
}