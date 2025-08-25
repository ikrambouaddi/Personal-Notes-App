
/* ---------- Notes Array ---------- */
let notes = JSON.parse(localStorage.getItem('notes')) || [];

/* ---------- DOM Elements ---------- */
const addBtn = document.getElementById('addBtn');
const notesGrid = document.getElementById('notesGrid');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const tagsInput = document.getElementById('tags');
const colorInput = document.getElementById('color');
const pinnedInput = document.getElementById('pinned');
const searchInput = document.getElementById('search');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const themeBtn = document.getElementById('themeBtn');

/* ---------- Editor Elements ---------- */
const editor = document.getElementById('editor');
const e_title = document.getElementById('e_title');
const e_content = document.getElementById('e_content');
const e_tags = document.getElementById('e_tags');
const e_color = document.getElementById('e_color');
const e_pinned = document.getElementById('e_pinned');
const saveEdit = document.getElementById('saveEdit');
const closeEditor = document.getElementById('closeEditor');

let editIndex = null;

/* ---------- Functions ---------- */

// Render Notes
function renderNotes(filter='') {
  notesGrid.innerHTML = '';
  // Sort pinned notes first
  const sorted = [...notes].sort((a,b)=> b.pinned - a.pinned);
  
  sorted.forEach((note, index) => {
    // Filter by search
    const searchStr = note.title + note.content + note.tags.join(' ');
    if (!searchStr.toLowerCase().includes(filter.toLowerCase())) return;

    const card = document.createElement('div');
    card.className = 'note-card';
    card.style.backgroundColor = note.color;
    
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="tags">${note.tags.map(tag=>`<span class="tag">${tag}</span>`).join('')}</div>
      <div style="margin-top:6px;">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;

    // Edit
    card.querySelector('.editBtn').onclick = () => openEditor(index);
    // Delete
    card.querySelector('.deleteBtn').onclick = () => deleteNote(index);

    notesGrid.appendChild(card);
  });
}

// Add Note
addBtn.onclick = () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value.split(',').map(t=>t.trim()).filter(t=>t);
  const color = colorInput.value;
  const pinned = pinnedInput.checked;

  if (!title && !content) return alert('Please write something!');

  notes.push({title, content, tags, color, pinned});
  saveNotes();
  renderNotes();
  titleInput.value = contentInput.value = tagsInput.value = '';
  pinnedInput.checked = false;
  colorInput.value = '#7c5cff';
}

// Delete Note
function deleteNote(index) {
  if(confirm('Delete this note?')) {
    notes.splice(index,1);
    saveNotes();
    renderNotes(searchInput.value);
  }
}

// Open Editor
function openEditor(index) {
  editIndex = index;
  const note = notes[index];
  e_title.value = note.title;
  e_content.value = note.content;
  e_tags.value = note.tags.join(', ');
  e_color.value = note.color;
  e_pinned.checked = note.pinned;
  editor.showModal();
}

// Save Edit
saveEdit.onclick = () => {
  const note = notes[editIndex];
  note.title = e_title.value.trim();
  note.content = e_content.value.trim();
  note.tags = e_tags.value.split(',').map(t=>t.trim()).filter(t=>t);
  note.color = e_color.value;
  note.pinned = e_pinned.checked;
  saveNotes();
  renderNotes(searchInput.value);
  editor.close();
}

// Close Editor
closeEditor.onclick = () => editor.close();

// Search Notes
searchInput.oninput = () => renderNotes(searchInput.value);

// Export Notes
exportBtn.onclick = () => {
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.json';
  a.click();
}

// Import Notes
importFile.onchange = (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if(Array.isArray(imported)) {
        notes = imported;
        saveNotes();
        renderNotes();
      } else alert('Invalid file format!');
    } catch(err) {
      alert('Error reading file');
    }
  }
  reader.readAsText(file);
}

// Theme Toggle
let dark = true;
themeBtn.onclick = () => {
  dark = !dark;
  if(dark) document.body.style.backgroundColor = '#1e1f23';
  else document.body.style.backgroundColor = '#f5f5f5';
}

// Save to LocalStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

/* ---------- Init ---------- */
renderNotes();
