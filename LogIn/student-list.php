<?php
header('Content-Type: application/json');

$students = file_exists('students.json') ? json_decode(file_get_contents('students.json'), true) : [];
echo json_encode($students);
