import { getData } from "./utils.js";

export async function render(container) {
  const data = await getData();

  container.innerHTML = `
    <h3>🏭 Склад сырья</h3>
    <table class="table">
      <thead><tr><th>Название</th><th>Остаток (кг)</th><th>Поставщик</th></tr></thead>
      <tbody>${data.raw_materials.map(r => `
        <tr><td>${r.name}</td><td>${r.stock}</td><td>${r.supplier}</td></tr>
      `).join("")}</tbody>
    </table>
  `;
}
