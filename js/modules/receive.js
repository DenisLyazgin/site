import { getData, saveData } from "./utils.js";

export async function render(container) {
  const data = await getData();

  const pending = data.deliveries.filter(d => d.status === "Ожидает");

  container.innerHTML = `
    <h3>📦 Принятие поставок</h3>
    ${
      pending.length
        ? `<ul>${pending.map((d, i) => `<li>${d.name} — ${d.qty} кг 
          <button data-i="${i}">Принять</button></li>`).join("")}</ul>`
        : `<p>Нет ожидающих поставок.</p>`
    }
  `;

  container.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.i;
      const item = pending[i];
      const raw = data.raw_materials.find(r => r.name === item.name);
      if (raw) raw.stock += item.qty;
      item.status = "Принято";
      saveData(data);
      render(container);
    };
  });
}
