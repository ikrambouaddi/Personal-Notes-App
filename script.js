
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