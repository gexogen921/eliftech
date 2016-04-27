<?php
$mysqli = new mysqli("localhost", "root", "root", "eliftech");

if ($mysqli->connect_errno) {
    die(json_encode([
        'status' => false,
        'message' => "Connection error: {$mysqli->connect_error}"
    ]));
}
