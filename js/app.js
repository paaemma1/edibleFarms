const API = window.EDIBLE_FARMS_CONFIG && window.EDIBLE_FARMS_CONFIG.API_BASE ? window.EDIBLE_FARMS_CONFIG.API_BASE : "https://edible-farms-fullstack.onrender.com";

// Utility: show result message
function showResult(elId, msg, ok=true) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok ? "green" : "crimson";
  setTimeout(()=> el.textContent = "", 7000);
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const payload = {
      name: document.getElementById('c-name').value,
      email: document.getElementById('c-email').value,
      message: document.getElementById('c-message').value
    };
    try {
      const res = await fetch(`${API}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) showResult('contact-result','Message sent — we will contact you.');
      else showResult('contact-result','Failed to send message',false);
    } catch(err) {
      console.error(err);
      showResult('contact-result','Network error — try again',false);
    }
  });
}

// Order form
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const payload = {
      name: document.getElementById('o-name').value,
      phone: document.getElementById('o-phone').value,
      type: document.getElementById('o-type').value,
      qty: Number(document.getElementById('o-qty').value),
      address: document.getElementById('o-address').value
    };
    try {
      const res = await fetch(`${API}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showResult('order-result','Order received — we will call to confirm.');
        orderForm.reset();
        document.getElementById('o-phone').value = '+233546600063';
        document.getElementById('o-type').value = 'A';
      } else showResult('order-result','Failed to submit order',false);
    } catch(err) {
      console.error(err);
      showResult('order-result','Network error — try again',false);
    }
  });
}

// Prefill order "A" quick link
const orderNow = document.getElementById('order-now');
if (orderNow) {
  orderNow.addEventListener('click', (e)=>{
    e.preventDefault();
    const typ = document.getElementById('o-type');
    if (typ) typ.value = 'A';
    window.location.hash = '#order';
  });
}
