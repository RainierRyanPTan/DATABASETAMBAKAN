// ===== USER.JS (Home Page) =====

// Navigation to other pages
document.getElementById("medicineNav").addEventListener("click", () => {
  window.location.href = "medicine.html";
});

document.getElementById("notificationNav").addEventListener("click", () => {
  window.location.href = "notifications.html";
});

document.getElementById("profileNav").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.getElementById("homeNav").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Cart icon redirect
document.getElementById("cartIcon").addEventListener("click", () => {
  window.location.href = "cart.html";
});
