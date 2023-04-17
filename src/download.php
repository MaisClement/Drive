<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');
header("Content-type:application/json");

// --- 

if (!isset($_GET['p'])) {
    $json = array(
        'error' => array(
            'code' => (int) 400,
            'message' => (String) 'Bad Request',
            'details' => (String) 'Required parameter "p" is missing or null.',
        )
    );
    http_response_code(400);
    echo json_encode($json);
    exit;
}

$filename = $PATH . $_GET['p'];

if (is_file($filename)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: 0");
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
    header('Content-Length: ' . filesize($filename));
    header('Pragma: public');

    flush();

    readfile($filename);

} else {
    $json = array(
        'message' => array(
            'code' => (int) 404,
            'message' => (String) 'Not Found',
            'details' => (String) 'Directory or file not existing',
        )
    );
    http_response_code(404);
    echo json_encode($json);
    exit;
}