// Logout button
document.querySelector('.logout').addEventListener('click', () => {
  window.location.href = 'login.html';
});

// Inventory buttons
document.querySelectorAll('.update-stock-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Redirecting to inventory update page...');
  });
});

document.querySelectorAll('.process-orders-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Opening orders management...');
  });
});

document.querySelectorAll('.low-stock-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Displaying low stock alerts...');
  });
});

document.querySelectorAll('.send-report-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Sending report to Admin...');
  });
});

document.querySelectorAll('.manage-data-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Redirecting to manage medicine data...');
  });
});