document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.body.innerHTML = "<h1>Không tìm thấy sản phẩm!</h1>";
        return;
    }

    fetch("./assets/data/product.json")
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (!product) {
                document.body.innerHTML = "<h1>Sản phẩm không tồn tại!</h1>";
                return;
            }

            // === CẬP NHẬT TIÊU ĐỀ & GIÁ ===
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = product.newPrice;
            document.getElementById("product-old-price").textContent = product.oldPrice;
            document.getElementById("product-image").src = product.image;

            // === THUMBNAIL ===
            const thumbnailContainer = document.querySelector(".thumbnail-list");
            thumbnailContainer.innerHTML = ""; // xóa cũ
            product.gallery.forEach((imgSrc, index) => {
                const div = document.createElement("div");
                div.className = "thumbnail-item" + (index === 0 ? " active" : "");
                div.innerHTML = `<img src="${imgSrc}" alt="Thumbnail">`;
                div.onclick = () => {
                    document.getElementById("product-image").src = imgSrc;
                    document.querySelectorAll(".thumbnail-item").forEach(t => t.classList.remove("active"));
                    div.classList.add("active");
                };
                thumbnailContainer.appendChild(div);
            });

            // === MÔ TẢ + TÍNH NĂNG – CHỈ CHÈN 1 LẦN DUY NHẤT ===
            const descContainer = document.querySelector(".product-description");
            descContainer.innerHTML = ""; // quan trọng: XÓA SẠCH TRƯỚC KHI GHI ĐÈ

            descContainer.innerHTML = `
                <div class="description-content">
                    <h3>Mô tả sản phẩm</h3>
                    <p>${product.description || "Đang cập nhật mô tả..."}</p>
                    
                    <h3 style="margin-top: 30px;">Tính năng nổi bật</h3>
                    <ul style="line-height: 2; color: #444;">
                        ${product.specifications && product.specifications.length > 0
                            ? product.specifications.map(spec => `<li>${spec}</li>`).join("")
                            : "<li>Đang cập nhật tính năng...</li>"}
                    </ul>
                </div>
            `;

            // === NÚT LIÊN HỆ MUA – TRUYỀN ĐÚNG ID ===
            const buyNowBtn = document.getElementById("buyNowBtn");
            if (buyNowBtn) {
                buyNowBtn.addEventListener("click", function () {
                    window.location.href = `contact.html?id=${productId}`;
                });
            }
        })
        .catch(err => {
            console.error("Lỗi load sản phẩm:", err);
            document.body.innerHTML = "<h1>Đã có lỗi xảy ra, vui lòng thử lại sau!</h1>";
        });
});