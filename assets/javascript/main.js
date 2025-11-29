const getSee = document.querySelector('.new-products-box-see-all');
const getaddDisplay = document.querySelectorAll('.add-display');
const getTextSee = document.querySelector('.js-gettext');
getSee.addEventListener('click', ()=>{
    getaddDisplay.forEach(e=>{
        e.classList.add('off-display');
        getTextSee.textContent = 'Xem Tất Cả';
        
    })
    getTextSee.addEventListener('click',() =>{
            alert('còn cặc gì đâu mà xem design thêm đi thg lol')
        })
})
document.addEventListener("click", function(e) {
    const item = e.target.closest(".new-products-item");
    if (!item) return;

    const img = item.querySelector("img").src;
    const name = item.querySelector(".name-products").textContent.trim();
    const oldPrice = item.querySelector(".text-decoretion").textContent.trim();
    const price = item.querySelector(".add-color").textContent.trim();

    const url = `product.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&oldPrice=${encodeURIComponent(oldPrice)}&image=${encodeURIComponent(img)}`;

    window.location.href = url;
});

