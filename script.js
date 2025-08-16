const API_URL = "https://dienst-app.onrender.com"; // dein Backend

const form = document.getElementById("shift-form");
const tableBody = document.getElementById("shift-table-body");

// Daten laden
async function loadShifts() {
  const res = await fetch(`${API_URL}/shifts`);
  const shifts = await res.json();
  renderTable(shifts);
}

// Tabelle rendern
function renderTable(shifts) {
  tableBody.innerHTML = "";
  shifts.forEach((shift) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${shift.name}</td>
      <td>${shift.date}</td>
      <td>${shift.shift}</td>
      <td>
        <button class="edit" onclick="editShift('${shift.id}')">✏️ Bearbeiten</button>
        <button class="delete" onclick="deleteShift('${shift.id}')">🗑️ Löschen</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Neue Schicht hinzufügen
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newShift = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    shift: document.getElementById("shift").value,
  };

  await fetch(`${API_URL}/shifts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShift),
  });

  form.reset();
  loadShifts();
});

// Schicht löschen
async function deleteShift(id) {
  await fetch(`${API_URL}/shifts/${id}`, { method: "DELETE" });
  loadShifts();
}

// Schicht bearbeiten (vereinfachte Version)
async function editShift(id) {
  const newShiftName = prompt("Neuer Name?");
  if (!newShiftName) return;

  await fetch(`${API_URL}/shifts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newShiftName }),
  });

  loadShifts();
}

// Initial laden
loadShifts();
