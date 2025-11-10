import { getData, saveData } from "./utils.js";

export async function render(container) {
  const data = await getData();
  const repairing = data.issues.filter(i => i.status === "В ремонте");

  container.innerHTML = `
    <h2>✅ Завершение ремонта</h2>
    ${
      repairing.length
        ? `<ul class="repair-list">
            ${repairing.map(r => `
              <li>
                <strong>${r.equipment}</strong> — ${r.description}
                <button class="btn done" data-id="${r.id}">Завершить ремонт</button>
              </li>
            `).join("")}
          </ul>`
        : `<p>Нет оборудования в ремонте.</p>`
    }
  `;

  container.querySelectorAll(".btn.done").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = +btn.dataset.id;
      const issue = data.issues.find(i => i.id === id);
      if (!issue) return;

      issue.status = "Завершена";

      const eq = data.equipment.find(e => e.name === issue.equipment);
      if (eq) eq.status = "Работает";

      data.repair_history.push({
        id: data.repair_history.length + 1,
        equipment: issue.equipment,
        description: issue.description,
        master: "Сидоров С.С.",
        date_start: issue.date,
        date_end: new Date().toISOString()
      });

      // Удаляем завершённую неисправность из активных
      data.issues = data.issues.filter(i => i.status !== "Завершена");

      await saveData(data);
      alert(`Ремонт "${issue.equipment}" завершён.`);
      render(container);
    });
  });
}
