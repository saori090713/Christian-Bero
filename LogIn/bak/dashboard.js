const apiBase = 'http://localhost/api';

// References
const tableBody = document.getElementById('studentTableBody');
const alertBox = document.getElementById('alertBox');

const addForm = document.getElementById('addStudentForm');
const editForm = document.getElementById('editStudentForm');
const addModal = document.getElementById('addModal');
const editModal = document.getElementById('editModal');

let students = [];

// ======================
// Fetch and render table
// ======================
async function loadStudents() {
    try {
        const res = await fetch(`${apiBase}/student-list.php`);
        students = await res.json();
        renderTable();
    } catch (err) {
        showAlert('Error fetching students', 'danger');
        console.error(err);
    }
}

// ======================
// Render student table
// ======================
function renderTable() {
    tableBody.innerHTML = '';
    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.first_name} ${student.last_name || ''}</td>
            <td>${student.email}</td>
            <td>${student.course || ''}</td>
            <td>${student.year_level || ''}</td>
            <td>
                <button class="primary" onclick="openEditModal(${student.id})">Edit</button>
                <button class="danger" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// ======================
// Alert function
// ======================
function showAlert(message, type='success') {
    alertBox.textContent = message;
    alertBox.className = '';
    alertBox.classList.add(type === 'success' ? 'success' : 'danger');
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
}

// ======================
// Add student
// ======================
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(addForm));
    
    try {
        const res = await fetch(`${apiBase}/student-add.php`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if(result.success){
            showAlert(result.message, 'success');
            addForm.reset();
            addModal.style.display = 'none';
            loadStudents();
        } else {
            showAlert(result.message, 'danger');
        }
    } catch(err) {
        showAlert('Error adding student', 'danger');
        console.error(err);
    }
});

// ======================
// Edit student modal
// ======================
function openEditModal(id){
    const student = students.find(s => s.id == id);
    if(!student) return;

    editForm.id.value = student.id;
    editForm.student_id.value = student.student_id;
    editForm.first_name.value = student.first_name;
    editForm.last_name.value = student.last_name;
    editForm.email.value = student.email;
    editForm.course.value = student.course;
    editForm.year_level.value = student.year_level;

    editModal.style.display = 'flex';
}

// ======================
// Update student
// ======================
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(editForm));

    try {
        const res = await fetch(`${apiBase}/edit-student.php`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if(result.success){
            showAlert(result.message, 'success');
            editModal.style.display = 'none';
            loadStudents();
        } else {
            showAlert(result.message, 'danger');
        }
    } catch(err) {
        showAlert('Error updating student', 'danger');
        console.error(err);
    }
});

// ======================
// Delete student
// ======================
async function deleteStudent(id){
    if(!confirm('Are you sure you want to delete this student?')) return;

    try {
        const res = await fetch(`${apiBase}/student-delete.php`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        });
        const result = await res.json();
        if(result.success){
            showAlert(result.message, 'success');
            loadStudents();
        } else {
            showAlert(result.message, 'danger');
        }
    } catch(err){
        showAlert('Error deleting student', 'danger');
        console.error(err);
    }
}

// ======================
// Close modals on outside click
// ======================
window.addEventListener('click', (e) => {
    if(e.target === addModal) addModal.style.display = 'none';
    if(e.target === editModal) editModal.style.display = 'none';
});

// ======================
// Initialize
// ======================
loadStudents();
