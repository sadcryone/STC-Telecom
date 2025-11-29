document.addEventListener('DOMContentLoaded', function(){
  // Lấy product info từ phần preview
  const imgEl = document.getElementById('productImagePreview');
  const nameEl = document.getElementById('productNamePreview');
  const priceEl = document.getElementById('productPricePreview');

  const productImage = imgEl ? imgEl.src : '';
  const productName = nameEl ? nameEl.innerText.trim() : '';
  const productPrice = priceEl ? priceEl.innerText.replace(/[^\d.,]/g,'').trim() : '';

  // Gán vào hidden inputs (sẽ gửi kèm)
  document.getElementById('productImage').value = productImage;
  document.getElementById('productName').value = productName;
  document.getElementById('productPrice').value = productPrice;

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successBox = document.getElementById('msg-success');
  const errorBox = document.getElementById('msg-error');

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Honeypot check (nếu bot điền thì chặn)
    if (document.getElementById('botcheck').value) {
      return;
    }

    submitBtn.classList.add('btn-disabled');
    submitBtn.disabled = true;
    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    // Lấy tất cả form data
    const formData = new FormData(form);

    // Bạn có thể thêm/ghi đè trường ở đây nếu muốn
    // formData.set('product_name', productName);

    // Gửi POST tới Web3Forms endpoint
    fetch(form.action, {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        successBox.style.display = 'block';
        errorBox.style.display = 'none';
        form.reset();

        // Giữ lại thông tin product trong preview (nếu muốn)
        document.getElementById('productImage').value = productImage;
        document.getElementById('productName').value = productName;
        document.getElementById('productPrice').value = productPrice;

        // Option: redirect sau 2s
        // setTimeout(()=> window.location.href = '/thankyou.html', 2000);
      } else {
        // Hiện lỗi Web3Forms trả về
        errorBox.innerText = data.message || 'Có lỗi xảy ra, vui lòng thử lại.';
        errorBox.style.display = 'block';
      }
    })
    .catch(err => {
      errorBox.innerText = 'Lỗi mạng hoặc server. Vui lòng kiểm tra kết nối.';
      errorBox.style.display = 'block';
      console.error(err);
    })
    .finally(() => {
      submitBtn.classList.remove('btn-disabled');
      submitBtn.disabled = false;
    });
  });
});
// Lấy params
const params = new URLSearchParams(window.location.search);

const name  = params.get("name");
const price = params.get("price");
const image = params.get("image");

// Chèn vào giao diện
if(name)  document.getElementById("productNamePreview").textContent = name;
if(price) document.getElementById("productPricePreview").textContent = "Giá: " + price;
if(image) document.getElementById("productImagePreview").src = image;

// Gán vào hidden inputs của form (để gửi email)
document.getElementById("productName").value  = name || "";
document.getElementById("productPrice").value = price || "";
document.getElementById("productImage").value = image || "";
// Lấy toàn bộ params hiện tại
const paramss = window.location.search;

// Tạo lại link đầy đủ quay về product.html
document.getElementById("backToProduct").href = "product.html" + paramss;
