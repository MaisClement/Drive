<?php

// --- 

if (!isset($_GET['p']) || !isset($_GET['name']) || $_GET['name'] == null) {
    $json = array(
        'error' => array(
            'code' => (int) 400,
            'message' => (String) 'Bad Request',
            'details' => (String) 'Required parameter "p" or "name" are missing or null.',
        )
    );
    http_response_code(400);
    echo json_encode($json);
    exit;
}

$path = $PATH . $_GET['p'] . '/' . $_GET['name'];

// On rajoute un / a la fin
$l = strlen($path);
if (substr($path, $l - 1, 1) != '/') {
    $path .= '/';
}

// On retire les potentiel //
$search = ['//'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);

if (is_dir($path) || is_file($path)) {
    $json = array(
        'message' => array(
            'code' => (int) 200,
            'message' => (String) 'OK',
            'details' => (String) 'Directory or file allredy existing',
        )
    );
    http_response_code(202);
    echo json_encode($json);
    exit;
}

if (!mkdir($path, 0777)) {
    $json = array(
        'error' => array(
            'code' => (int) 401,
            'message' => (String) 'Unauthorized',
            'details' => (String) 'Can\'t create ressource',
        )
    );
    http_response_code(401);
    echo json_encode($json);
    exit;
}

$json = array(
    'message' => array(
        'code' => (int) 200,
        'message' => (String) 'OK',
        'details' => (String) 'Created',
    )
);
echo json_encode($json);
exit;