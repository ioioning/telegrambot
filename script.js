async function sendMessage() {
  const input = document.getElementById('input');
  const chat = document.getElementById('chat');

  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<div><strong>Ти:</strong> ${message}</div>`;
  input.value = '';

  const response = await fetch('/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  chat.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

