export function render(container) {
  container.innerHTML = `
    <h3>🍫 Работа с шоколадом</h3>
    <p>Выберите продукт для запуска линии:</p>
    <button>Шоколад "Классик"</button>
    <button>Конфеты "Орешек"</button>
    <button>Вафли "Ореховые"</button>
    <div id="processStatus" style="margin-top:10px;"></div>
  `;

  const buttons = container.querySelectorAll("button");
  const status = document.getElementById("processStatus");

  buttons.forEach(btn => {
    btn.onclick = () => {
      status.innerHTML = `🍫 Производство "${btn.innerText}" запущено!`;
    };
  });
}
