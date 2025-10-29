// ========================================
// Health360 Home Page JS
// ========================================

// Search Function
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    alert(`Searching for "${query}"...`);
  } else {
    alert("Please enter a search term.");
  }
});

// Order Now Button
document.getElementById("orderBtn").addEventListener("click", () => {
  alert("Redirecting to order page...");
});

// Category Filter
const categories = document.querySelectorAll(".cat");
const products = document.querySelectorAll(".product");

categories.forEach(cat => {
  cat.addEventListener("click", () => {
    categories.forEach(c => c.classList.remove("active"));
    cat.classList.add("active");

    const filter = cat.dataset.category;

    products.forEach(prod => {
      if (filter === "all" || prod.classList.contains(filter)) {
        prod.style.display = "block";
      } else {
        prod.style.display = "none";
      }
    });
  });
});

// Cart Icon
document.getElementById("cartIcon").addEventListener("click", () => {
  alert("Cart page coming soon!");
});

// Bottom Navigation
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(nav => {
  nav.addEventListener("click", () => {
    navItems.forEach(n => n.classList.remove("active"));
    nav.classList.add("active");
  });
});
