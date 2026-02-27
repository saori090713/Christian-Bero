<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if(!$data || (!isset($data['id']) && !isset($data['student_id']))){
    http_response_code(400);
    echo json_encode(['success'=>false,'message'=>'Student identifier missing']);
    exit;
}

$students = file_exists('students.json') ? json_decode(file_get_contents('students.json'), true) : [];

$found = false;
foreach($students as &$s){
    if((isset($data['id']) && $s['id']==$data['id']) || (isset($data['student_id']) && $s['student_id']==$data['student_id'])){
        $found = true;
        foreach($data as $key=>$value){
            if($key!=='id') $s[$key]=$value;
        }
        break;
    }
}

if(!$found){
    http_response_code(404);
    echo json_encode(['success'=>false,'message'=>'Student not found']);
    exit;
}

file_put_contents('students.json', json_encode($students, JSON_PRETTY_PRINT));
echo json_encode(['success'=>true,'message'=>'Student updated successfully']);
