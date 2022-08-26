const checkbox = document.getElementById('checkbox');
const buttons = Array.from(document.getElementsByTagName('button'));

checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-gray');
  document.body.querySelector('main').classList.toggle('dark-gray');
  buttons.forEach((selector) => {
    selector.classList.toggle('dark-gray');
  });
});
