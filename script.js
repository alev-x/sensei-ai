//находим на странице кнопку и блок, который нужно показать/скрыть
const button = document.querySelector('#call_back');
const content = document.querySelector('#callback-form');

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

// Связываем базу данных с сайтом (DOM-манипуляции)
const myProjects = [
  { title: "Адаптивное портфолио", image: "./img/1.jpg", image_alt: "Проект 1", desc: "Мой первый сайт на HTML и CSS с темной темой.", link: "#"},
  { title: "JS Трекер кредитов", image: "./img/2.jpg", image_alt: "Проект 2", desc: "Автоматизированная система проверки баланса на чистом JavaScript.", link: "#"},
  { title: "Будущий проект на React", image: "./img/3.jpg", image_alt: "Проект 3", desc: "Здесь будет крутое SPA приложение.", link: "#"}
]

// 1. Находим пустой контейнер на странице
const cardsContainer = document.querySelector('.project-cards');
// 2. Запускаем цикл по нашему массиву проектов
for (const project of myProjects) {
  // 3. Создаем HTML-структуру для одной карточки, подставляя данные из объекта
  const cardHTML = `
    <div class="project-card">
      <h3>${project.title}</h3>
      <a href="${project.link}"><img src="${project.image}" alt="${project.image_alt}"></a>
      <p>${project.desc}</p>
      <a href="${project.link}">Смотреть код</a>
    </div>
  `;
  // 4. Добавляем эту карточку внутрь контейнера
  cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}

// Оживляем отправку формы
// 1. Находим саму форму по её ID
const contactForm = document.querySelector('#callback-form');
// 2. Слушаем событие 'submit' (отправка), а не просто клик по кнопке
contactForm.addEventListener('submit', function(event) {
  // 3. ПЕРВЫМ ДЕЛОМ отменяем перезагрузку страницы!
  event.preventDefault();

  // 4. Достаем значения, которые пользователь ввёл в поля (через .value)
  const userName = document.querySelector('#name').value;
  const userEmail = document.querySelector('#email').value;
  // 5. Выводим данные в консоль, чтобы убедиться, что мы их перехватили
  console.log(`Данные формы перехвачены: Имя - ${userName}, email - ${userEmail}`);
  // 6. Очищаем поля формы после отправки
  contactForm.reset();
});