document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {

            existingItem.quantity++;

            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            
            updateCartDisplay();
        }
    });
    

    function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - KSH ${item.price * item.quantity}`;
        cartContainer.appendChild(li);
        total += item.price * item.quantity;
    });

    
    totalContainer.textContent = `Total: KSH ${total}`;
    }
});
