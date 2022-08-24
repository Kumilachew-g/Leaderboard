const boardList = document.querySelector('.board-list');
const displayList = (inputs) => {
  inputs.forEach((item, i) => {
    const newSelector = document.createElement('li');
    newSelector.createElement = `<p>${item.name} : ${item.score} </p>`;
    if (i % 2 === 1) {
      newSelector.style.backgroundColor = '#c0c0c0';
    }
    boardList.appendChild(newSelector);
  });
};
export default displayList;
