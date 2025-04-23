document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    fetch('/products')

      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(products => {
        if (!products.length) {
          productList.innerHTML = '<li>No products found</li>';
          return;
        }
  
        products.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `${product.name} – $${product.price}`;
          productList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<li>Could not load menu.</li>';
      });
  });
  