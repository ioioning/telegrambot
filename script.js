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

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="text-xl font-semibold">Balance: 0.00 TON</div>
        {user && (
          <img
            src={user.photo_url}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {activeTab === "cases" && (
          <div className="grid grid-cols-2 gap-4">
            {cases.map((c, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-200"
                onClick={() => setShowCaseModal(true)}
              >
                <div className="h-20 mb-2 rounded bg-gray-300" />
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.price} 💎</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="text-center mt-10 text-lg">Profile section</div>
        )}
      </div>

      {/* Case Modal */}
      {showCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-xl p-4 relative">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => setShowCaseModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Bear</h2>
            <div className="flex overflow-x-auto space-x-2 mb-4">
              {[6.77, 7.1, 6.9].map((price, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-300 flex items-center justify-center"
                >
                  {price} 💎
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mb-4">
              <button className="px-4 py-2 rounded bg-black text-white">real</button>
              <button className="px-4 py-2 rounded bg-gray-200 text-black">demo</button>
            </div>
            <div className="text-center text-gray-600 mb-2">Not enough balance</div>
            <button className="w-full bg-blue-600 text-white py-2 rounded mb-4">Deposit</button>
            <div className="grid grid-cols-3 gap-2">
              {[1359.55, 255.75, 153.34, 57.66, 50.21, 47.23, 21.33, 18.67, 16.91].map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-gray-200 h-20 flex items-center justify-center"
                >
                  {val} 💎
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white flex justify-around p-2 rounded-t-xl">
        <button
          className={`flex flex-col items-center ${
            activeTab === "cases" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setActiveTab("cases")}
        >
          <span>📦</span>
          <span className="text-sm">Cases</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "profile" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <span>👤</span>
          <span className="text-sm">Profile</span>
        </button>
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

