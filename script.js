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


const myProjects = [
  { title: "Адаптивное портфолио", desc: "Мой первый сайт на HTML и CSS с темной темой.", link: "#"},
  { title: "JS Трекер кредитов", desc: "Автоматизированная система проверки баланса на чистом JavaScript.", link: "#"},
  { title: "Будущий проект на React", desc: "Здесь будет крутое SPA приложение.", link: "#"}
]

// 1. Находим пустой контейнер на странице
const cardsContainer = document.querySelector('.project-cards');
// 2. Запускаем цикл по нашему массиву проектов
for (const project of myProjects) {
  // 3. Создаем HTML-структуру для одной карточки, подставляя данные из объекта
  const cardHTML = `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <a href="${project.link}">Смотреть код</a>
    </div>
  `;
  // 4. Добавляем эту карточку внутрь контейнера
  cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}