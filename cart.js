// Cart functionality
let cart = [];

function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Checkout form handling
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        payment: document.getElementById('payment').value,
        items: cart,
        total: calculateTotal()
    };
    
    // Here you would typically send this data to your server
    console.log('Order submitted:', formData);
    
    // Clear cart and show confirmation
    cart = [];
    saveCart();
    updateCartCount();
    
    alert('Thank you for your order! We will contact you shortly.');
    window.location.href = 'index.html';
});

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', loadCart);
