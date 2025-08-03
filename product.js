const products = [
    { name: "Smartphone", category: "Electronics", price: 299, rating: 4.5, image: "1.jpeg" },
    { name: "Laptop", category: "Electronics", price: 899, rating: 4.7, image: "https://via.placeholder.com/250x200?text=Laptop" },
    { name: "T-Shirt", category: "Clothing", price: 25, rating: 4.2, image: "https://via.placeholder.com/250x200?text=T-Shirt" },
    { name: "Jeans", category: "Clothing", price: 60, rating: 4.0, image: "https://via.placeholder.com/250x200?text=Jeans" },
    { name: "Novel", category: "Books", price: 15, rating: 4.8, image: "https://via.placeholder.com/250x200?text=Novel" },
    { name: "Cookbook", category: "Books", price: 30, rating: 4.4, image: "https://via.placeholder.com/250x200?text=Cookbook" }
];

const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOption = document.getElementById("sortOption");
const searchInput = document.getElementById("search");

function renderProducts(list) {
    productGrid.innerHTML = "";
    if (list.length === 0) {
        productGrid.innerHTML = "<p style='text-align:center;'>No products found.</p>";
        return;
    }
    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">$${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function applyFilters() {
    let filteredProducts = [...products];

    // Search filter
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchValue));
    }

    // Category filter
    if (categoryFilter.value) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter.value);
    }

    // Price filter
    if (priceFilter.value) {
        const [min, max] = priceFilter.value.split("-").map(Number);
        filteredProducts = filteredProducts.filter(p => {
            if (max) return p.price >= min && p.price <= max;
            return p.price >= min; // For "Over $100"
        });
    }

    // Sorting
    if (sortOption.value === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption.value === "rating-desc") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filteredProducts);
}

// Event Listeners
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
sortOption.addEventListener("change", applyFilters);

// Initial render
renderProducts(products);

