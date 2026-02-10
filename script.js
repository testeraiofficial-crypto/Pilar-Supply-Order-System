let itemCount = 0;

function addItem() {
    itemCount++;
    const container = document.getElementById('order-items');
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
        <input type="text" class="nama-brg" placeholder="Barang ${itemCount}">
        <input type="number" class="qty" placeholder="0" oninput="calculate()">
        <input type="text" class="kemasan" placeholder="Zak/Pcs">
        <input type="number" class="harga" placeholder="0" oninput="calculate()">
    `;
    container.appendChild(row);
}

function calculate() {
    let totalPcs = 0;
    let grandTotal = 0;
    
    const rows = document.querySelectorAll('.item-row:not(.header-row)');
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const harga = parseFloat(row.querySelector('.harga').value) || 0;
        
        totalPcs += qty;
        grandTotal += (qty * harga);
    });

    document.getElementById('total-item').innerText = totalPcs;
    document.getElementById('grand-total').innerText = grandTotal.toLocaleString('id-ID');
}

function sendWhatsApp() {
    const supplier = document.getElementById('supplier').value;
    const tanggal = document.getElementById('tanggal').value;
    const totalItem = document.getElementById('total-item').innerText;
    const grandTotal = document.getElementById('grand-total').innerText;

    let message = `*MINIMARKET BANGUNAN PILAR*\n`;
    message += `Jl. Sunan Kudus, Gatak, Rukeman, Tamantirto, Bantul, DIY\n`;
    message += `==============================\n\n`;
    message += `*PENGAJUAN ORDER BARANG DAGANGAN*\n\n`;
    message += `Nama Supplier : ${supplier}\n`;
    message += `Tanggal : ${tanggal}\n\n`;
    message += `*Rincian Order:*\n`;

    const rows = document.querySelectorAll('.item-row:not(.header-row)');
    rows.forEach((row, index) => {
        const nama = row.querySelector('.nama-brg').value;
        const qty = row.querySelector('.qty').value;
        const kemasan = row.querySelector('.kemasan').value;
        const harga = row.querySelector('.harga').value;
        const subtotal = (parseFloat(qty) * parseFloat(harga)) || 0;

        if(nama) {
            message += `${index + 1}. ${nama} | ${qty} ${kemasan} | Rp${parseFloat(harga).toLocaleString('id-ID')} | Sub: Rp${subtotal.toLocaleString('id-ID')}\n`;
        }
    });

    message += `\n*Grand Total Item:* ${totalItem} pcs\n`;
    message += `*Grand Total Nilai Order:* Rp ${grandTotal}\n\n`;
    message += `Mengajukan,\n\n*Indra*\n`;
    message += `_Created via Pilar Order System by Aquarius.id_`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
}

// Tambah baris pertama secara otomatis saat load
window.onload = addItem;
