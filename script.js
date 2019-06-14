let prompt = document.getElementById('prompt');
let roundText = document.getElementById('round-span');

const simon = {
  round: 0,
  choices: [1, 2, 3, 4],
  generatedPattern: [],
  playerPattern: [],
  strict: false
}

function newGame() {
  simon.generatedPattern = [];
  simon.round = 1;
  roundText.innerText = simon.round;
  nextRound();
}

function nextRound() {
  setTimeout(() => {
    simon.round++;
    addToPattern();
  }, 1000);
}

function addToPattern() {
  simon.generatedPattern.push(simon.choices[Math.floor(Math.random()*4)]);
  showPattern(() => {
    setTimeout(() => {prompt.innerText = 'your turn';}, 500);
  });
}

function showPattern(callback) {  
  prompt.innerText = 'showing pattern...';
  let index = 0;
  
  let pattern = setInterval(() => {
    lightButtons(simon.generatedPattern[index]);
    index++;

    if (index === simon.generatedPattern.length) {
      clearInterval(pattern);
      callback();
    }
  }, 500);

  resetPlayer();
}

function lightButtons(id) {
  let btn = document.getElementById(id);
  btn.classList.add('clicked');

  setTimeout(() => {
    btn.classList.remove('clicked');
  }, 200);
}

function resetPlayer() {
  simon.playerPattern = [];
}

function addToPlayer(id) {
  lightButtons(id);
  let clicked = parseInt(id);
  simon.playerPattern.push(clicked);
  playerTurn(clicked);
}

function playerTurn(clicked) {
  let index = simon.playerPattern.length - 1;

  if (simon.playerPattern[index] === simon.generatedPattern[index]) {
    if (simon.playerPattern.length === simon.generatedPattern.length) {
      if (simon.round > 10) {
        prompt.innerText = 'You beat Simon (whoever he is)!';
      } else {
        roundText.innerText = simon.round;
        nextRound();
      }
    }
  } else {
    
    if (simon.strict) {
      prompt.innerText = 'strict mode - start again';
      newGame();
    } else {
      prompt.innerText = 'wrong move! Watch the pattern again:';
      setTimeout(() => {showPattern();}, 1500);
    }
  }
}

/* TO DO
  1. Proper interface with buttons, sound, and prompts on the screen.
      - And when player lost, display number of rounds as his record. "You survived for N rounds"
        <5 "Needs more practice"
        5-7 "Not bad, but could be better"
        8-9 "Almost there, you can do it!"
  2. Strict mode
  3. If beat until 10 rounds, prompt and show animated fireworks on the screen.
*/