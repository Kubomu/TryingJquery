<?php

include 'db_connect.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];
$stmt = $conn->prepare("UPDATE tasks SET completed = 'YES' WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Error completing task: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
