// Chart 1: Medicine Sales Trend
const ctx1 = document.getElementById('salesChart');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Medicines Sold',
      data: [120, 190, 150, 200, 220, 180, 240],
      borderColor: '#00bfff',
      backgroundColor: 'rgba(0,191,255,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

// Chart 2: Top Used Medicines
const ctx2 = document.getElementById('medicineChart');
new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Paracetamol', 'Vitamin C', 'Amoxicillin', 'Ibuprofen', 'Cetirizine'],
    datasets: [{
      data: [35, 25, 15, 15, 10],
      backgroundColor: ['#007bff','#00c2ff','#33d9b2','#ffb142','#ff5252']
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  }
});

// Logout button already links to login.html