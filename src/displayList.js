const boardList = document.querySelector('.board-list');
const displayList = (inputs) => {
  boardList.innerHTML = '';
  inputs.forEach((item, i) => {
    const newSelector = document.createElement('li');
    newSelector.innerHTML = `${item.user} : ${item.score}`;
    if (i % 2 === 1) {
      newSelector.style.backgroundColor = '#c0c0c0';
    }
    boardList.appendChild(newSelector);
  });
};
export default displayList;
