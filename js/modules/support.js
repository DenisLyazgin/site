export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Техническая поддержка"</h2>
    <p>Планирование ремонтов и учёт оборудования.</p>

    <button id="repairBtn">ППР и ремонты</button>
    <button id="spareBtn">Запасные части</button>
    <div id="output"></div>
  `;

  document.getElementById("repairBtn").addEventListener("click", showRepairs);
  document.getElementById("spareBtn").addEventListener("click", showSpares);

  function showRepairs() {
    document.getElementById("output").innerHTML = `
      <h3>График плановых ремонтов</h3>
      <table border="1" cellpadding="5">
        <tr><th>Оборудование</th><th>Дата ТО</th><th>Ответственный</th></tr>
        <tr><td>Линия №1</td><td>28.10.2025</td><td>Иванов</td></tr>
        <tr><td>Линия №2</td><td>29.10.2025</td><td>Петров</td></tr>
      </table>
    `;
  }

  function showSpares() {
    document.getElementById("output").innerHTML = `
      <h3>Остатки запчастей</h3>
      <table border="1" cellpadding="5">
        <tr><th>Наименование</th><th>Количество</th></tr>
        <tr><td>Ремень приводной</td><td>12</td></tr>
        <tr><td>Подшипник 6204</td><td>25</td></tr>
      </table>
    `;
  }
}
