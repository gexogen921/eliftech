<?php
$mysqli = new mysqli("localhost", "root", "root", "tree");

if ($mysqli->connect_errno) {
    die(json_encode([
        'status' => false,
        'message' => "Connection error: {$mysqli->connect_error}"
    ]));
}
