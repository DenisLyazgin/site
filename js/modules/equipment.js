import { getData } from "./utils.js";

export async function render(container) {
  const data = await getData();

  container.innerHTML = `
    <h2>⚙️ Состояние оборудования</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Тип</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        ${data.equipment.map(e => `
          <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.type}</td>
            <td>${e.status}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
