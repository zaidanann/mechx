function formatCurrency(value) {
    return 'Rp' + value.toLocaleString('id-ID');
}

function updateCartSummary() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    let totalQuantity = 0;
    let totalPrice = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const item = checkbox.closest('.cart-item');
            const priceText = item.querySelector('.price').textContent.replace('Rp', '').replace(',', '');
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            const price = parseFloat(priceText);

            totalQuantity += quantity;
            totalPrice += price * quantity;
        }
    });

    document.querySelector('.total-price').textContent = `Total (${totalQuantity} produk): ${formatCurrency(totalPrice)}`;
}

document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCartSummary);
});

document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('input', updateCartSummary);
});

document.getElementById('select-all').addEventListener('change', function () {
    const allChecked = this.checked;
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.checked = allChecked;
    });
    updateCartSummary();
});
