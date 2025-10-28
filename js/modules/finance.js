export function render(container) {
  container.innerHTML = `
    <h2>Подсистема "Финансы и аналитика"</h2>
    <p>Мониторинг KPI, анализ затрат и планов по подразделениям.</p>

    <div class="dashboard">
      <div class="card">
        <h3>📈 Выполнение плана продаж</h3>
        <div class="chart-container"><canvas id="salesChart"></canvas></div>
      </div>
      <div class="card">
        <h3>🏭 Производственные KPI</h3>
        <div class="chart-container"><canvas id="prodChart"></canvas></div>
      </div>
      <div class="card">
        <h3>💰 Себестоимость продукции</h3>
        <div class="chart-container"><canvas id="costChart"></canvas></div>
      </div>
    </div>

    <h3 style="margin-top:30px;">📊 Детализация по затратам</h3>
    <table border="1" cellpadding="5">
      <tr><th>Подразделение</th><th>План, тыс.руб</th><th>Факт, тыс.руб</th><th>Отклонение</th></tr>
      <tr><td>Производство</td><td>5400</td><td>5550</td><td style="color:red;">+150</td></tr>
      <tr><td>Снабжение</td><td>2100</td><td>2000</td><td style="color:green;">−100</td></tr>
      <tr><td>Продажи</td><td>3900</td><td>3950</td><td style="color:red;">+50</td></tr>
    </table>
  `;

  // --- Chart.js графики ---
  const ctx1 = document.getElementById('salesChart');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май'],
      datasets: [{
        label: 'Продажи, тыс. руб',
        data: [4200, 4700, 5200, 4900, 5600],
        backgroundColor: '#a55a2a'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      animation: { duration: 800, easing: 'easeOutQuart' }
    }
  });

  const ctx2 = document.getElementById('prodChart');
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: ['Шоколад', 'Вафли', 'Конфеты', 'Печенье'],
      datasets: [{
        label: 'KPI (%)',
        data: [98, 102, 95, 105],
        borderColor: '#7a3c0c',
        fill: true,
        backgroundColor: 'rgba(122, 60, 12, 0.1)',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 120 }
      },
      plugins: { legend: { display: false } },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });

  const ctx3 = document.getElementById('costChart');
  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: ['Сырье', 'Энергия', 'Зарплата', 'Логистика'],
      datasets: [{
        data: [45, 20, 25, 10],
        backgroundColor: ['#7a3c0c', '#a55a2a', '#d98c3f', '#f5c67d']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      animation: { duration: 1200, easing: 'easeInOutQuart' }
    }
  });
}
