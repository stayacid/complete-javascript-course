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
let dice = 0;

const diceImg = document.querySelector('.dice');

//start new game
document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // hide dice before first move
  diceImg.style.display = 'none';

  //zero all
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('#name-0').textContent = "Player 1";
  document.getElementById('#name-1').textContent = "Player 2";
  
}

init()

// dice actions
document.querySelector('.btn-roll').addEventListener('click', () => {
  // 1. get random number
  dice = Math.floor(Math.random() * 6) + 1; //because math.ceil and math.round can return 0

  // 2.display the result
  diceImg.style.display = 'block';
  diceImg.src = `dice-${dice}.png`;
  // 3. update the round score if the rolled number was not a 1
  if (dice !== 1) {
    roundScore += dice;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
    nextPlayer()
  }
});

/// hold actions
document.querySelector('.btn-hold').addEventListener('click', () => {
  // add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  // Update the UI
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer]
    //Check if player won the game
  if (scores[activePlayer] >= 20) {
    document.getElementById(`name-${activePlayer}`).textContent = "Winner!";
    diceImg.style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
  } else {
    nextPlayer()
  }
})

// switch to next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('name-0').textContent = "Player 1";
  document.getElementById('name-1').textContent = "Player 2";

  diceImg.style.display = 'none'
}