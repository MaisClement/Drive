<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/html; charset=utf-8');
    header("Content-type:application/json");

// --- 

if (!isset($_GET['p']) || !isset($_GET['name']) || $_GET['name'] == null){
    $json = array(
        'error' => array(
            'code'      =>  (int)       400,
            'message'   =>  (String)    'Bad Request',
            'details'   =>  (String)    'Required parameter "p" or "name" are missing or null.',
        )
    );
    http_response_code(400);
    echo json_encode($json);
    exit;
}

$path = $PATH . $_GET['p'];
$name = $_GET['name'];

// On rajoute un / a la fin
$l = strlen($path);
if (substr($path, $l -1, 1) != '/') {
    $path .= '/';
}

// On retire les potentiel //
$search = ['//'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);

if (!is_dir($path)) {
    mkdir($path, 0777, true);
}

if (is_file($path . $name)) {
    $json = array(
        'message' => array(
            'code'      =>  (int)       409,
            'message'   =>  (String)    'Conflict',
            'details'   =>  (String)    'A file is already exising',
        )
    );
    http_response_code(409);
    echo json_encode($json);
    exit;
}


if (!is_dir($path) && !is_file( substr($path, 0, -1) )){
    $json = array(
        'message' => array(
            'code'      =>  (int)       404,
            'message'   =>  (String)    'Not Found',
            'details'   =>  (String)    'Directory or file not existing',
        )
    );
    http_response_code(404);
    echo json_encode($json);
    exit;
}

if(!move_uploaded_file($_FILES['file']['tmp_name'], $path . $name)){
    $json = array(
        'message' => array(
            'code'      =>  (int)       500,
            'message'   =>  (String)    'Something wrong',
            'details'   =>  (String)    'Failed to upload file',
            'path'      =>  (String)    $path . $name,
            'path'      =>  $_FILES['file'],
        )
    );
    http_response_code(500);
    echo json_encode($json);
    exit;
}

chmod($path . $name, 0777);
$json = array(
    'message' => array(
        'code'      =>  (int)       200,
        'message'   =>  (String)    'OK',
        'details'   =>  (String)    'Uploaded',
    )
);
echo json_encode($json);
exit;