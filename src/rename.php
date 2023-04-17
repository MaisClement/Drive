<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/html; charset=utf-8');
    header("Content-type:application/json");

// ---

if (!isset($_GET['p']) || !isset($_GET['new']) || $_GET['new'] == null || !isset($_GET['old']) || $_GET['old'] == null){
    $json = array(
        'error' => array(
            'code'      =>  (int)       400,
            'message'   =>  (String)    'Bad Request',
            'details'   =>  (String)    'Required parameter "p", "new" or "old" are missing or null.',
        )
    );
    http_response_code(400);
    echo json_encode($json);
    exit;
}

$path = $PATH . $_GET['p'] . '/' . $_GET['old'];
$path_new = $PATH . $_GET['p'] . '/' . $_GET['new'];

// On retire les potentiel //
$search = ['//', '///'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);
$path_new = str_replace($search, $replace, $path_new);

if (!is_dir($path) && !is_file($path) && !is_file( substr($path, 0, -1) )){
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

if (!rename($path, $path_new)){
    $json = array(
        'error' => array(
            'code'      =>  (int)       401,
            'message'   =>  (String)    'Unauthorized',
            'details'   =>  (String)    'Can\'t rename element',
        )
    );
    http_response_code(401);
    echo json_encode($json);
    exit;
} 

$json = array(
    'message' => array(
        'code'      =>  (int)       200,
        'message'   =>  (String)    'OK',
        'details'   =>  (String)    'Renammed',
    )
);
echo json_encode($json);
exit;