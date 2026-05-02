// admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');
    
    const fabBtn = document.getElementById('add-product-btn');
    const modalOverlay = document.getElementById('product-modal');
    const closeBtns = document.querySelectorAll('.close-modal-btn');
    const productForm = document.getElementById('product-form');
    const tableBody = document.getElementById('inventory-table-body');
    const modalTitle = document.getElementById('modal-title');

    // Initial dummy data for the inventory table
    let products = [
        {
            id: 1,
            title: 'Ergonomic Desk Chair',
            price: 299.99,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=150&q=80',
            description: 'A comfortable chair for long hours.'
        },
        {
            id: 2,
            title: 'Mechanical Keyboard',
            price: 149.00,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=150&q=80',
            description: 'Clicky switches and RGB backlight.'
        },
        {
            id: 3,
            title: 'Ultrawide Monitor',
            price: 699.50,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&q=80',
            description: '34 inch curved display for productivity.'
        }
    ];

    let editingId = null;

    // 1. Theme Toggle Logic
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
    });

    // 2. Sidebar Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state on nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Hide all views
            viewSections.forEach(view => view.classList.remove('active'));
            
            // Show targeted view
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                document.getElementById(targetId).classList.add('active');
            }
        });
    });

    // 3. Render Inventory Table
    function renderTable() {
        tableBody.innerHTML = '';
        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img src="${product.image}" alt="${product.title}" class="product-img">
                </td>
                <td class="product-title">${product.title}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.discount > 0 ? `<span class="badge">${product.discount}% OFF</span>` : '-'}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit-btn" data-id="${product.id}" title="Edit">
                            <i data-lucide="edit-2"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${product.id}" title="Delete">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        
        // Re-initialize icons for newly added DOM elements
        lucide.createIcons();
        attachTableEvents();
    }

    // 4. Modal Open/Close Logic
    const openModal = (title = 'Add New Product') => {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        productForm.reset();
        editingId = null;
        document.getElementById('product-id').value = '';
    };

    fabBtn.addEventListener('click', () => {
        openModal();
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // 5. Form Submit (Add/Edit)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('product-title').value;
        const price = document.getElementById('product-price').value;
        const description = document.getElementById('product-description').value;
        const discount = document.getElementById('product-discount').value;
        const imageUrl = document.getElementById('product-image').value || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80'; // fallback placeholder

        if (editingId) {
            // Edit existing product
            const index = products.findIndex(p => p.id === editingId);
            if (index !== -1) {
                products[index] = { 
                    ...products[index], 
                    title, 
                    price, 
                    description, 
                    discount, 
                    image: imageUrl 
                };
            }
        } else {
            // Add new product
            const newProduct = {
                id: Date.now(),
                title,
                price,
                description,
                discount,
                image: imageUrl
            };
            products.unshift(newProduct);
        }

        renderTable();
        closeModal();
    });

    // 6. Table Actions (Edit & Delete)
    function attachTableEvents() {
        // Delete
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                products = products.filter(p => p.id !== id);
                renderTable();
            });
        });

        // Edit
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const product = products.find(p => p.id === id);
                if (product) {
                    editingId = id;
                    document.getElementById('product-id').value = id;
                    document.getElementById('product-title').value = product.title;
                    document.getElementById('product-price').value = product.price;
                    document.getElementById('product-description').value = product.description;
                    document.getElementById('product-discount').value = product.discount;
                    document.getElementById('product-image').value = product.image;
                    openModal('Edit Product');
                }
            });
        });
    }

    // Initialize the table on load
    renderTable();
});
