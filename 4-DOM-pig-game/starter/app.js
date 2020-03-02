/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let dice = 0;
const currentPlayerText = document.getElementById(`current-${activePlayer}`);
const diceImg = document.querySelector('.dice');

// hide dice before first move
diceImg.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', () => {
  // 1. get random number
  dice = Math.floor(Math.random() * 6) + 1; //because math.ceil and math.round can return 0

  // 2.display the result
  diceImg.style.display = 'block';
  diceImg.src = `dice-${dice}.png`;
  // 3. update the round score if the rolled number was not a 1
  if (dice !== 1) {
    roundScore += dice;
    currentPlayerText.textContent = roundScore;
  } else {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    currentPlayerText.textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
  }
});
