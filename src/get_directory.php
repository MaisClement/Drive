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

$path = $_GET['p'];

// -----
// On prépare un $path propre

$path = $PATH . $path;

// On rajoute un / a la fin
$l = strlen($path);
if (substr($path, $l - 1, 1) != '/') {
    $path .= '/';
}

// On retire les potentiel //
$search = ['//'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);

if (!$files = scandir($path)) {
    $path = $PATH;
    $files = scandir($path);
}

$JSON['path'] = substr($path, strlen($PATH), strlen($path) - strlen($PATH) - 1);
$JSON['folders'] = [];

foreach ($files as $file) {
    if ($file != '.' && $file != '..') {

        if (is_dir($path . $file)) {
            $JSON['folders'][] = array(
                'name' => (String) $file,
                'id' => (int) md5($path . $file),
                'path' => (String) substr($path . $file, strlen($PATH)),
                'children' => array(),
                'isBranch' => (bool) isFolderGotChild($path . $file),
            );
        }
    }
}

echo json_encode($JSON);