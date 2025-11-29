const params = new URLSearchParams(window.location.search);

// Lấy dữ liệu
const name = params.get("name");
const price = params.get("price");
const oldPrice = params.get("oldPrice");
const image = params.get("image");

// Gán vào giao diện
if (name) document.getElementById("product-name").textContent = name;
if (price) document.getElementById("product-price").textContent = price;
if (oldPrice) document.getElementById("product-old-price").textContent = oldPrice;
if (image) document.getElementById("product-image").src = image;
document.getElementById("buyNowBtn").addEventListener("click", function () {

    const name  = document.querySelector(".product-title").textContent.trim();
    const price = document.querySelector(".current-price").textContent.trim();
    const image = document.querySelector(".main-image").src;

    const url = `contact.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;

    window.location.href = url;
});