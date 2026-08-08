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
const cardsContainer = document.querySelector('#project-cards-container');
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

// ==================== ЛОГИКА ТРЕКЕРА КРЕДИТОВ ====================

// 1. Модификация: При загрузке страницы Пытаемся взять данные из localStorage. 
// Если там пусто, создаем пустой массив [].
// JSON.parse превращает сохраненную строку обратно в JS-массив.
let creditsArray = JSON.parse(localStorage.getItem('my_credits')) || [];

// Находим форму в HTML
const creditForm = document.querySelector('#credit-form');
const creditsListContainer = document.querySelector('#credits-list');

// 2. Вспомогательная функция для сохранения актуального состояния в память
function saveToLocalStorage() {
  // JSON.stringify превращает массив объектов в строку, так как localStorage умеет хранить только строки
  localStorage.setItem('my_credits', JSON.stringify(creditsArray));
};

// 3. Функция для вывода кредитов на экран и расчета статистики
function renderCredits() {
  // Если контейнера нет на странице, выходим из функции
  if (!creditsListContainer) return;
  // Очищаем контейнер, чтобы карточки не дублировались при каждом добавлении
  creditsListContainer.innerHTML = '';

  // --- НОВЫЙ БЛОК: РАСЧЕТ СТАТИСТИКИ ЧЕРЕЗ REDUCE ---
  // Считаем общую сумму всех кредитов
  const totalSum = creditsArray.reduce((acc, credit) => acc + credit.total, 0);
  // Считаем общий ежемесячный платеж
  const totalPayment = creditsArray.reduce((acc, credit) => acc + credit.payment, 0);
  // Находим элементы на странице и вставляем туда посчитанные цифры
  const totalSumElement = document.querySelector('#total-debts-sum');
  const totalPaymentElement = document.querySelector('#total-monthly-payment');
  if (totalSumElement) totalSumElement.textContent = `${totalSum} грн`;
  if (totalPaymentElement) totalPaymentElement.textContent = `${totalPayment} грн`;



  // Если кредитов пока нет, можем вывести простую заглушку
  if (creditsArray.length === 0) {
    creditsListContainer.innerHTML = '<p>У вас пока нет добавленных кредитов.</p>';
    return;
  }
  // Перебираем массив кредитов и создаем HTML для каждого
  const creditsHTML = creditsArray.map(credit => {
    // Считаем, за сколько месяцев закроется кредит (Округляем в большую сторону)
    const monthsLeft = Math.ceil(credit.total / credit.payment);
    return `
      <div class="project-card" style="padding: 20px; text-align: left;">
        <h3>${credit.title}</h3>
        <p style="margin: 10px 0;">Остаток долга: <strong>${credit.total} грн</strong></p>
        <p style="margin: 10px 0;">Ежемесячный платеж: ${credit.payment} грн</p>
        <p style="margin: 10px 0; color: #00ff88;">Осталось месяцев: ${monthsLeft}</p>
        <button class="btn" style="background-color: #e63946; margin-top: 10px;" onclick="deleteCredit(${credit.id})">Удалить</button>
      </div>
    `;
  }).join('');
  // Вставляем сгенерированный HTML в контейнер
  creditsListContainer.insertAdjacentHTML('beforeend', creditsHTML);
};

// 4. Слушаем отправку формы/Обработчик формы
if (creditForm) {
  creditForm.addEventListener('submit', function(event) {
    // Отменяем перезагрузку страницы
    event.preventDefault();
    
    // Собираем данные из инпутов с помощью FormData
    const formData = new FormData(creditForm);
    
    // Создаем объект нового кредита
    const newCredit = {
      id: Date.now(), // Уникальный ID для каждого кредита (метка времени)
      title: formData.get('title'),
      total: Number(formData.get('total')), // Переводим строку в число
      payment: Number(formData.get('payment'))  // Переводим строку в число
    };

    // Добавляем новый кредит в наш массив
    creditsArray.push(newCredit);

    // СНАЧАЛА СОХРАНЯЕМ В ПАМЯТЬ, ПОТОМ ОБНОВЛЯЕМ ЭКРАН
    saveToLocalStorage();
    // ВЫЗЫВАЕМ ФУНКЦИЮ РЕНДЕРА, ЧТОБЫ КАРТОЧКА ПОЯВИЛАСЬ НА ЭКРАНЕ
    renderCredits();
    // Очищаем поля формы для следующего ввода
    creditForm.reset();
  });
}

// 5. Функция для удаления кредита (пока просто заготовка, чтобы кнопка не выдавала ошибку)
window.deleteCredit = function(id) {
  // Фильтруем массив: оставляем только те кредиты, ID которых не равен удаляемому
  creditsArray = creditsArray.filter(credit => credit.id !== id);
  // ОБНОВЛЯЕМ ПАМЯТЬ И ЭКРАН
  saveToLocalStorage();
  renderCredits();
};

// ПОСЛЕДНИЙ ШТРИХ: Запускаем рендер сразу при загрузке скрипта, 
// чтобы старые сохраненные кредиты сразу появились на экране!
renderCredits();