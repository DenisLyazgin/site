export function render(container) {
  container.innerHTML = `
    <h3>🔧 Взять в ремонт</h3>
    <p>Выберите оборудование для ремонта:</p>
    <select id="repairSelect">
      <option>Линия №2</option>
      <option>Термостат шоколадной линии</option>
    </select>
    <button id="repairBtn">Взять в работу</button>
    <div id="repairStatus" style="margin-top:10px;"></div>
  `;

  document.getElementById("repairBtn").onclick = () => {
    document.getElementById("repairStatus").innerHTML = "🧰 Оборудование взято в ремонт!";
  };
}
