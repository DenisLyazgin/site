export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Логистика и склад"</h2>
    <p>Учет движения сырья и готовой продукции.</p>

    <button id="stockBtn">Остатки на складе</button>
    <button id="moveBtn">Перемещения</button>
    <div id="output"></div>
  `;

  document.getElementById("stockBtn").addEventListener("click", showStock);
  document.getElementById("moveBtn").addEventListener("click", showMove);

  function showStock() {
    document.getElementById("output").innerHTML = `
      <h3>Остатки на складе</h3>
      <table border="1" cellpadding="5">
        <tr><th>Наименование</th><th>Тип</th><th>Количество</th></tr>
        <tr><td>Какао-бобы</td><td>Сырьё</td><td>1200 кг</td></tr>
        <tr><td>Шоколад "Классик"</td><td>Готовая продукция</td><td>800 кг</td></tr>
      </table>
    `;
  }

  function showMove() {
    document.getElementById("output").innerHTML = `
      <h3>Внутренние перемещения</h3>
      <table border="1" cellpadding="5">
        <tr><th>Дата</th><th>Откуда</th><th>Куда</th><th>Продукт</th><th>Кол-во</th></tr>
        <tr><td>27.10.2025</td><td>Цех шоколада</td><td>Склад ГП</td><td>Шоколад</td><td>500</td></tr>
      </table>
    `;
  }
}
