// Datos de la Colección (Simulando una base de datos)
const artCollection = [
    {
        id: 1,
        title: "Susurros del Alba",
        technique: "Óleo sobre lienzo",
        dimensions: "60x80 cm",
        price: 250,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        title: "Tormenta de Color",
        technique: "Acrílico fluido",
        dimensions: "50x50 cm",
        price: 180,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        title: "Mirada Abstracta",
        technique: "Técnica mixta",
        dimensions: "100x100 cm",
        price: 420,
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        title: "Otoño Eterno",
        technique: "Óleo con espátula",
        dimensions: "40x60 cm",
        price: 210,
        image: "https://images.unsplash.com/photo-1518998053502-517e205aa296?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 5,
        title: "Calma Marina",
        technique: "Acuarela profesional",
        dimensions: "30x40 cm",
        price: 120,
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 6,
        title: "Dualidad Urbano",
        technique: "Spray y óleo",
        dimensions: "70x90 cm",
        price: 350,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
    }
];

// Estado del Carrito
let cart = JSON.parse(localStorage.getItem('art_cart')) || [];

// Elementos del DOM
const artGrid = document.getElementById('art-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const orderModal = document.getElementById('order-modal');
const closeModal = document.getElementById('close-modal');
const orderForm = document.getElementById('order-form');

// --- FUNCIONES ---

// 1. Renderizar Galería
function renderGallery() {
    artGrid.innerHTML = artCollection.map(art => `
        <article class="art-card">
            <img src="${art.image}" alt="${art.title}" class="art-image" loading="lazy">
            <div class="art-info">
                <h4>${art.title}</h4>
                <p class="art-meta">${art.technique} | ${art.dimensions}</p>
                <p class="art-price">$${art.price}</p>
                <button class="btn-primary full-width" onclick="addToCart(${art.id})">
                    Añadir al Carrito
                </button>
            </div>
        </article>
    `).join('');
}

// 2. Gestión del Carrito
function addToCart(id) {
    const art = artCollection.find(item => item.id === id);
    if (art) {
        cart.push(art);
        updateCart();
        openSidebar();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    // Persistencia
    localStorage.setItem('art_cart', JSON.stringify(cart));
    
    // Contador UI
    cartCount.textContent = cart.length;
    
    // Render Items
    cartItemsContainer.innerHTML = cart.length === 0 
        ? '<p style="text-align:center; padding: 2rem;">Tu carrito está vacío.</p>'
        : cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h5>${item.title}</h5>
                    <p>$${item.price}</p>
                    <button class="remove-item" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            </div>
        `).join('');
    
    // Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = `$${total}`;
    
    // Botón checkout
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
}

// 3. UI Control
function openSidebar() {
    cartSidebar.classList.add('active');
    cartOverlay.style.display = 'block';
}

function closeSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.style.display = 'none';
}

// --- EVENT LISTENERS ---

cartBtn.addEventListener('click', openSidebar);
closeCart.addEventListener('click', closeSidebar);
cartOverlay.addEventListener('click', closeSidebar);

checkoutBtn.addEventListener('click', () => {
    closeSidebar();
    orderModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// 4. Envío de Formulario
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        items: cart.map(item => `${item.title} ($${item.price})`).join(', '),
        total: totalPriceElement.textContent
    };

    // Simulación de envío exitoso
    console.log("Pedido recibido:", formData);
    
    alert(`¡Gracias ${formData.name}! Hemos recibido tu pedido por: ${formData.items}. Nos pondremos en contacto contigo pronto.`);
    
    // Limpiar carrito
    cart = [];
    updateCart();
    orderModal.classList.remove('active');
    orderForm.reset();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    updateCart();
});
