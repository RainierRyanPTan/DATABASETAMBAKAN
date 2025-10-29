// ===== USER.JS (Home Page) =====

// "ORDER NOW" button → go to medicine.html
document.getElementById("orderNowBtn").addEventListener("click", () => {
  window.location.href = "medicine.html";
});

// Logout button (example redirect)
document.querySelector(".logout").addEventListener("click", () => {
  alert("You have logged out successfully!");
  window.location.href = "login.html";
});
