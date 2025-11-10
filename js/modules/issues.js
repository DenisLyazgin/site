import { loadData, saveData } from "../dataManager.js";

export async function render(container) {
  container.innerHTML = `<h2>Поломки оборудования</h2><div id="issuesContainer">Загрузка...</div>`;
  const data = await loadData();
  const issues = data.issues;
  const repairs = data.repair_history;
  const equip = data.equipment;

  const div = document.getElementById("issuesContainer");
  div.innerHTML = `
    <table class="data-table">
      <thead>
        <tr><th>ID</th><th>Оборудование</th><th>Описание</th><th>Сообщил</th><th>Дата</th><th>Статус</th><th>Действия</th></tr>
      </thead>
      <tbody>
        ${issues.map(i => `
          <tr>
            <td>${i.id}</td>
            <td>${i.equipment}</td>
            <td>${i.description}</td>
            <td>${i.reportedBy}</td>
            <td>${new Date(i.date).toLocaleString()}</td>
            <td>${i.status}</td>
            <td>
              ${i.status === "Ожидает мастера"
                ? `<button class="btn start" data-id="${i.id}">Взять в работу</button>`
                : i.status === "В ремонте"
                ? `<button class="btn done" data-id="${i.id}">Завершить</button>`
                : ""}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  div.querySelectorAll(".btn.start").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.dataset.id;
      const issue = issues.find(i => i.id === id);
      issue.status = "В ремонте";
      equip.find(eq => eq.name === issue.equipment).status = "На ремонте";
      saveData(data);
      alert(`Поломка №${id} взята в работу.`);
      render(container);
    })
  );

  div.querySelectorAll(".btn.done").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.dataset.id;
      const issue = issues.find(i => i.id === id);
      issue.status = "Завершена";
      const eq = equip.find(eq => eq.name === issue.equipment);
      eq.status = "Работает";
      repairs.push({
        id: repairs.length + 1,
        equipment: issue.equipment,
        description: issue.description,
        master: "Сидоров С.С.",
        date_start: issue.date,
        date_end: new Date().toISOString()
      });
      data.issues = issues.filter(i => i.status !== "Завершена");
      saveData(data);
      alert(`Ремонт оборудования "${issue.equipment}" завершён.`);
      render(container);
    })
  );
}
