# -TheTalent-Searchers-dashboard
To build a Product Dashboard application with HTML, CSS, and JavaScript (without React), you can achieve the same functionality using a more traditional approach by utilizing vanilla JavaScript to fetch, filter, sort, paginate, and display the product data. Here's how you can implement each requirement.

Full Application Code in HTML, CSS, and JavaScript
1. HTML Structure (index.html)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="container">
        <h1>Product Dashboard</h1>

        <!-- Search Bar -->
        <input type="text" id="searchBar" placeholder="Search products..." />

        <!-- Filters -->
        <div class="filters">
            <label for="priceFilter">Filter by Price: </label>
            <select id="priceFilter">
                <option value="all">All</option>
                <option value="0-5000">0-5000</option>
                <option value="5000-10000">5000-10000</option>
                <option value="10000-20000">10000-20000</option>
                <option value="20000+">20000+</option>
            </select>

            <label for="popularityFilter">Filter by Popularity: </label>
            <select id="popularityFilter">
                <option value="all">All</option>
                <option value="0-10000">0-10000</option>
                <option value="10000-30000">10000-30000</option>
                <option value="30000-50000">30000-50000</option>
                <option value="50000+">50000+</option>
            </select>
        </div>

        <!-- Sorting -->
        <div class="sorting">
            <label for="sortBy">Sort by: </label>
            <select id="sortBy">
                <option value="price-asc">Price (Ascending)</option>
                <option value="price-desc">Price (Descending)</option>
                <option value="popularity-asc">Popularity (Ascending)</option>
                <option value="popularity-desc">Popularity (Descending)</option>
            </select>
        </div>

        <!-- Product List -->
        <table id="productTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Popularity</th>
                </tr>
            </thead>
            <tbody>
                <!-- Products will be dynamically inserted here -->
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="pagination">
            <button id="prevPage">Previous</button>
            <span id="pageInfo">Page 1</span>
            <button id="nextPage">Next</button>
        </div>

        <!-- Modal for Product Details -->
        <div id="productModal" class="modal">
            <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <h2 id="modalTitle"></h2>
                <p><strong>Price: </strong><span id="modalPrice"></span></p>
                <p><strong>Popularity: </strong><span id="modalPopularity"></span></p>
                <p><strong>Description: </strong><span id="modalDescription"></span></p>
            </div>
        </div>

    </div>

    <script src="app.js"></script>
</body>
</html>
2. CSS Styles (styles.css)
css
Copy code
body {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

h1 {
    text-align: center;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
}

.filters, .sorting {
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

table th {
    background-color: #f2f2f2;
}

.pagination {
    text-align: center;
    margin-top: 20px;
}

button {
    padding: 10px 15px;
    font-size: 16px;
}

.modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
}

.modal-content {
    padding: 20px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
}
3. JavaScript Code (app.js)
javascript
Copy code
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
Explanation of Key Parts
Data Fetching:

We use the fetch() function to get the data from the API.
If the fetch fails, we show an error message using alert().
Search:

The search functionality filters products based on the title entered in the search bar.
Filters:

We provide dropdown filters for price and popularity ranges. When a filter is applied, the products are re-filtered and rendered.
Sorting:

Sorting is applied based on the selected field (price or popularity) and order (ascending or descending).
Pagination:

Products are displayed in pages of 20 items each, with controls for navigating between pages.
Product Details Modal:

When a product row is clicked, a modal opens with the detailed information for that product.
Setup Instructions
Create three files: index.html, styles.css, and app.js.
Copy the respective code into these files.
Open index.html in a browser to run the application.
This solution provides a fully functional Product Dashboard built with HTML, CSS, and JavaScript.
