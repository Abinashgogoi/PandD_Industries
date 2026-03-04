document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');

    // Fail silently if productGrid is missing or the global products array is not loaded
    if (!productGrid || typeof products === 'undefined') {
        return;
    }

    /**
     * Renders a list of products into the productGrid element.
     * @param {Array} productList - Array of product objects to render.
     */
    const renderProducts = (productList) => {
        // Clear the existing grid content
        productGrid.innerHTML = '';

        if (!productList || productList.length === 0) {
            productGrid.innerHTML = '<p class="no-products-message">No products found.</p>';
            return;
        }

        productList.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Extract the first image or fallback to an empty string
            const imageUrl = (product.images && product.images.length > 0) ? product.images[0] : '';

            // Generate badges HTML if they exist
            let badgesHtml = '';
            if (product.badges && product.badges.length > 0) {
                badgesHtml = '<div class="product-badges">' +
                    product.badges.map(badge => `<span class="badge">${badge}</span>`).join('') +
                    '</div>';
            }

            // Construct WhatsApp link with pre-filled message
            const waMessage = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share price and details.`);
            const waLink = `https://wa.me/?text=${waMessage}`;

            // Construct the inner HTML of the product card
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${product.name}" class="product-image" loading="lazy">
                    ${badgesHtml}
                    <span class="product-category-label">${product.category || ''}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name || ''}</h3>
                    <p class="product-short-desc">${product.shortDesc || ''}</p>
                    <div class="product-price-label">${product.priceLabel || ''}</div>
                    
                    <div class="product-actions">
                        <a href="products.html?id=${product.id}" class="btn view-details-btn">View Details</a>
                        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn whatsapp-btn">WhatsApp</a>
                    </div>
                </div>
            `;

            productGrid.appendChild(card);
        });
    };

    // Initial render of all products
    renderProducts(products);

    // Initialize simple search if the input element exists on the page
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Filter products by name
            const filteredProducts = products.filter(product => 
                product.name && product.name.toLowerCase().includes(searchTerm)
            );
            
            // Re-render the grid with the filtered results
            renderProducts(filteredProducts);
        });
    }
});