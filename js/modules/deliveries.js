import { loadData, saveData } from "../dataManager.js";

export async function render(container) {
  const data = await loadData();
  const deliveries = data.deliveries;
  const suppliers = data.suppliers;
  const materials = data.raw_materials;

  container.innerHTML = `
    <h2>Поставки</h2>
    <div id="deliveriesList">
      <table class="data-table">
        <thead>
          <tr><th>ID</th><th>Дата</th><th>Поставщик</th><th>Состав</th><th>Статус</th><th>Действия</th></tr>
        </thead>
        <tbody>
          ${deliveries.map(d => `
            <tr>
              <td>${d.id}</td>
              <td>${d.date}</td>
              <td>${d.supplier}</td>
              <td>${d.items.map(i => `${i.material}: ${i.quantity}`).join("<br>")}</td>
              <td>${d.status}</td>
              <td>
                ${d.status === "В пути" ? `<button class="btn complete" data-id="${d.id}">Доставлено</button>` : ""}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <h3>Добавить новую поставку</h3>
    <form id="addDelivery" class="form-block">
      <label>Поставщик:</label>
      <select id="deliverySupplier">
        ${suppliers.map(s => `<option>${s.name}</option>`).join("")}
      </select>
      <label>Материал:</label>
      <select id="deliveryMaterial">
        ${materials.map(m => `<option>${m.name}</option>`).join("")}
      </select>
      <label>Количество:</label>
      <input type="number" id="deliveryQty" min="1" value="100">
      <button type="submit" class="btn">Добавить поставку</button>
    </form>
  `;

  document.querySelectorAll(".btn.complete").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.dataset.id;
      const del = deliveries.find(d => d.id === id);
      del.status = "Доставлено";
      saveData(data);
      alert(`Поставка №${id} завершена.`);
      render(container);
    })
  );

  document.getElementById("addDelivery").addEventListener("submit", e => {
    e.preventDefault();
    const newDel = {
      id: deliveries.length + 1,
      date: new Date().toISOString().slice(0, 10),
      supplier: document.getElementById("deliverySupplier").value,
      items: [{
        material: document.getElementById("deliveryMaterial").value,
        quantity: +document.getElementById("deliveryQty").value
      }],
      status: "В пути"
    };
    deliveries.push(newDel);
    saveData(data);
    alert("Новая поставка добавлена!");
    render(container);
  });
}
