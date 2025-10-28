export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Производство"</h2>
    <p>Функции:</p>
    <ul>
      <li>Планирование производства</li>
      <li>Учёт выпуска и простоев</li>
      <li>Формирование заявок на сырьё</li>
    </ul>

    <button id="openPlan">План производства</button>
    <div id="productionArea"></div>
  `;

  document.getElementById("openPlan").addEventListener("click", () => {
    const area = document.getElementById("productionArea");
    area.innerHTML = `
      <h3>План производства</h3>
      <table border="1" cellpadding="5">
        <tr><th>Продукт</th><th>Объем</th><th>Дата</th></tr>
        <tr><td>Шоколад "Классик"</td><td>500 кг</td><td>27.10.2025</td></tr>
        <tr><td>Конфеты "Орешек"</td><td>300 кг</td><td>27.10.2025</td></tr>
      </table>
    `;
  });
}
