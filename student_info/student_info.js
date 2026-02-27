const students = [
  { name: "Ana", scores: [85, 90, 88], present: true },
  { name: "Ben", scores: [70, 75, 72], present: false },
  { name: "Cara", scores: [95, 92, 94], present: true },
  { name: "Daniel", scores: [60, 65, 70], present: true },
  { name: "Ella", scores: [88, 85, 90], present: true },
  { name: "Felix", scores: [78, 80, 82], present: false },
  { name: "Grace", scores: [92, 89, 94], present: true },
  { name: "Hannah", scores: [73, 70, 68], present: false },
  { name: "Ivan", scores: [81, 84, 79], present: true },
  { name: "Julia", scores: [96, 98, 97], present: true }
];

function showAll() {
  displayStudents(students);
}


window.onload = function () {
  displayStudents(students);
};

function getAverage(scores) {
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
}

function getResult(avg) {
  return avg >= 75 ? "Passed" : "Failed";
}

function displayStudents(list) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  list.forEach(student => {
    const avg = getAverage(student.scores);
    const result = getResult(avg);
    const attendance = student.present ? "Present" : "Absent";

    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.scores[0]}</td>
        <td>${student.scores[1]}</td>
        <td>${student.scores[2]}</td>
        <td>${avg}</td>
        <td>${result}</td>
        <td>${attendance}</td>
      </tr>
    `;
  });
}

function status(type) {
  let filtered = [];

  if (type === "present") {
    filtered = students.filter(s => s.present);
  } 
  else if (type === "absent") {
    filtered = students.filter(s => !s.present);
  } 
  else if (type === "passed") {
    filtered = students.filter(s => getAverage(s.scores) >= 75);
  } 
  else if (type === "failed") {
    filtered = students.filter(s => getAverage(s.scores) < 75);
  }

  displayStudents(filtered);
}

function srchst() {
  const value = document.getElementById("srch").value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(value)
  );

  displayStudents(filtered);
}
