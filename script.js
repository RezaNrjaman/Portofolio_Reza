// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon between bars and times
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar scroll effect for shadow and padding
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        navbar.style.padding = '20px 0';
    }
});

// Form Submission handling for Google Sheets (via Apps Script)
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* 
       =========================================================
       KONFIGURASI GOOGLE SHEETS API (APPS SCRIPT)
       Untuk bisa mengirim pesan ke Spreadsheet:
       1. Buat Google Sheet baru
       2. Klik menu Ekstensi > Apps Script
       3. Paste kode untuk menangani POST request (bisa cari tutorial "HTML Form to Google Sheets")
       4. Deploy sebagai Web App dan pilih "Anyone" (Siapa saja)
       5. Copy URL Web App-nya dan paste di bawah ini:
       =========================================================
    */
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyseSNDBrWNJZT0eg0vzR4EYgcX2zlRWEzISTBJenW7kyml3wpflA_UQM_XbRvc9cQ/exec';

    // Ubah state tombol saat proses pengiriman
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Ambil semua data dari form
    const formData = new FormData(contactForm);

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Jika berhasil
            alert('Pesan berhasil dikirim ke Spreadsheet! Terima kasih.');
            contactForm.reset();
        } else {
            // Jika gagal (kemungkinan URL salah)
            console.warn("Respons Error:", await response.text());
            alert('Perhatian: Pesan gagal terkirim. Silakan periksa URL Google Apps Script di file script.js.');
        }
    } catch (error) {
        console.error('Error pengiriman form:', error);
        // Error biasanya terjadi jika URL masih dummy / tidak valid sehingga kena block CORS/Network
        alert('Gagal mengirim pesan. Pastikan Anda sudah memasukkan URL Web App Google Apps Script yang valid di script.js');
    } finally {
        // Kembalikan state tombol ke awal
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});
