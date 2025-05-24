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
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("cases");
  const [user, setUser] = useState(null);
  const [showCaseModal, setShowCaseModal] = useState(false);

  useEffect(() => {
    if (window.Telegram.WebApp.initDataUnsafe?.user) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
    window.Telegram.WebApp.expand();
  }, []);

  const cases = [
    { name: "Free Case", price: 0 },
    { name: "Red Ring", price: 1.5 },
    { name: "Heart Locket", price: 0.5 },
    { name: "TON Balance", price: 1 },
    { name: "Pepe", price: 0.3 },
    { name: "Golden TON", price: 3 },
  ];

<script>
  function openCase(name) {
    document.getElementById('caseTitle').textContent = name;
    document.getElementById('caseModal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('caseModal').classList.add('hidden');
  }

  // Telegram WebApp
  window.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
      const user = Telegram.WebApp.initDataUnsafe.user;
      const avatar = document.getElementById("avatar");
      if (user.photo_url) {
        avatar.src = user.photo_url;
      } else {
        avatar.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.first_name || "User");
      }
    }
  });
</script>

