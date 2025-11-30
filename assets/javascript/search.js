document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const productsList = document.getElementById("productsList");
    const newProductsSection = document.querySelector(".body-content-new-products");
    const loadMoreBtn = document.querySelector(".btn-load-more");

    let allProducts = [];
    let currentDisplayedCount = 0;           // số sản phẩm đang hiển thị
    const INITIAL_LOAD = 6;                  // lần đầu hiện 6 cái (1 hàng)
    const LOAD_MORE_COUNT = 36;              // mỗi lần bấm Xem thêm → thêm 36 cái = 6 hàng

    // ==================== LỊCH SỬ TÌM KIẾM ====================
    const HISTORY_KEY = "searchHistory";
    const MAX_HISTORY = 6;
    let searchHistory = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    const historyBox = document.createElement("div");
    historyBox.className = "search-history";
    historyBox.innerHTML = `
        <div class="history-title">Tìm kiếm gần đây</div>
        <ul id="historyList"></ul>
        <div class="history-clear" onclick="clearHistory()">Xóa tất cả</div>
    `;
    document.querySelector(".header-container-search").appendChild(historyBox);
    const historyList = historyBox.querySelector("#historyList");

    function updateHistoryUI() {
        if (searchHistory.length === 0) {
            historyBox.style.display = "none";
            return;
        }
        historyBox.style.display = "block";
        historyList.innerHTML = searchHistory.map(k => `
            <li onclick="searchFromHistory('${k.replace(/'/g, "\\'")}')">
                <i class="ti-time"></i> ${k}
            </li>
        `).join("");
    }

    window.searchFromHistory = function(k) {
        searchInput.value = k;
        performSearch();
        historyBox.style.display = "none";
    };

    window.clearHistory = function() {
        if (confirm("Xóa toàn bộ lịch sử tìm kiếm?")) {
            searchHistory = [];
            localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
            updateHistoryUI();
        }
    };

    function addToHistory(keyword) {
        if (!keyword.trim()) return;
        searchHistory = searchHistory.filter(k => k !== keyword);
        searchHistory.unshift(keyword);
        if (searchHistory.length > MAX_HISTORY) searchHistory.pop();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
        updateHistoryUI();
    }
    // ==========================================================

    // Load dữ liệu sản phẩm
    fetch("./assets/data/product.json")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(0, INITIAL_LOAD); // hiện 6 cái đầu tiên
            // KHÔNG gọi updateHistoryUI() ở đây nữa → chỉ hiện khi focus!
        });

    // Hàm hiển thị sản phẩm (từ start đến end)
    function displayProducts(start, count) {
        const fragment = document.createDocumentFragment();
        const end = Math.min(start + count, allProducts.length);

        for (let i = start; i < end; i++) {
            const p = allProducts[i];
            const li = document.createElement("li");
            li.className = "new-products-item";
            li.dataset.id = p.id;
            li.innerHTML = `
                <div class="item-box">
                    <img src="${p.image}" alt="${p.name}">
                    <p class="name-products">${p.name}</p>
                    <p class="text-decoretion">${p.oldPrice}</p>
                    <p class="add-color">${p.newPrice}</p>
                </div>
                <div class="logo-favourite"><p>Giảm ${p.discount}</p></div>
                <div class="products-item-text-contact"><p>Liên hệ</p></div>
            `;
            fragment.appendChild(li);
        }

        productsList.appendChild(fragment);
        currentDisplayedCount = end;

        // Ẩn nút Xem thêm nếu hết hàng
        if (currentDisplayedCount >= allProducts.length) {
            loadMoreBtn.classList.add("hidden");
            loadMoreBtn.textContent = "Đã hiển thị tất cả";
        } else {
            loadMoreBtn.classList.remove("hidden");
            loadMoreBtn.textContent = "Xem thêm";
        }
    }

    // Hàm tìm kiếm + lọc
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        productsList.innerHTML = ""; // xóa hết
        currentDisplayedCount = 0;

        if (query === "") {
            displayProducts(0, INITIAL_LOAD);
        } else {
            const filtered = allProducts.filter(p =>
                p.name.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                productsList.innerHTML = `
                    <div style="grid-column:1/-1;text-align:center;padding:120px 20px;font-size:1.4rem;color:#999;">
                        Không tìm thấy sản phẩm nào cho "<strong style="color:#ee4d2d;">${searchInput.value}</strong>"
                    </div>`;
                loadMoreBtn.classList.add("hidden");
            } else {
                // Khi tìm kiếm → hiện hết luôn, không cần Xem thêm
                const fragment = document.createDocumentFragment();
                filtered.forEach(p => {
                    const li = document.createElement("li");
                    li.className = "new-products-item";
                    li.dataset.id = p.id;
                    li.innerHTML = `
                        <div class="item-box">
                            <img src="${p.image}" alt="${p.name}">
                            <p class="name-products">${p.name}</p>
                            <p class="text-decoretion">${p.oldPrice}</p>
                            <p class="add-color">${p.newPrice}</p>
                        </div>
                        <div class="logo-favourite"><p>Giảm ${p.discount}</p></div>
                        <div class="products-item-text-contact"><p>Liên hệ</p></div>
                    `;
                    fragment.appendChild(li);
                });
                productsList.appendChild(fragment);
                loadMoreBtn.classList.add("hidden"); // không cho load more khi đang tìm kiếm
            }
            addToHistory(searchInput.value.trim());
        }

        newProductsSection.scrollIntoView({ behavior: "smooth" });
        historyBox.style.display = "none";
    }

    // Sự kiện tìm kiếm
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") performSearch();
    });

    // Focus → hiện lịch sử
    searchInput.addEventListener("focus", () => {
        if (searchHistory.length > 0) {
            updateHistoryUI();
        }
    });
    document.addEventListener("click", e => {
        if (!e.target.closest(".header-container-search")) {
            historyBox.style.display = "none";
        }
    });

    // ==================== NÚT XEM THÊM – THÊM 36 SẢN PHẨM MỖI LẦN ====================
    loadMoreBtn.addEventListener("click", () => {
        // Chỉ hoạt động khi KHÔNG đang tìm kiếm
        if (searchInput.value.trim() !== "") return;

        displayProducts(currentDisplayedCount, LOAD_MORE_COUNT);
    });
    // ==========================================================================

    // Click sản phẩm → sang trang chi tiết
    productsList.addEventListener("click", e => {
        const item = e.target.closest(".new-products-item");
        if (item?.dataset.id) {
            window.location.href = `product.html?id=${item.dataset.id}`;
        }
    });

    // ==================== DANH MỤC CLICK → TỰ ĐỘNG TÌM KIẾM ====================
    document.querySelectorAll(".category-menu a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const keyword = this.getAttribute("data-keyword");
            searchInput.value = keyword;
            performSearch();
        });
    });

});