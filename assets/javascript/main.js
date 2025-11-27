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

