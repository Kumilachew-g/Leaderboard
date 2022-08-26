const getScores = async (id) => {
  const urlBase = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const response = await fetch(urlBase);
  const scores = await response.json();
  return scores;
};

const postScores = async (id, body) => {
  const urlBase = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  await fetch(urlBase, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getScores, postScores };
