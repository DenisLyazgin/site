document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const menuBar = document.getElementById("menuBar");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const modal = document.getElementById("loginModal");
  const submitLogin = document.getElementById("submitLogin");
  const cancelLogin = document.getElementById("cancelLogin");

  // Проверка роли
  const isDirector = localStorage.getItem("role") === "director";
  if (isDirector) showDirectorView();
  else showGuestView();

  // ---------------------- ГОСТЕВОЙ РЕЖИМ ----------------------
  function showGuestView() {
    menuBar.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";

    content.innerHTML = `
      <div class="guest-wrapper">
        <section class="hero-section fade-in">
          <h2>Добро пожаловать на фабрику <span>«Шоколадный орешик»</span>!</h2>
          <p>
            Основанная в 1998 году, фабрика “Шоколадный орешик” производит шоколад, конфеты и вафли,
            покорившие сердца сладкоежек по всей стране.
          </p>
        </section>

        <section class="info-section fade-in">
          <h3>О нас</h3>
          <p>
            Наша фабрика объединяет старинные рецепты и современные технологии.
            Более 250 сотрудников ежедневно создают до 30 тонн шоколада, конфет и вафель.
          </p>
          <p>
            Мы экспортируем продукцию в 12 стран, сотрудничаем с крупными сетями (“Green”, “Евроопт”, “Корона”).
          </p>
        </section>

        <section class="products-section fade-in">
          <h3>Наша продукция</h3>
          <ul class="products-list">
            <li>🍫 Шоколадные плитки с орехами и карамелью</li>
            <li>🍬 Конфеты ручной работы</li>
            <li>🥞 Вафельные рулетики с кремом</li>
            <li>🍪 Печенье с шоколадной глазурью</li>
          </ul>
        </section>

        <section class="slider-section fade-in">
          <div class="slider">
            <img src="foto/1.jpg" class="slide active" alt="Шоколад">
            <img src="foto/2.jpg" class="slide" alt="Конфеты">
            <img src="foto/3.jpg" class="slide" alt="Вафли">
            <img src="foto/4.jpg" class="slide" alt="Производство">
          </div>
        </section>

        <section class="contacts fade-in">
          <h3>Контакты</h3>
          <p>📍 Гомель, ул. Кондитерская, 12</p>
          <p>📞 +375 (232) 45-67-89</p>
          <p>✉️ info@choco-nut.by</p>
        </section>
      </div>
    `;

    startSlider();
    animateBackground();
  }

  // ---------------------- СЛАЙДЕР ----------------------
  function startSlider() {
    const slides = document.querySelectorAll(".slide");
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 4000);
  }

  // ---------------------- АНИМАЦИЯ ФОНА ----------------------
  function animateBackground() {
    const existingCanvas = document.getElementById("chocoCanvas");
    if (existingCanvas) existingCanvas.remove();

    const bgCanvas = document.createElement("canvas");
    bgCanvas.id = "chocoCanvas";
    document.body.appendChild(bgCanvas);

    const ctx = bgCanvas.getContext("2d");
    let width, height;
    let drops = [];

    function resize() {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
      drops = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 12 + 4,
        speed: Math.random() * 1.5 + 0.5
      }));
    }

    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.fillStyle = "rgba(50, 20, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);
      for (const d of drops) {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(d.x, d.y, 2, d.x, d.y, d.r);
        grad.addColorStop(0, "#8B4513");
        grad.addColorStop(1, "rgba(139,69,19,0)");
        ctx.fillStyle = grad;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        d.y += d.speed;
        if (d.y > height + 10) d.y = -10;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ---------------------- ДИРЕКТОР ----------------------
  function showDirectorView() {
    menuBar.style.display = "block";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    content.innerHTML = `
      <h2 class="fade-in">Добро пожаловать, директор!</h2>
      <p class="fade-in">Вы можете управлять всеми подсистемами предприятия через меню выше.</p>
    `;
    activateMenu();
  }

  // ---------------------- ВХОД ----------------------
  loginBtn.addEventListener("click", () => modal.classList.add("show"));
  cancelLogin.addEventListener("click", () => modal.classList.remove("show"));

  // Эффект "тающего" шоколада при наведении
  loginBtn.addEventListener("mouseenter", () => loginBtn.classList.add("melt"));
  loginBtn.addEventListener("mouseleave", () => loginBtn.classList.remove("melt"));

  submitLogin.addEventListener("click", () => {
    const login = document.getElementById("loginInput").value.trim();
    const pass = document.getElementById("passInput").value.trim();
    const error = document.getElementById("loginError");

    if (login === "director" && pass === "12345") {
      localStorage.setItem("role", "director");
      modal.classList.remove("show");
      showDirectorView();
    } else {
      error.style.opacity = 1;
      setTimeout(() => (error.style.opacity = 0), 2000);
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("role");
    showGuestView();
  });

  // ---------------------- АКТИВАЦИЯ МЕНЮ ----------------------
  function activateMenu() {
    const menuItems = document.querySelectorAll("#menu li");
    menuItems.forEach(item => {
      item.addEventListener("click", async () => {
        content.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
        try {
          const moduleName = item.dataset.module;
          const module = await import(`./modules/${moduleName}.js`);
          setTimeout(() => {
            content.innerHTML = "";
            module.render(content);
            content.classList.add("fade-content");
          }, 500);
        } catch (err) {
          content.innerHTML = `<p style="color:red">Ошибка: ${err.message}</p>`;
        }
      });
    });
  }
});
