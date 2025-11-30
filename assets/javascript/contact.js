document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Chỉ cần id là đủ!

    // === 1. Cập nhật link "Sản phẩm" quay lại đúng sản phẩm cũ ===
    const backLink = document.getElementById('backToProduct');
    if (productId) {
        backLink.href = `product.html?id=${productId}`;
        backLink.textContent = "Sản Phẩm /";
    } else {
        backLink.href = "index.html";
        backLink.textContent = "Trang Chủ /";
    }

    // === 2. Nếu có ID → fetch lại sản phẩm từ JSON để hiển thị chính xác ===
    if (productId) {
        fetch("./assets/data/product.json")
            .then(res => res.json())
            .then(products => {
                const product = products.find(p => p.id == productId);
                if (product) {
                    document.getElementById('productImagePreview').src = product.image;
                    document.getElementById('productNamePreview').textContent = product.name;
                    document.getElementById('productPricePreview').textContent = 'Giá: ' + product.newPrice;

                    // Đưa vào hidden inputs để gửi email
                    document.getElementById('productName').value = product.name;
                    document.getElementById('productPrice').value = product.newPrice;
                    document.getElementById('productImage').value = product.image;
                }
            })
            .catch(err => console.error("Lỗi load sản phẩm ở contact:", err));
    }

    // === 3. XỬ LÝ FORM GỬI EMAIL (giữ nguyên như cũ của bạn, siêu ổn định) ===
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successBox = document.getElementById('msg-success');
    const errorBox = document.getElementById('msg-error');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Chống bot
        if (document.getElementById('botcheck').value) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Đang gửi...";
        successBox.style.display = 'none';
        errorBox.style.display = 'none';

        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                successBox.innerHTML = "Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất!";
                successBox.style.display = 'block';
                form.reset();
            } else {
                errorBox.innerHTML = data.message || "Có lỗi xảy ra!";
                errorBox.style.display = 'block';
            }
        })
        .catch(err => {
            errorBox.innerHTML = "Lỗi kết nối, vui lòng thử lại!";
            errorBox.style.display = 'block';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Gửi tin nhắn";
        });
    });
});