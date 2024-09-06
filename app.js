// Global state
let products = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 20;

// Fetch the product data
fetch('https://cdn.drcode.ai/interview-materials/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        filteredProducts = products;
        renderProducts();
    })
    .catch(() => {
        alert('Failed to fetch products');
    });

// Render the product list
function renderProducts() {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.popularity}</td>
        `;
        row.addEventListener('click', () => showProductDetails(product));
        tableBody.appendChild(row);
    });

    updatePaginationInfo();
}

// Update pagination information
function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    document.querySelector("#pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
    currentPage = 1;
    renderProducts();
});

// Filter by price
document.getElementById('priceFilter').addEventListener('change', function() {
    const [min, max] = this.value === 'all' ? [0, Infinity] : this.value.split('-').map(Number);
    filteredProducts = products.filter(product => product.price >= min && product.price <= max);
    currentPage = 1;
    renderProducts();
});

// Filter by popularity
document.getElementById('popularityFilter').addEventListener('change', function() {
    const [min, max] = this.value === 'all' ? [0, Infinity] : this.value.split('-').map(Number);
    filteredProducts = products.filter(product => product.popularity >= min && product.popularity <= max);
    currentPage = 1;
    renderProducts();
});

// Sorting functionality
document.getElementById('sortBy').addEventListener('change', function() {
    const [field, order] = this.value.split('-');
    filteredProducts.sort((a, b) => {
        if (order === 'asc') {
            return a[field] - b[field];
        } else {
            return b[field] - a[field];
        }
    });
    currentPage = 1;
    renderProducts();
});

// Pagination controls
document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
    }
});

// Show product details in a modal
function showProductDetails(product) {
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalPopularity').textContent = product.popularity;
    document.getElementById('modalDescription').textContent = product.description || 'No description available.';
    document.getElementById('productModal').style.display = 'block';
}

// Close the modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('productModal').style.display = 'none';
});
