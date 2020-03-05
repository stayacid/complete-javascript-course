/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores;
let roundScore;
let activePlayer;
let dices = [0, 0];
let prevDices = [0, 0];
let gamePlaying;
let maxScore = 100;

// set max score
const maxScoreInput = document.querySelector('.maxScore input');
maxScoreInput.value = maxScore;
maxScoreInput.addEventListener('change', () => {
  maxScore = +maxScoreInput.value; // '+' is here because type='number' still return a string
});


function init() {
  dices = [0, 0];
  scores = [0, 0];
  prevDices = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hide dice before first move
  //dice0.style.display = 'none';
  // zero all
  for (let i = 0; i < 2; i++) {
    document.getElementById(`dice-${i}`).style.display = 'none';
    document.getElementById(`score-${i}`).textContent = '0';
    document.getElementById(`current-${i}`).textContent = '0';
    document.getElementById(`name-${i}`).textContent = `Player ${i + 1}`;
    document.querySelector(`.player-${i}-panel`).classList.remove('winner');
    document.querySelector(`.player-${i}-panel`).classList.remove('active');
  }
  document.querySelector('.player-0-panel').classList.add('active');
}

init();

// start new game
document.querySelector('.btn-new').addEventListener('click', init);

// switch to next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  for (let i = 0; i < 2; i++) {
    document.getElementById(`current-${i}`).textContent = '0';
    document.querySelector(`.player-${i}-panel`).classList.toggle('active');
  }
}

// dice actions
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    for (let i = 0; i < dices.length; i++) {
      // save value to prevDise from 2nd move
      dices[i] !== 0 ? prevDices[i] = dices[i] : false;

      // 1. get random number
      dices[i] = Math.floor(Math.random() * 6) + 1; // because math.ceil and math.round can return 0
      // 2.display the result
      document.getElementById(`dice-${i}`).src = `dice-${dices[i]}.png`;
      document.getElementById(`dice-${i}`).style.display = 'block';
      setTimeout(() => {
        document.getElementById(`dice-${i}`).classList.toggle('roll'); // it's for the 1st move
      }, 1);
      // 3. update the round score if the rolled number was not a 1
      if (dices[i] !== 1) {
        roundScore += dices[i];
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;

        // check if if got two 6 and skip move if so
        if (dices[i] === 6 && dices[i - 1] === 6) {
          console.log('kek');
          scores[activePlayer] = 0;
          document.getElementById(`score-${activePlayer}`).textContent = '0';
          nextPlayer();
        }
      } else {
        document.getElementById('dice-1').style.display = 'block'; // it's for the 1st move
        document.getElementById('dice-1').classList.toggle('roll'); // it's for the 1st move
        nextPlayer();
        break;
      }
    }
    console.log(prevDices);
  }
});

// hold actions
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= maxScore) {
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
      // hide dices
      for (let i = 0; i < 2; i++) {
        document.getElementById(`dice-${i}`).style.display = 'none';
      }
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// add - if both dices == 6, round will be passed to another player
