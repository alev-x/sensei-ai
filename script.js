// ==================== 1. ЛОГИКА ОТКРЫТИЯ/СКРЫТИЯ ФОРМЫ ====================

//находим на странице кнопку и блок, который нужно показать/скрыть
const toggleButton = document.querySelector('#call_back');
const contactForm = document.querySelector('#callback-form');

//добавляем обработчик клика на кнопку
toggleButton.addEventListener('click', function() {
    //меняем класс блока, который отвечает за его видимость
    contactForm.classList.toggle('content-hidden');
    //проверяем, скрыт ли блок
  if (contactForm.classList.contains('content-hidden')) {
    toggleButton.textContent = 'Связаться';
  } else {
    toggleButton.textContent = 'Отмена';
  }
});

// ==================== 2. ДИНАМИЧЕСКИЙ РЕНДЕР ПРОЕКТОВ ====================

// Связываем базу данных с сайтом (DOM-манипуляции)
const myProjects = [
  { title: "Адаптивное портфолио", image: "./img/1.jpg", image_alt: "Проект 1", desc: "Мой первый сайт на HTML и CSS с темной темой.", link: "#"},
  { title: "JS Трекер кредитов", image: "./img/2.jpg", image_alt: "Проект 2", desc: "Автоматизированная система проверки баланса на чистом JavaScript.", link: "#"},
  { title: "Будущий проект на React", image: "./img/3.jpg", image_alt: "Проект 3", desc: "Здесь будет крутое SPA приложение.", link: "#"}
];

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

// ==================== 3. ОТПРАВКА ДАННЫХ ИЗ ФОРМЫ В СЕТЬ ====================

// Слушаем событие 'submit' (отправка), а не просто клик по кнопке // Обрати внимание на слово async перед функцией!
contactForm.addEventListener('submit', async function(event) {
  // ПЕРВЫМ ДЕЛОМ отменяем перезагрузку страницы!
  event.preventDefault();

  // Достаем значения, которые пользователь ввёл в поля (через .value)
  const userName = document.querySelector('#name').value;
  const userEmail = document.querySelector('#email').value;

  // Создаем объект с данными, который мы хотим отправить боссу или в базу данных
  const formData = {
    name: userName,
    email: userEmail
  };


  // 1. Говорим блоку try: "Попробуй выполнить этот код"
  try {
    toggleButton.textContent = "Отправка...";
    
    // Отправляем запрос в сеть (асинхронно)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Говорим серверу: "Мы создаем/отправляем новые данные"
      body: JSON.stringify(formData),  // Превращаем наш JS-объект в строку для интернета
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    // Если сервер ответил ошибкой (например, 404 или 500)
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    // Ждем ответ от сервера, переведенный обратно в формат JS-объекта
    const result = await response.json();
    // Смотрим, что нам ответил сервер!
    console.log("Ответ от сервера получен!", result);

    // Безопасно меняем текст на кнопке управления
    toggleButton.textContent = `Спасибо, ${result.name}! Данные улетели.`;

    // Очищаем поля формы после отправки
    contactForm.reset();

  // 2. Если в блоке try что-то пошло не так (нет сети, прокси блок), управление переходит сюда
  } catch (error) {
    console.error("Поймали ошибку сети:", error);

    // Вместо падения и изменения стилей кнопок — вежливый alert
    alert("Из-за ограничений сети (CORS/Proxy) не удалось отправить запрос в интернет. Но твоя JS-логика сработала идеально!");
    toggleButton.textContent = "Связаться";
  }
});