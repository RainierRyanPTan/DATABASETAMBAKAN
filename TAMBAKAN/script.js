// ========== LOGIN LOGIC ==========
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("roleSelect").value;
    if (role === "user") window.location.href = "index.html";
    else if (role === "admin") window.location.href = "admin.html";
    else if (role === "pharmacy") window.location.href = "pharmacy.html";
  });
}

// ========== LOGOUT BUTTON ==========
document.querySelectorAll("#logoutBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});

// ========== CART SYSTEM ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// ========== PRODUCTS ==========
const products = [
  { id: 1, name: "Paracetamol", category: "general" },
  { id: 2, name: "Hand Sanitizer", category: "sanitizer" },
  { id: 3, name: "Protein Shake", category: "protein" },
  { id: 4, name: "Disinfectant Spray", category: "home" },
  { id: 5, name: "Vitamin C", category: "general" },
];

// ========== DISPLAY PRODUCTS ==========
function displayProducts(category = "all") {
  const container = document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = "";

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  filtered.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    displayProducts(e.target.dataset.category);
  });
});

// ========== CART PAGE ==========
const cartList = document.getElementById("cartItems");
if (cartList) {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.category})`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout successful! Thank you for your purchase.");
    localStorage.removeItem("cart");
    location.reload();
  });
}

// Initial Load
updateCartCount();
displayProducts();
