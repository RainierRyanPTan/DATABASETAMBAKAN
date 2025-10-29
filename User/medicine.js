// ===== CATEGORY FILTER =====
const categoryButtons = document.querySelectorAll('.category');
const products = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;

    products.forEach(product => {
      if (category === 'all' || product.classList.contains(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
});

// ===== ADD TO CART =====
const cartButtons = document.querySelectorAll('.product-card button');
cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('h3').innerText;
    alert(`${productName} added to cart!`);
  });
});

// ===== LOGOUT CONFIRMATION =====
const logoutLink = document.querySelector('.logout');
logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('Are you sure you want to log out?')) {
    window.location.href = 'login.html';
  }
});
