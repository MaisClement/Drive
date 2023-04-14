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

$path = $PATH . $_GET['p'] . '/' . $_GET['name'];

// On rajoute un / a la fin
$l = strlen($path);
if (substr($path, $l -1, 1) != '/') {
    $path .= '/';
}

// On retire les potentiel //
$search = ['//'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);

if (!is_dir($path) && !is_file( substr($path, 0, -1) )){
    echo $path;
    http_response_code(404);
    exit;
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

if (is_dir($path)) {
    if (!delTree($path)){
        $json = array(
            'error' => array(
                'code'      =>  (int)       401,
                'message'   =>  (String)    'Unauthorized',
                'details'   =>  (String)    'Can\'t remove directory',
            )
        );
        http_response_code(401);
        echo json_encode($json);
        exit;
    } 
} else {
    if (!unlink( substr($path, 0, -1) )){
        $json = array(
            'error' => array(
                'code'      =>  (int)       401,
                'message'   =>  (String)    'Unauthorized',
                'details'   =>  (String)    'Can\'t remove file',
            )
        );
        http_response_code(401);
        echo json_encode($json);
        exit;
    } 
}

$json = array(
    'message' => array(
        'code'      =>  (int)       200,
        'message'   =>  (String)    'OK',
        'details'   =>  (String)    'Removed',
    )
);
echo json_encode($json);
exit;