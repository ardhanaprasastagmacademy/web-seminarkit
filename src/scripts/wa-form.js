// WhatsApp Contact & Order Form Handler
export function initWaForm() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const companyInput = document.getElementById('form-company');
  const productSelect = document.getElementById('form-product');
  const qtyInput = document.getElementById('form-qty');
  const dateInput = document.getElementById('form-date');
  const notesInput = document.getElementById('form-notes');

  function clearErrors() {
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.classList.remove('has-error');
    });
    form.querySelectorAll('.form-error').forEach(el => {
      el.classList.remove('is-visible');
      el.textContent = '';
    });
  }

  function showError(inputEl, message) {
    inputEl.classList.add('has-error');
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Nama
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      showError(nameInput, 'Nama pemesan wajib diisi.');
      isValid = false;
    }

    // Validate Produk
    const productVal = productSelect.value.trim();
    if (!productVal) {
      showError(productSelect, 'Silakan pilih produk yang diminati.');
      isValid = false;
    }

    // Validate Jumlah
    const qtyVal = qtyInput.value.trim();
    if (!qtyVal) {
      showError(qtyInput, 'Jumlah pesanan wajib diisi.');
      isValid = false;
    } else if (!/^\d+$/.test(qtyVal) || parseInt(qtyVal, 10) <= 0) {
      showError(qtyInput, 'Jumlah harus berupa angka positif.');
      isValid = false;
    }

    if (!isValid) {
      // Focus first error
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      return;
    }

    const companyVal = companyInput ? companyInput.value.trim() : '';
    const dateVal = dateInput ? dateInput.value.trim() : '';
    const notesVal = notesInput ? notesInput.value.trim() : '';

    const messageLines = [
      'Halo Seminarkit, saya ingin memesan souvenir kantor.',
      `Nama: ${nameVal}`,
      `Perusahaan/Instansi: ${companyVal || '-'}`,
      `Produk: ${productVal}`,
      `Jumlah: ${qtyVal}`,
      `Dibutuhkan tanggal: ${dateVal || '-'}`,
      `Catatan: ${notesVal || '-'}`
    ];

    const message = messageLines.join('\n');
    const waUrl = `https://wa.me/6282232730246?text=${encodeURIComponent(message)}`;

    // Optional event tracking hook
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_whatsapp', {
        event_category: 'conversion',
        event_label: productVal,
        source: 'form-kontak'
      });
    }

    // Open WhatsApp
    window.location.href = waUrl;
  });
}

