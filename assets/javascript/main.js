// document.addEventListener("DOMContentLoaded", function () {
//     const productsList = document.getElementById("productsList");
//     const loadMoreBtn = document.querySelector(".btn-load-more");
//     const itemsPerLoad = 6;
//     let visibleItems = itemsPerLoad;

//     fetch("./assets/data/product.json")
//         .then(res => res.json())
//         .then(products => {
//             products.forEach(p => {
//                 const li = document.createElement("li");
//                 li.className = "new-products-item";
//                 li.dataset.id = p.id; 
//                 li.innerHTML = `
//                     <div class="item-box">
//                         <img src="${p.image}" alt="${p.name}">
//                         <p class="name-products">${p.name}</p>
//                         <p class="text-decoretion">${p.oldPrice}</p>
//                         <p class="add-color">${p.newPrice}</p>
//                     </div>
//                     <div class="logo-favourite">
//                         <p>Giảm ${p.discount}</p>
//                     </div>
//                     <div class="products-item-text-contact">
//                         <p>Liên hệ</p>
//                     </div>
//                 `;
//                 productsList.appendChild(li);
//             });

//             const allItems = document.querySelectorAll(".new-products-item");

//             function showItems() {
//                 allItems.forEach((item, index) => {
//                     index < visibleItems ? item.classList.remove("hide") : item.classList.add("hide");
//                 });

//                 if (visibleItems >= allItems.length) {
//                     loadMoreBtn.classList.add("hidden");
//                     loadMoreBtn.textContent = "Đã hiển thị tất cả";
//                 } else {
//                     loadMoreBtn.classList.remove("hidden");
//                     loadMoreBtn.textContent = "Xem Thêm";
//                 }
//             }

//             showItems();

//             loadMoreBtn.addEventListener("click", () => {
//                 visibleItems += itemsPerLoad;
//                 showItems();
//             });
//         });

//     // Click vào sản phẩm → chuyển trang chi tiết theo ID
//     document.addEventListener("click", function (e) {
//         const item = e.target.closest(".new-products-item");
//         if (!item) return;

//         const productId = item.dataset.id;
//         if (productId) {
//             window.location.href = `product.html?id=${productId}`;
//         }
//     });
// });
document.querySelector('.header-icon-avatar').addEventListener('click',()=>{
    alert('tương tự có cặc gì đâu ');
})
document.querySelector('.header-shopping-cart').addEventListener('click',()=>{
    alert('có cặc gì đâu mà bấm vô design đi');
})