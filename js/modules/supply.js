export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Снабжение и продажи"</h2>
    <p>Управление закупками и заказами клиентов.</p>

    <button id="purchaseBtn">Закупки</button>
    <button id="salesBtn">Продажи</button>
    <div id="output"></div>
  `;

  document.getElementById("purchaseBtn").addEventListener("click", showPurchases);
  document.getElementById("salesBtn").addEventListener("click", showSales);

  function showPurchases() {
    document.getElementById("output").innerHTML = `
      <h3>Заказы поставщикам</h3>
      <table border="1" cellpadding="5">
        <tr><th>Поставщик</th><th>Материал</th><th>Кол-во</th><th>Статус</th></tr>
        <tr><td>ООО "КакаоИмпорт"</td><td>Какао-бобы</td><td>500 кг</td><td>В пути</td></tr>
        <tr><td>ООО "СахарТорг"</td><td>Сахар</td><td>1000 кг</td><td>Доставлено</td></tr>
      </table>
    `;
  }

  function showSales() {
    document.getElementById("output").innerHTML = `
      <h3>Заказы клиентов</h3>
      <table border="1" cellpadding="5">
        <tr><th>Клиент</th><th>Продукт</th><th>Количество</th><th>Статус</th></tr>
        <tr><td>Магнит</td><td>Конфеты "Орешек"</td><td>1000 кг</td><td>Отгружено</td></tr>
        <tr><td>Евроопт</td><td>Вафли</td><td>800 кг</td><td>В производстве</td></tr>
      </table>
    `;
  }
}
