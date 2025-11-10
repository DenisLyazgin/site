import { loadData, saveData } from "../dataManager.js";

export async function render(container) {
  const data = await loadData();
  const equip = data.equipment;

  container.innerHTML = `
    <h2>Сообщить о поломке</h2>
    <form id="issueForm" class="form-block">
      <label>Оборудование:</label>
      <select id="equipmentSelect">
        ${equip.map(e => `<option>${e.name}</option>`).join("")}
      </select>

      <label>Описание проблемы:</label>
      <textarea id="issueDesc" placeholder="Например: не запускается нагрев..."></textarea>

      <label>Ваше имя:</label>
      <input id="issueReporter" placeholder="Иванов И.И.">

      <button type="submit" class="btn">Добавить</button>
    </form>
  `;

  document.getElementById("issueForm").addEventListener("submit", e => {
    e.preventDefault();
    const newIssue = {
      id: data.issues.length + 1,
      equipment: document.getElementById("equipmentSelect").value,
      description: document.getElementById("issueDesc").value,
      reportedBy: document.getElementById("issueReporter").value,
      date: new Date().toISOString(),
      status: "Ожидает мастера"
    };
    data.issues.push(newIssue);
    saveData(data);
    alert("Поломка добавлена!");
    render(container);
  });
}
