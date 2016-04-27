<?php
require_once("database.php");

$request = file_get_contents("php://input");
$postdata = json_decode($request, true);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $companies = getCompanies($mysqli);

        die(json_encode([
            'method' => "get",
            'companies' => $companies,
            'status' => !empty($companies)
        ]));
        break;
    case "POST":
        if (isset($_GET['id'])) {
            $status = updateCompanies($mysqli, $postdata['data']);
            $companies = getCompanies($mysqli);

            die(json_encode([
                'method' => "update",
                'companies' => $companies,
                'status' => $status
            ]));
        } else {
            $status = insertCompanies($mysqli, $postdata['data']);
            $companies = getCompanies($mysqli);

            die(json_encode([
                'method' => "insert",
                'companies' => $companies,
                'status' => $status
            ]));
        }
        break;
    case "DELETE":
        $id = $_GET['id'];
        $status = deleteCompanies($mysqli, $id);
        $companies = getCompanies($mysqli);

        die(json_encode([
            'method' => "delete",
            'companies' => $companies,
            'status' => $status
        ]));
        break;
}

function treeCompanies($elements, $parentId = 0) {
    $branch = [];

    foreach ($elements as $element) {
        if ($element['id_parent'] == $parentId) {
            $children = treeCompanies($elements, $element['id']);
            $element['children'] = $children;
            $branch[] = $element;
        }
    }

    return $branch;
}

function getCompanies(mysqli $mysqli) {
    $companies = [];
    $response = $mysqli->query("SELECT * FROM `companies`");

    while ($row = $response->fetch_assoc()) {
        $companies[] = $row;
    }

    $companies = treeCompanies($companies);

    return $companies;
}

function insertCompanies(mysqli $mysqli, $postdata) {
    $status = $mysqli->query("
        INSERT INTO `companies` (`id_parent`, `name`, `earnings`)
        VALUES ('{$postdata['id_parent']}', '{$postdata['name']}', '{$postdata['earnings']}')
    ");

    return $status;
}

function updateCompanies(mysqli $mysqli, $postdata) {
    $status = $mysqli->query("
        UPDATE `companies` SET `name` = '{$postdata['name']}', `earnings` = '{$postdata['earnings']}'
        WHERE `id` = {$postdata['id']}
    ");

    return $status;
}

function deleteCompanies(mysqli $mysqli, $id) {
    $status = $mysqli->query("
        DELETE FROM `companies`
        WHERE `id` = {$id}
    ");

    return $status;
}
