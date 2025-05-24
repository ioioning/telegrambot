const tg = window.Telegram.WebApp;
tg.expand();

function updateAvatarAndBalance() {
  const avatar = document.getElementById("avatar");
  const balance = document.getElementById("balance");

  if (tg.initDataUnsafe?.user?.photo_url) {
    avatar.src = tg.initDataUnsafe.user.photo_url;
  } else {
    avatar.src = "https://via.placeholder.com/36";
  }

  balance.textContent = "0.00"; // Пізніше можна динамічно
}

function showCases() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Cases</h2>
    <div class="cases-grid">
      <div class="case-item"><div class="case-title">Free Case</div><div class="case-price">promo case</div></div>
      <div class="case-item"><div class="case-title">Red Ring</div><div class="case-price">1.5 ton</div></div>
      <div class="case-item"><div class="case-title">Heart Locket</div><div class="case-price">0.5 ton </div></div>
      <div class="case-item"><div class="case-title">TON Balance</div><div class="case-price">1 ton</div></div>
      <div class="case-item"><div class="case-title">Frog</div><div class="case-price">1 ton</div></div>
      <div class="case-item"><div class="case-title">Gold TON</div><div class="case-price">2 ton</div></div>
    </div>
  `;
}

function showProfile() {
  const user = tg.initDataUnsafe.user;
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Profile</h2>
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Username:</strong> @${user.username || "unknown"}</p>
    <p><strong>First name:</strong> ${user.first_name}</p>
    <p><strong>Last name:</strong> ${user.last_name || "-"}</p>
  `;
}

// Початкове завантаження
window.addEventListener("DOMContentLoaded", () => {
  updateAvatarAndBalance();
  showCases();
});

