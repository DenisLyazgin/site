export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Качество и R&D"</h2>
    <p>Контроль качества сырья и готовой продукции.</p>

    <button id="rawBtn">Контроль сырья</button>
    <button id="productBtn">Контроль готовой продукции</button>
    <div id="output"></div>
  `;

  document.getElementById("rawBtn").addEventListener("click", showRaw);
  document.getElementById("productBtn").addEventListener("click", showProduct);

  function showRaw() {
    document.getElementById("output").innerHTML = `
      <h3>Результаты входного контроля сырья</h3>
      <table border="1" cellpadding="5">
        <tr><th>Партия</th><th>Материал</th><th>Результат</th></tr>
        <tr><td>№123</td><td>Какао-бобы</td><td>Годен</td></tr>
        <tr><td>№124</td><td>Сахар</td><td>Брак</td></tr>
      </table>
    `;
  }

  function showProduct() {
    document.getElementById("output").innerHTML = `
      <h3>Паспорта качества</h3>
      <table border="1" cellpadding="5">
        <tr><th>Партия</th><th>Продукт</th><th>Оценка</th></tr>
        <tr><td>№89</td><td>Конфеты "Орешек"</td><td>Соответствует</td></tr>
        <tr><td>№90</td><td>Вафли "Ореховые"</td><td>Отклонение по влажности</td></tr>
      </table>
    `;
  }
}
