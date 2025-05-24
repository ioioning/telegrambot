function showCases() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Cases</h2>
    <div class="cases-grid">
      ${[...Array(6)].map((_, i) => `
        <div class="case-item">
          <div class="case-title">${i === 0 ? 'Free Case' : `Case ${i + 1}`}</div>
          <div class="case-price">${i === 0 ? 'FREE' : `${(i * 0.5).toFixed(1)} `}</div>
        </div>
      `).join('')}
    </div>
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

