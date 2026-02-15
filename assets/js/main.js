// Product Data
const products = [
    {
        id: 1,
        name: "Pro Power Drill 20V",
        category: "tools",
        price: 24500,
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Premium Wall Paint (White)",
        category: "paints",
        price: 8500,
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "PVC Pipe 4-inch (3m)",
        category: "plumbing",
        price: 3200,
        image: "https://images.unsplash.com/photo-1581242163695-19d0acacd468?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "LED Smart Bulb 12W",
        category: "electrical",
        price: 1200,
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "Heavy Duty Hammer",
        category: "tools",
        price: 4500,
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "Adjustable Wrench Set",
        category: "tools",
        price: 6800,
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        name: "Exterior Wood Varnish",
        category: "paints",
        price: 5400,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        name: "Electrical Switch Board",
        category: "electrical",
        price: 2100,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 9,
        name: "Cement Bag 50kg",
        category: "construction",
        price: 1720,
        image: "assets/images/cement_bag.png"
    },
    {
        id: 10,
        name: "Circular Saw",
        category: "tools",
        price: 32000,
        image: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 11,
        name: "Angle Grinder",
        category: "tools",
        price: 14500,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 12,
        name: "Safety Helmet (Yellow)",
        category: "construction",
        price: 1800,
        image: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

// DOM Content Loaded Wrapper
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize Products Page specific logic
    if (document.getElementById('product-grid')) {
        loadProducts();

        // Setup Search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = products.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.category.toLowerCase().includes(term)
                );
                renderProducts(filtered);
            });
        }
    }

    // Scroll Animations (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });
});

// Load all products initially
function loadProducts() {
    renderProducts(products);
}

// Render products to the grid
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500">No products found matching your criteria.</div>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-up opacity-0 transform translate-y-4'; // Add animation classes
        // Use timeout to let the class 'visible' be added by observer if we wanted, but here we just force it for simplicity or let css handle it
        // Actually, let's just use the fade-in class defined in CSS
        card.classList.add('fade-in');

        card.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <span class="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    ${product.category}
                </span>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-lg mb-2 text-gray-800">${product.name}</h3>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-primary font-bold text-xl">Rs. ${product.price.toLocaleString()}</span>
                </div>
                <button onclick="contactForProduct('${product.name}')" class="w-full bg-secondary text-white py-2 rounded font-medium hover:bg-gray-700 transition flex justify-center items-center gap-2">
                    <i class="fa-brands fa-whatsapp"></i> Inquiry
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter products by category
function filterProducts(category) {
    // Update active button state
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-orange-100', 'text-primary', 'font-bold');
        btn.classList.add('text-gray-600');

        if (btn.dataset.category === category) {
            btn.classList.remove('text-gray-600');
            btn.classList.add('bg-orange-100', 'text-primary', 'font-bold');
        }
    });

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Contact function (Mock)
function contactForProduct(productName) {
    const message = `Halo, mama Navidu Hardware eken "${productName}" ganna kamathi.`;
    const url = `https://wa.me/94759747593?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
