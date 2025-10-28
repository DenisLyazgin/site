document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const menuBar = document.getElementById("menuBar");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const modal = document.getElementById("loginModal");
  const submitLogin = document.getElementById("submitLogin");
  const cancelLogin = document.getElementById("cancelLogin");

  // Проверка авторизации
  const isDirector = localStorage.getItem("role") === "director";
  if (isDirector) showDirectorView();
  else showGuestView();

  // Гостевой режим
  function showGuestView() {
  menuBar.style.display = "none";
  logoutBtn.style.display = "none";
  loginBtn.style.display = "block";

  content.innerHTML = `
    <div class="guest-wrapper">
      <section class="hero-section">
        <h2 class="fade-in">Добро пожаловать на фабрику "Шоколадный орешик"!</h2>
        <p class="fade-in">
          Основанная в 1998 году, фабрика "Шоколадный орешик" стала символом качества и традиций в мире сладостей.
          Мы бережно храним секреты старинных рецептов, совмещая их с современными технологиями,
          чтобы создавать неповторимые десерты, в каждом из которых — частичка тепла и заботы.
        </p>
        <p class="fade-in">
          Наша миссия — приносить радость и вдохновение в каждый дом, где аромат свежего шоколада ассоциируется
          с уютом, праздником и любовью. Продукция фабрики поставляется по всей стране и за её пределами,
          завоёвывая сердца сладкоежек с каждым новым вкусом.
        </p>
      </section>

      <section class="slider-section">
        <div class="slider fade-in">
             <img src="foto/1.jpg" alt="Шоколад" class="slide active">
             <img src="foto/2.jpg" alt="Конфеты" class="slide">
             <img src="foto/3.jpg" alt="Вафли" class="slide">
             <img src="foto/4.jpg" alt="Производство" class="slide">
        </div>
      </section>


      <section class="about-section">
        <h3>История фабрики</h3>
        <p>
          Всё началось с небольшой кондитерской в Гомеле, где талантливые мастера вручную создавали первые конфеты и вафли.
          Со временем “Шоколадный орешик” превратился в мощное предприятие, сохранив при этом душу семейного дела.
        </p>
        <p>
          Сегодня фабрика производит десятки наименований продукции — от классических шоколадных плиток до авторских конфет с орехами, карамелью и фруктовыми начинками.
          Наши технологи экспериментируют с рецептурами, добиваясь идеального баланса вкуса, текстуры и аромата.
        </p>
        <p>
          Благодаря современному оборудованию и строгому контролю качества, каждая партия продукции соответствует самым высоким стандартам.
          Мы гордимся тем, что за более чем 25 лет существования фабрики наш бренд стал символом доверия и удовольствия.
        </p>
        <p>
          “Шоколадный орешик” — это не просто сладости. Это эмоции, воспоминания, уютные вечера и маленькие радости, которые объединяют поколения.
        </p>
      </section>
    </div>
  `;

  startSlider(); // запускаем слайдер
  animateBackground(); // запускаем фон
}

function startSlider() {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000); // каждые 4 секунды
}

function animateBackground() {
  const bgCanvas = document.createElement("canvas");
  bgCanvas.id = "chocoCanvas";
  document.body.appendChild(bgCanvas);

  const ctx = bgCanvas.getContext("2d");
  let width, height;
  let drops = [];

  function resize() {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
    drops = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 15 + 5,
      speed: Math.random() * 1.5 + 0.5
    }));
  }

  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const d of drops) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(d.x, d.y, 2, d.x, d.y, d.r);
      gradient.addColorStop(0, "#5b2c06");
      gradient.addColorStop(1, "rgba(90,45,10,0)");
      ctx.fillStyle = gradient;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      d.y += d.speed;
      if (d.y > height + 10) d.y = -10;
    }
    requestAnimationFrame(draw);
  }
  draw();
}


  // Режим директора
  function showDirectorView() {
    menuBar.style.display = "block";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    content.innerHTML = `
      <h2>Добро пожаловать, директор!</h2>
      <p>Вы можете управлять всеми подсистемами предприятия через меню выше.</p>
    `;
    activateMenu();
  }

  // Открытие/закрытие окна входа
  loginBtn.addEventListener("click", () => modal.style.display = "flex");
  cancelLogin.addEventListener("click", () => modal.style.display = "none");

  // Вход
  submitLogin.addEventListener("click", () => {
    const login = document.getElementById("loginInput").value.trim();
    const pass = document.getElementById("passInput").value.trim();
    const error = document.getElementById("loginError");

    if (login === "director" && pass === "12345") {
      localStorage.setItem("role", "director");
      modal.style.display = "none";
      showDirectorView();
    } else {
      error.style.display = "block";
      setTimeout(() => error.style.display = "none", 2000);
    }
  });

  // Выход
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("role");
    showGuestView();
  });

  // Подключение модулей
  function activateMenu() {
    const menuItems = document.querySelectorAll("#menu li");
    menuItems.forEach(item => {
      item.addEventListener("click", async () => {
        const moduleName = item.dataset.module;
        content.innerHTML = `<div style="text-align:center;padding:50px;"><img src="https://i.gifer.com/ZKZg.gif" width="60"></div>`;
        try {
          const module = await import(`./modules/${moduleName}.js`);
          setTimeout(() => {
            content.innerHTML = "";
            module.render(content);
          }, 300);
        } catch (err) {
          content.innerHTML = `<p style="color:red">Ошибка: ${err.message}</p>`;
        }
      });
    });
  }
});
