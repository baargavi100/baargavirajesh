
const ecoData = [
  { user: "Sam", carbonSaved: 15, aiScore: 95, skills: 3, greenRoute: 'Yes' },
  { user: "Ana", carbonSaved: 12, aiScore: 87, skills: 2, greenRoute: 'No' },
  { user: "Leo", carbonSaved: 18, aiScore: 92, skills: 4, greenRoute: 'Yes' },
  { user: "Meena", carbonSaved: 22, aiScore: 93, skills: 5, greenRoute: 'Yes' }
];

let pieChart; 


function initializePieChart() {
  const ctx = document.getElementById('route-pie').getContext('2d');
  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Green Route', 'Non-Green Route'],
      datasets: [{
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#f44336'],
        hoverBackgroundColor: ['#66BB6A', '#FF7043']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14
          },
          formatter: (value) => value
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}


function updatePieChart(filteredData) {
  const greenRouteCount = filteredData.filter(data => data.greenRoute === 'Yes').length;
  const nonGreenRouteCount = filteredData.filter(data => data.greenRoute === 'No').length;

  pieChart.data.datasets[0].data = [greenRouteCount, nonGreenRouteCount];
  pieChart.update();
}


function updateDashboard(selectedUser) {
  let filteredData = ecoData;

  if (selectedUser !== "all") {
    filteredData = ecoData.filter(data => data.user === selectedUser);
  }

  const totalCarbon = filteredData.reduce((sum, data) => sum + data.carbonSaved, 0);
  const avgAiScore = (filteredData.reduce((sum, data) => sum + data.aiScore, 0) / filteredData.length).toFixed(2);
  const totalSkills = filteredData.reduce((sum, data) => sum + data.skills, 0);

  document.getElementById('carbon-saved').textContent = `🌍 Total Carbon Saved: ${totalCarbon} kg`;
  document.getElementById('ai-score').textContent = `🧠 Avg AI Score: ${avgAiScore} %`;
  document.getElementById('skills-gained').textContent = `📘 Green Skills Gained: ${totalSkills}`;

  updatePieChart(filteredData);
}


document.getElementById('user-select').addEventListener('change', function (event) {
  updateDashboard(event.target.value);
});


initializePieChart();
updateDashboard('all');
