let students = [];
// -----------------------------
// INITIAL DATA
// -----------------------------
for (let i = 1; i <= 50; i++) {
students.push({
id: i,
name: "Student " + i,
present: false
});
}
// -----------------------------
// RENDER TABLE
// -----------------------------
function render(data) {
const table = document.getElementById("tableBody");
table.innerHTML = "";
data.forEach((s, index) => {
const row = document.createElement("tr");
row.innerHTML = `
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.present ? "Present" : "Absent"}</td>
<td>
<button onclick="deleteStudent(${index})">Delete</button>
</td>
`;
table.appendChild(row);
});
}
window.onload = () => render(students);
// -----------------------------
// ADD STUDENT
// -----------------------------
function addStudent() {
const id = document.getElementById("id").value;
const name = document.getElementById("name").value;
const present = document.getElementById("status").value === "true";
students.push({ id, name, present });
render(students);
}
// -----------------------------
// UPDATE STUDENT
// -----------------------------
function updateStudent() {
const id = document.getElementById("id").value;
const name = document.getElementById("name").value;
const present = document.getElementById("status").value === "true";
const index = students.findIndex(s => s.id == id);
if (index !== -1) {
students[index] = { id, name, present };
render(students);
// Highlight updated row
setTimeout(() => {
document.getElementById("tableBody").rows[index].classList.add("updated");
}, 50);
} else {
alert("Student not found!");
}
}
// -----------------------------
// DELETE STUDENT
// -----------------------------
function deleteStudent(index) {
students.splice(index, 1);
render(students);
}
// -----------------------------
// DOM UPDATE (Slow)
// -----------------------------
function updateDOM() {
console.time("DOM Update");
const table = document.getElementById("tableBody");
students.forEach((s, index) => {
s.present = Math.random() > 0.5;
const row = table.rows[index];
if (row) {
row.cells[2].textContent =
s.present ? "Present" : "Absent";
}
});
console.timeEnd("DOM Update");
}
// -----------------------------
// VIRTUAL DOM
// -----------------------------
let oldVDOM = [];
function createVDOM(data) {
return data.map(s => ({
id: s.id,
status: s.present ? "Present" : "Absent"
}));
}
function diff(oldVDOM, newVDOM) {
let changes = [];
newVDOM.forEach((newNode, index) => {
const oldNode = oldVDOM[index];
if (!oldNode || oldNode.status !== newNode.status) {
changes.push({ index, status: newNode.status });
}
});
return changes;
}
function patchDOM(changes) {
const table = document.getElementById("tableBody");
changes.forEach(change => {
const row = table.rows[change.index];
if (row) {
row.cells[2].textContent = change.status;
// Highlight changed rows
row.classList.add("updated");
}
});
}
// -----------------------------
// VDOM UPDATE (FAST)
// -----------------------------
function updateVDOM() {
console.time("VDOM Update");
students.forEach(s => {
s.present = Math.random() > 0.5;
})
const newVDOM = createVDOM(students);
if (oldVDOM.length === 0) {
oldVDOM = createVDOM(students);
}
const changes = diff(oldVDOM, newVDOM);
patchDOM(changes);
oldVDOM = newVDOM;
console.timeEnd("VDOM Update");
}
