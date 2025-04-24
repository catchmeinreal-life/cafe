document.addEventListener('DOMContentLoaded', () => {
    
    const cartLink = document.getElementById('cart-link');
    const cartCount = document.getElementById('cart-count');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    // Add an item to the cart
    function addToCart(itemName, price, id) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {

            //if item already exist, increase its quantity
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            // else, add new item to the cart with quantity 1
            cart.push({ id, name: itemName, price, quantity: 1 });
        }
        updateCartUI();
    }

    // Remove an item from the cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id); // Remove item from cart
        updateCartUI();
    } 


    //increase item quantity in the cart
    function incrementItem(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
            updateCartUI();
        }
    }

    // decrease item quantity in the cart
    function decrementItem(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(id); // Remove item if quantity is 0
            } else {
                updateCartUI();
            }
        }
    }

    // Update the cart display (cart count & items)
    function updateCartUI() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsList.innerHTML = '';

        let total = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} x ${item.quantity} - KSH ${item.price * item.quantity.toFixed(2)}
                <button class="decrement-btn" data-id="${item.id}">-</button>
                <button class="increment-btn" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">x</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: KSH ${total.toFixed(2)}`;
    }

    // Toggle cart dropdown visibility when cart icon is clicked
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartDropdown.classList.toggle('hidden'); //hidden
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.dataset.id;
            removeFromCart(id);
        } else if (e.target.classList.contains('decrement-btn')) {
            const id = e.target.dataset.id;
            decrementItem(id);
        } else if (e.target.classList.contains('increment-btn')) {

            const id = e.target.dataset.id;
            incrementItem(id);
        } else if (e.target.classList.contains('add-to-cart')) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);

            addToCart(name, price, id);
        }
    });


    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', (e) => {
        setTimeout(() => {
            const isInsideCart = cartDropdown.contains(e.target) || cartLink.contains(e.target);
            const isControlButton = e.target.classList.contains('decrement-btn')|| e.target.classList.contains('increment-btn') || e.target.classList.contains('remove-btn');
    
            if (!isInsideCart && !isControlButton) {
                cartDropdown.classList.add('hidden');
            }
        }, 0);
    });
    


});
