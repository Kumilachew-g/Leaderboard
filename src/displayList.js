const boardList = document.querySelector('.board-list');
const displayList = (inputs) => {
  inputs.forEach((item, i) => {
    const newSelector = document.createElement('li');
    newSelector.createElement = `<p>${item.name} : ${item.score} </p>`;

    boardList.appendChild(newSelector);
  });
};
export default displayList;
