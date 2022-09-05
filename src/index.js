import './assets/style.css';
import displayList from './displayList.js';
import { getScores, postScores } from './gameFunctions.js';

const gameId = 'dD4oc0TWT3iY8n26px8C';

const refreshButton = document.querySelector('.refresh-btn');
const form = document.querySelector('.form-to-score');

refreshButton.addEventListener('click', () => {
  getScores(gameId).then((scores) => {
    displayList(scores.result);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    user: document.querySelector('#name-input').value,
    score: parseInt(document.querySelector('.score-input').value, 10),
  };
  postScores(gameId, body);
  document.querySelector('#name-input').value = '';
  document.querySelector('#score-input').value = '';
});

getScores(gameId).then((scores) => {
  displayList(scores.result);
});
