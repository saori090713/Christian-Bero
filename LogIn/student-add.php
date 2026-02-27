<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if(!$data || !isset($data['student_id']) || !isset($data['first_name']) || !isset($data['last_name']) || !isset($data['email'])){
    http_response_code(400);
    echo json_encode(['success'=>false,'message'=>'Required fields missing']);
    exit;
}

$students = file_exists('students.json') ? json_decode(file_get_contents('students.json'), true) : [];

// Check duplicate student_id
foreach($students as $s){
    if($s['student_id'] === $data['student_id']){
        http_response_code(409);
        echo json_encode(['success'=>false,'message'=>'Student ID already exists']);
        exit;
    }
}

$newId = count($students) ? max(array_column($students,'id')) + 1 : 1;
$data['id'] = $newId;
$students[] = $data;

file_put_contents('students.json', json_encode($students, JSON_PRETTY_PRINT));

echo json_encode(['success'=>true,'message'=>'Student added successfully']);
