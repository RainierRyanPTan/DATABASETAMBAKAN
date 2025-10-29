// ===== MEDICINE.JS =====

// ========== Navigation Buttons ==========
document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("profileBtn").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.getElementById("notificationsBtn").addEventListener("click", () => {
  window.location.href = "notifications.html";
});

document.getElementById("cartBtn").addEventListener("click", () => {
  window.location.href = "cart.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("You have been logged out.");
  window.location.href = "login.html";
});

// ========== Cart System ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// ========== Update Cart Count ==========
function updateCartCount() {
  const countElement = document.getElementById("cartCount");
  if (countElement) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    countElement.textContent = totalItems;
  }
}

// ========== Category Filter ==========
const categoryButtons = document.querySelectorAll(".category");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach(card => {
      if (category === "all" || card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

updateCartCount();
