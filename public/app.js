const API = '/api/notes';

async function fetchNotes() {
  const res = await fetch(API);
  const notes = await res.json();

  const list = document.getElementById('notes-list');
  list.innerHTML = '';

  // Header
  const header = document.createElement('p');
  header.style.textAlign = "center";
  header.style.color = "#333";
  header.style.marginBottom = "10px";
  header.innerText = "📌 Your Notes Below:";
  list.appendChild(header);

  // Empty state
  if (!notes || notes.length === 0) {
    const msg = document.createElement('p');
    msg.style.textAlign = "center";
    msg.style.color = "#aaa";
    msg.innerText = "No notes yet. Add your first note 👇";
    list.appendChild(msg);
    return;
  }

  // Render notes
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = "note-card";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small><br/>
      <button class="delete-btn" onclick="deleteNote('${note._id}')">🗑 Delete</button>
    `;

    list.appendChild(div);
  });
}

async function addNote() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) return alert('Please fill both fields!');

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchNotes();
}

// Load on page open
fetchNotes();