<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/html; charset=utf-8');
    header("Content-type:application/json");

// --- 

if (!isset($_GET['p'])) {
    $json = array(
        'error' => array(
            'code'      =>  (int)       400,
            'message'   =>  (String)    'Bad Request',
            'details'   =>  (String)    'Required parameter "p" is missing or null.',
        )
    );
    http_response_code(400);
    echo json_encode($json);
    exit;
}

$path = $PATH . urldecode($_GET['p']);

// On rajoute un / a la fin
$l = strlen($path);
if (substr($path, $l -1, 1) != '/') {
    $path .= '/';
}

// On retire les potentiel //
$search = ['//'];
$replace = ['/'];
$path = str_replace($search, $replace, $path);

$t_path = substr($path, 0, strlen($path)-1);

if (is_file($t_path)) {
    $file = substr($t_path, strrpos($t_path, '/') + 1);
    $type = strtolower(substr($file, strrpos($file, '.') + 1));

    $JSON['path'] = substr($t_path, strlen($PATH), strrpos($t_path, '/') - strlen($PATH));
    $JSON['file'] = array(
        'path'      =>  (String)    substr($t_path, strlen($PATH), strrpos($t_path, '/') - strlen($PATH)),
        'name'      =>  (String)    substr($file, 0, strrpos($file, '.')),
        'type'      =>  (String)    strtolower(substr($file, strrpos($file, '.') + 1)),
        'img'       =>  (String)    is_file('../data/type/' . $type . '.png') ? $HOST.'get_icon?i='.$type : $HOST.'get_icon?i=file',
        'time'      =>  (String)    filemtime($t_path),
        'size'      =>  (String)    filesize($t_path),
    );

    $files = scandir($PATH . substr($t_path, strlen($PATH), strrpos($t_path, '/') - strlen($PATH)));
    foreach ($files as $file){
        if ($file != '.' && $file != '..'){
    
            if (is_dir($path . $file)){
                $JSON['files'][] = array(
                    'name'      =>  (String)    $file,
                    'type'      =>  (String)    'directory',
                    'img'       =>  (String)    $HOST . 'get_icon?i=folder',
                    'time'      =>  (String)    filemtime($path . $file),
                    'size'      =>              null,
                );
    
            } else {
                $type = strtolower(substr($file, strrpos($file, '.') + 1));
                $JSON['files'][] = array(
                    'name'      =>  (String)    substr($file, 0, strrpos($file, '.')),
                    'type'      =>  (String)    strtolower(substr($file, strrpos($file, '.') + 1)),
                    'img'       =>  (String)    is_file('../data/type/' . $type . '.png') ? $HOST.'get_icon?i='.$type : $HOST.'get_icon?i=file',
                    'time'      =>  (String)    filemtime($path . $file),
                    'size'      =>  (String)    filesize($path . $file),
                );
            }
        }
    }

    echo json_encode($JSON);
    exit;
} 

if (!$files = scandir($path)){
    $path = $PATH;
    $files = scandir($path);
}

$JSON['path'] = substr($path, strlen($PATH), strlen($path) - strlen($PATH) - 1);
$JSON['files'] = [];

foreach ($files as $file){
    if ($file != '.' && $file != '..'){

        if (is_dir($path . $file)){
            $JSON['files'][] = array(
                'name'      =>  (String)    $file,
                'type'      =>  (String)    'directory',
                'img'       =>  (String)    $HOST . 'get_icon?i=folder',
                'time'      =>  (String)    filemtime($path . $file),
                'size'      =>              null,
            );

        } else {
            $type = strtolower(substr($file, strrpos($file, '.') + 1));
            $JSON['files'][] = array(
                'name'      =>  (String)    substr($file, 0, strrpos($file, '.')),
                'type'      =>  (String)    strtolower(substr($file, strrpos($file, '.') + 1)),
                'img'       =>  (String)    is_file('../data/type/' . $type . '.png') ? $HOST.'get_icon?i='.$type : $HOST.'get_icon?i=file',
                'time'      =>  (String)    filemtime($path . $file),
                'size'      =>  (String)    filesize($path . $file),
            );
        }
    }
}

echo json_encode($JSON);
//echo getcwd();