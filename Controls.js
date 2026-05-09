import { state, setState } from "../state.js";
// Add Employee
window.addEmployee = function () {
const name = prompt("Enter Name:");
if (!name) return;
const newEmp = {
id: state.employees.length + 1,
name,
score: 50,
present: true
};
setState({
employees: [...state.employees, newEmp]
});
};
// Update Score
// Manual Update Score
window.updateScore = function () {
const id = Number(prompt("Enter Employee ID:"));
const newScore = prompt("Enter New Score:");
if (!id || newScore === null) return;
const updated = state.employees.map(emp =>
emp.id === id
? { ...emp, score: Number(newScore) }
: emp
);
setState({ employees: updated });
};
// Edit
window.editEmployee = function (id) {
const name = prompt("Enter new name:");
const updated = state.employees.map(emp =>
emp.id === id
? { ...emp, name: name || emp.name }
: emp
);
setState({ employees: updated });
};
// Attendance
window.toggleAttendance = function (id) {
const updated = state.employees.map(emp =>
emp.id === id
? { ...emp, present: !emp.present }
: emp
);
setState({ employees: updated });
};
// Search
window.searchEmployee = function (query) {
query = query.toLowerCase();
if (query === "") {
// restore original data
setState({ employees: [...state.allEmployees] });
return;
}
const filtered = state.allEmployees.filter(emp =>
emp.name.toLowerCase().includes(query)
);
setState({ employees: filtered });
};
window.deleteEmployee = function (id) {
const updatedEmployees = state.employees.filter(emp => emp.id !== id);
setState({
employees: updatedEmployees
});
};
window.downloadPDF = function () {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
// Title
doc.text("Employee Report", 14, 10);
// Table Data
const tableData = state.employees.map(emp => [
emp.id,
emp.name,
emp.score,
emp.present ? "Present" : "Absent"
]);
// Generate Table
doc.autoTable({
head: [["ID", "Name", "Score", "Attendance"]],
body: tableData
});
// Save PDF
doc.save("employees.pdf");
};
