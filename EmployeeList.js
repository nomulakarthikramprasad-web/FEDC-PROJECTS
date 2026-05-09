export function EmployeeList(employees) {
return `
<input
type="text"
placeholder="Search Employee..."
onkeyup="searchEmployee(this.value)"
class="search-box"
/>
<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Score</th>
<th>Attendance</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
${employees.map(emp => `
<tr>
<td>${emp.id}</td>
<td>${emp.name}</td>
<td>${emp.score}</td>
<td>
<button onclick="toggleAttendance(${emp.id})">
${emp.present ? "Present" : "Absent"}
</button>
</td>
<td>
<button onclick="editName(${emp.id})">Edit Name</button>
<button onclick="editScore(${emp.id})">Edit Score</button>
<button onclick="deleteEmployee(${emp.id})">Delete</button>
</td>
</tr>
`).join("")}
</tbody>
</table>
`;
}
