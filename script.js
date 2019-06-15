const prompt = document.getElementById('prompt');
const roundText = document.getElementById('round-span');
const startBtn = document.getElementById('start-btn');
const strictBtn = document.getElementById('strict-btn');

const greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const winSound = new Audio('https://kd-public.s3.us-east-2.amazonaws.com/win.wav');
const wrongSound = new Audio('https://kd-public.s3.us-east-2.amazonaws.com/wrong.wav');
wrongSound.volume = .5;

let darkMode = true;

const simon = {
  round: 0,
  choices: [1, 2, 3, 4],
  generatedPattern: [],
  playerPattern: [],
  strict: false
}

function newGame() {
  startBtn.classList.add('other-clicked');
  setTimeout(() => {
    startBtn.classList.remove('other-clicked');
  }, 200);
  simon.generatedPattern = [];
  simon.round = 0;
  nextRound();
}

function nextRound() {
  setTimeout(() => {
    simon.round++;
    roundText.innerText = simon.round;
    addToPattern();
  }, 1000);
}

function addToPattern() {
  simon.generatedPattern.push(simon.choices[Math.floor(Math.random()*4)]);
  showPattern(() => {
    setTimeout(() => { prompt.innerText = 'Your turn (copy the pattern).'; }, 500);
  });
}

function showPattern(callback) {  
  prompt.innerText = 'Showing pattern...';
  let index = 0;
  
  let pattern = setInterval(() => {
    lightButtons(simon.generatedPattern[index]);
    soundButton(simon.generatedPattern[index]);
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
  if (simon.generatedPattern.length == 0) {
    prompt.innerText = 'Click the Start button to start the game first.';
  } else {
    lightButtons(id);
    soundButton(id);
    let clicked = parseInt(id);
    simon.playerPattern.push(clicked);
    playerTurn(clicked);
  }
}

function playerTurn(clicked) {
  let index = simon.playerPattern.length - 1;

  if (simon.playerPattern[index] === simon.generatedPattern[index]) {
    if (simon.playerPattern.length === simon.generatedPattern.length) {
      if (simon.round === 10) {
        prompt.innerText = 'Congratulations, you beat Simon (whoever he is)!';
        winSound.play();
      } else {
        nextRound();
      }
    }
  } else {
    wrongSound.play();
    setTimeout(() => {
      wrongSound.pause();
      wrongSound.currentTime = 0;
    }, 500);

    if (simon.strict) {
      prompt.innerText = 'Wrong move in STRICT mode! Starting new game...';
      setTimeout(() => { newGame(); }, 2000);
    } else {
      prompt.innerText = 'Wrong move! Watch the pattern again:';

      setTimeout(() => {
        showPattern(() => {
          setTimeout(() => { prompt.innerText = 'Your turn (copy the pattern).'; }, 500);
        });
      }, 1500);
    }
  }
}

function toggleStrict() {
  simon.strict = !simon.strict;

  if (simon.strict) {
    strictBtn.classList.add('other-clicked');
  } else {
    strictBtn.classList.remove('other-clicked');
  }
}

function soundButton(id) {
  switch (parseInt(id)) {
    case 1:
      if (!greenSound.paused) {
        greenSound.pause();
        greenSound.currentTime = 0;
      }
      greenSound.play();
      break;
    case 2:
      if (!redSound.paused) {
        redSound.pause();
        redSound.currentTime = 0;
      }
      redSound.play();
      break;
    case 3:
      if (!yellowSound.paused) {
        yellowSound.pause();
        yellowSound.currentTime = 0;
      }
      yellowSound.play();
      break;
    case 4:
      if (!blueSound.paused) {
        blueSound.pause();
        blueSound.currentTime = 0;
      }
      blueSound.play();
      break;
    default:
      break;
  }
}

function toggleDarkMode() {
  darkMode = !darkMode;
  const body = document.getElementsByTagName('body')[0];
  const mainButtons = document.querySelectorAll('.btn');
  const otherButtons = document.querySelectorAll('.other-btn');
  const darkBtn = document.getElementById('dark-btn');

  if (darkMode) {
    body.style.background = '#000';
    body.style.color = '#fff';
    
    mainButtons.forEach(button => {
      button.classList.add('dark');
    });

    otherButtons.forEach(button => {
      button.style.border = '4px solid #fff';
    });

    darkBtn.classList.add('dark');
  } else {
    body.style.background = '#fff';
    body.style.color = '#000';

    otherButtons.forEach(button => {
      button.style.border = '4px solid #000';
    });

    mainButtons.forEach(button => {
      button.classList.remove('dark');
    });

    darkBtn.classList.remove('dark');
  }
}