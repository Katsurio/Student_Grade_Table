<?php
header('Access-Control-Allow-Origin: *');

$response = [
    "success" => true,
    "data" => [
        [
        "id" => 1,
        "name" => "student name",
        "grade" => 99,
        "course" => "student course"
        ]
    ]
];
print_r(json_encode($response));
header('Access-Control-Allow-Origin: *');

//{
//    "success": true,
//    "data": [
//        {
//            "id": 1,
//          "name": "student name",
//          "grade": 99,
//          "course": "student course"
//        }
//    ]
//}
?>


