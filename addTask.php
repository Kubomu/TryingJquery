<?php

include 'db_connect.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$task = $_POST['task'];
$stmt = $conn->prepare("INSERT INTO tasks (task, completed) VALUES (?, 'NO')");
$stmt->bind_param("s", $task);

if ($stmt->execute()) {
    $last_id = $stmt->insert_id;
    echo json_encode(['id' => $last_id]);
} else {
    echo json_encode(['error' => 'Error adding task: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
