// ✅ HARD-CODED, CORRECT BACKEND URL
const API = "https://edible-farms-fullstack.onrender.com";

// Utility message
function showResult(id, msg, ok = true) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok ? "green" : "crimson";
  setTimeout(() => el.textContent = "", 6000);
}

// CONTACT FORM
document.getElementById("contact-form")?.addEventListener("submit", async e => {
  e.preventDefault();

  try {
    const res = await fetch(`${API}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: c-name.value,
        email: c-email.value,
        message: c-message.value
      })
    });

    const data = await res.json();
    data.success
      ? showResult("contact-result", "Message sent successfully")
      : showResult("contact-result", "Failed to send", false);

  } catch {
    showResult("contact-result", "Network error", false);
  }
});

// ORDER FORM
document.getElementById("order-form")?.addEventListener("submit", async e => {
  e.preventDefault();

  try {
    const res = await fetch(`${API}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: o-name.value,
        phone: o-phone.value,
        type: o-type.value,
        qty: Number(o-qty.value),
        address: o-address.value
      })
    });

    const data = await res.json();
    if (data.success) {
      showResult("order-result", "Order received — we will call you");
      e.target.reset();
    } else {
      showResult("order-result", "Order failed", false);
    }

  } catch {
    showResult("order-result", "Network error", false);
  }
});

// ORDER NOW BUTTON
document.getElementById("order-now")?.addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("o-type").value = "A";
  location.hash = "#order";
});
