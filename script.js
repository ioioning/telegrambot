const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById("avatar").src = tg.initDataUnsafe.user.photo_url || "https://via.placeholder.com/36";

function showCases() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Cases</h2>
    <p>Here will be your case list.</p>
  `;
}

function showProfile() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Profile</h2>
    <p>User ID: ${tg.initDataUnsafe.user.id}</p>
    <p>Username: @${tg.initDataUnsafe.user.username || "unknown"}</p>
  `;
}

// Початково показати Cases
showCases();

