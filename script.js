let itemCount = 0;

// Set Tanggal Otomatis ke hari ini
document.getElementById('tanggal').valueAsDate = new Date();

function addItem() {
    itemCount++;
    const container = document.getElementById('order-items');
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
        <input type="text" class="nama-brg" placeholder="Nama Barang">
        <input type="number" class="qty" placeholder="0" oninput="calculate()">
        <input type="text" class="kemasan" placeholder="PCS/ZAK">
        <input type="number" class="harga" placeholder="Harga" oninput="calculate()">
    `;
    container.appendChild(row);
}

function calculate() {
    let totalQty = 0;
    let grandTotal = 0;
    
    const rows = document.querySelectorAll('.item-row:not(.header-row)');
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const harga = parseFloat(row.querySelector('.harga').value) || 0;
        totalQty += qty;
        grandTotal += (qty * harga);
    });

    document.getElementById('total-item').innerText = totalQty;
    document.getElementById('grand-total').innerText = grandTotal.toLocaleString('id-ID');
}

function generateReport(mode) {
    const supplier = document.getElementById('supplier').value.toUpperCase();
    const tanggal = document.getElementById('tanggal').value;
    const totalItem = document.getElementById('total-item').innerText;
    const grandTotal = document.getElementById('grand-total').innerText;

    let rincianBarang = "";
    let estimasiAnggaran = "";
    const rows = document.querySelectorAll('.item-row:not(.header-row)');

    rows.forEach((row, index) => {
        const nama = row.querySelector('.nama-brg').value.toUpperCase();
        const qty = row.querySelector('.qty').value;
        const kemasan = row.querySelector('.kemasan').value.toUpperCase();
        const harga = parseFloat(row.querySelector('.harga').value) || 0;
        const subtotal = (parseFloat(qty) * harga) || 0;

        if(nama) {
            // Bagian Rincian
            rincianBarang += `${index + 1}. ${qty} ${kemasan} ${nama}\n`;
            // Bagian Estimasi
            estimasiAnggaran += `${index + 1}. ${qty} ${kemasan} ${nama} |= Rp ${harga.toLocaleString('id-ID')} x ${qty} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
        }
    });

    let message = `*MINIMARKET BANGUNAN PILAR*\n`;
    message += `*Jl. Sunan Kudus, Gatak, Rukeman, Tamantirto, Bantul, DIY*\n`;
    message += `*==============================*\n\n`;
    message += `*PENGAJUAN ORDER BARANG DAGANGAN*\n\n`;
    message += `*Nama Supplier :* ${supplier}\n`;
    message += `*Tanggal :* ${tanggal}\n\n`;
    message += `*Rincian Barang:*\n\n${rincianBarang}\n`;
    message += `*Estimasi Anggaran:*\n\n${estimasiAnggaran}\n`;
    message += `*Grand Total Item:* ${totalItem} pcs\n`;
    message += `*Grand Total Nilai Order:* Rp ${grandTotal}\n\n`;
    message += `Mengajukan,\n\n*Indra*`;

    if (mode === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        navigator.clipboard.writeText(message).then(() => {
            alert("Laporan berhasil disalin! Silakan tempel (paste) di WhatsApp.");
        });
    }
}

// Tambah baris awal
window.onload = () => { for(let i=0; i<3; i++) addItem(); };
