// public/menu.js

document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const res = await fetch('/products');
    const products = await res.json();
    console.log(products); // Log the products to the console for debugging

    productList.innerHTML = ''; // Clear default content

    products.forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">KSH ${product.price}</span>
        <button class="add-to-cart" data-id="${product.product_id}" data-name="${product.name}" data-price="${product.price}">
      Add to Cart
    </button>
      `;
      productList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load products:', err);
    productList.innerHTML = '<li>Error loading menu. Please try again.</li>';
  }
});
