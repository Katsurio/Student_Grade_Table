<?php
header('Access-Control-Allow-Origin: *');
require_once('mysql_connect.php');
$response = [
    'success' => false,
    'data' => []
];
if($conn) {
    $query = "SELECT `g`.`ID` AS `id`, `s`.`name` AS `name`, `c`.`name` AS `course`, `grade` FROM `grades` AS `g` 
JOIN `students` AS `s` ON `student_id` = `s`.`ID` 
JOIN `courses` AS `c` ON `course_id` = `c`.`ID`";

    $result = mysqli_query($conn, $query);

    if (!empty($result)) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response['data'][] = $row;
        }
        $response['success'] = true;
    }
}
print_r(json_encode($response));

mysqli_close($conn);
//$response = [
//    "success" => true,
//    "data" => [
//        [
//        "id" => 1,
//        "name" => "student name",
//        "grade" => 99,
//        "course" => "student course"
//        ]
//    ]
//];
//print_r(json_encode($response));
//header('Access-Control-Allow-Origin: *');

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


