// Mock student data
let students = [
    { student_id: 'S001', first_name: 'Ana', last_name: 'Smith', email: 'ana@example.com', course: 'Math', year_level: '1' },
    { student_id: 'S002', first_name: 'Ben', last_name: 'Lee', email: 'ben@example.com', course: 'Science', year_level: '2' },
    { student_id: 'S003', first_name: 'Cara', last_name: 'Jones', email: 'cara@example.com', course: 'English', year_level: '3' }
];

// Function to display students
function renderStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    students.forEach((s, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.student_id}</td>
            <td>${s.first_name} ${s.last_name}</td>
            <td>${s.email}</td>
            <td>${s.course || ''}</td>
            <td>${s.year_level || ''}</td>
            <td>
                <button onclick="editStudent(${index})" class="btn success">Edit</button>
                <button onclick="deleteStudent(${index})" class="btn danger">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Call render on page load
window.addEventListener('DOMContentLoaded', renderStudents);

// Edit / Delete mock functions
function editStudent(index){
    const s = students[index];
    const editModal = document.getElementById('editModal');
    const form = document.getElementById('editStudentForm');
    form.student_id.value = s.student_id;
    form.first_name.value = s.first_name;
    form.last_name.value = s.last_name;
    form.email.value = s.email;
    form.course.value = s.course || '';
    form.year_level.value = s.year_level || '';
    form.dataset.index = index;
    editModal.style.display = 'flex';
}

document.getElementById('editStudentForm').addEventListener('submit', function(e){
    e.preventDefault();
    const index = e.target.dataset.index;
    students[index] = {
        student_id: e.target.student_id.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        course: e.target.course.value,
        year_level: e.target.year_level.value
    };
    document.getElementById('editModal').style.display = 'none';
    renderStudents();
    alert('Student updated successfully!');
});

function deleteStudent(index){
    if(confirm('Are you sure you want to delete this student?')){
        students.splice(index,1);
        renderStudents();
        alert('Student deleted successfully!');
    }
}

// Add student
document.getElementById('addStudentForm').addEventListener('submit', function(e){
    e.preventDefault();
    students.push({
        student_id: e.target.student_id.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        course: e.target.course.value,
        year_level: e.target.year_level.value
    });
    document.getElementById('addModal').style.display = 'none';
    renderStudents();
    alert('Student added successfully!');
});
