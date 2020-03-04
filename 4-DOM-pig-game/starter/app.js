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
      let dice = dices[i];
      // save value to prevDise from 2nd move
      dice !== 0 ? prevDice[i] = dice : false;

      // 1. get random number
      dice = Math.floor(Math.random() * 6) + 1; // because math.ceil and math.round can return 0
      // 2.display the result
      document.getElementById(`dice-${i}`).style.display = 'block';
      document.getElementById(`dice-${i}`).src = `dice-${dice}.png`;
      document.getElementById(`dice-${i}`).classList.toggle('roll');
      // 3. update the round score if the rolled number was not a 1
      if (dice !== 1) {
        roundScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        /* if (dice === 6 && prevDice === 6) {
          scores[activePlayer] = 0;
          document.getElementById(`score-${activePlayer}`).textContent = '0';
          nextPlayer();
        } */
      } else {
        nextPlayer();
      }
    }
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

// fix - if first dice == 1 then second dice score will move to next player
// add - if both dices == 6, round will be passed to another player
