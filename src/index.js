import './assets/style.css';
import populateList from './displayList.js';
import { getScores, postScores } from './gameFunctions.js';

const gameId = 'IsGWyZ5ywIUXczEDTXvL';

const refreshButton = document.querySelector('.refresh-btn');
const form = document.getElementById('form');

refreshButton.addEventListener('click', () => {
  getScores(gameId).then((scores) => {
    populateList(scores.result);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    user: document.getElementById('name-input').value,
    score: parseInt(document.getElementById('score-input').value, 10),
  };
  postScores(gameId, body);
  document.getElementById('name-input').value = '';
  document.getElementById('score-input').value = '';
});

getScores(gameId).then((scores) => {
  populateList(scores.result);
});
