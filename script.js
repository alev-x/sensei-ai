//находим на странице кнопку и блок, который нужно показать/скрыть
const button = document.querySelector('#call_back');
const content = document.querySelector('#content');

//добавляем обработчик клика на кнопку
button.addEventListener('click', function() {
    //меняем класс блока, который отвечает за его видимость
    content.classList.toggle('content-hidden');
    //проверяем, скрыт ли блок
  if (content.classList.contains('content-hidden')) {
    button.textContent = 'Связаться';
  } else {
    button.textContent = 'Отмена';
  }
});