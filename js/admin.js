const API = "https://edible-farms-fullstack.onrender.com";

// Simple password (we'll secure later)
const ADMIN_PASSWORD = "edibleadmin2025";

document.getElementById("login-btn").addEventListener("click", ()=>{
  const pass = document.getElementById("admin-pass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("admin-panel").style.display = "block";
    loadOrders();
    loadInquiries();
  } else {
    document.getElementById("login-result").textContent = "Wrong password";
  }
});

// Load orders
async function loadOrders() {
  const tbody = document.querySelector("#orders-table tbody");
  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const res = await fetch(`${API}/api/orders`);
    const data = await res.json();

    tbody.innerHTML = "";
    data.forEach(o=>{
      tbody.innerHTML += `
        <tr>
          <td>${o.name}</td>
          <td>${o.phone}</td>
          <td>${o.type}</td>
          <td>${o.qty}</td>
          <td>${o.address}</td>
        </tr>
      `;
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='5'>Error loading orders</td></tr>";
  }
}

// Load inquiries
async function loadInquiries() {
  const tbody = document.querySelector("#inq-table tbody");
  tbody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

  try {
    const res = await fetch(`${API}/api/inquiries`);
    const data = await res.json();

    tbody.innerHTML = "";
    data.forEach(i=>{
      tbody.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>${i.email}</td>
          <td>${i.message}</td>
        </tr>
      `;
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='3'>Error loading inquiries</td></tr>";
  }
}
