<?php
    
    //Change upload limits
    ini_set('upload_max_filesize', '4G');
    ini_set('post_max_size', '4G');
    ini_set('max_input_time', 300);
    ini_set('max_execution_time', 300);

    header('Access-Control-Allow-Origin: *');

session_start();

function error_handle($errno, $errstr, $errfile, $errline){
    $report = '### Error ###' . PHP_EOL;
    $report .= "[$errno] $errstr" . PHP_EOL;
    $report .= "Error on line $errline in $errfile";
    $report .= PHP_EOL . PHP_EOL . '### SESSION ###' . PHP_EOL;
    $report .= print_r($_SESSION, true);
    $report .= PHP_EOL . PHP_EOL . '### SERVER ###' . PHP_EOL;
    $report .= print_r($_SERVER, true);
    $report .= PHP_EOL . PHP_EOL . '### POST ###' . PHP_EOL;
    $report .= print_r($_POST, true);
    $report .= PHP_EOL . PHP_EOL . '### GET ###' . PHP_EOL;
    $report .= print_r($_GET, true);
    $report .= PHP_EOL . PHP_EOL . '### COOKIE ###' . PHP_EOL;
    $report .= print_r($_COOKIE, true);

    $name = $errstr;
    file_put_contents('../data/report/' . $name . '_error.json', $report);
}

if (isset($_GET['debug']) && $_GET['debug'] == 'y') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    set_error_handler("error_handle");
}

//------------

$path = 'src/';

//------------

$uri = urldecode($_SERVER['REQUEST_URI']);

if (strpos($uri, "?"))
    $uri = substr($uri, 0, strpos($uri, "?"));

if ($uri == '' || $uri == "/" || $uri == "\\")
    $uri = 'index';

//------------

$file = $path . $uri;
$file_php = $file . '.php';
$file_react = $path . 'build/' . $uri;
$file_react_index = $path . 'build/index.html';

$search = ['//'];
$replace = ['/'];

$file = str_replace($search, $replace, $file );
$file_php = str_replace($search, $replace, $file_php );
$file_react = str_replace($search, $replace, $file_react );
$file_react_index = str_replace($search, $replace, $file_react_index);

//------------

include('src/base/main.php');

//------------
try {
    if (strpos($file, "/base/") || strpos($file, "/data/")) {
        ErrorMessage(403);

    } else if (is_file($file_php)) {
        chdir($path);
        include($file_php);
        exit;
        
    } else if (is_file($file)) {
        header('Content-Type: ' . mime_content_type($file));

        chdir($path);
        include($file);
        exit;

    } else if (is_file($file_react)) {
        if (strpos($file_react, '.css')) {
            header('Content-Type: text/css');
        } else {
            header('Content-Type: ' . mime_content_type($file_react));
        }

        include($file_react);
        exit;

    } else if (is_file($file_react_index)) {
        header('Content-Type: ' . mime_content_type($file_react_index));

        include($file_react_index);
        exit;

    } else {
        echo $file_react;
        ErrorMessage(404);
    }
} catch (Exception $ex) {
    $report = '### Exception ###' . PHP_EOL;
    $report .= print_r($ex, true);
    $report .= PHP_EOL . PHP_EOL . '### SESSION ###' . PHP_EOL;
    $report .= print_r($_SESSION, true);
    $report .= PHP_EOL . PHP_EOL . '### SERVER ###' . PHP_EOL;
    $report .= print_r($_SERVER, true);
    $report .= PHP_EOL . PHP_EOL . '### POST ###' . PHP_EOL;
    $report .= print_r($_POST, true);
    $report .= PHP_EOL . PHP_EOL . '### GET ###' . PHP_EOL;
    $report .= print_r($_GET, true);
    $report .= PHP_EOL . PHP_EOL . '### COOKIE ###' . PHP_EOL;
    $report .= print_r($_COOKIE, true);

    $name = md5(print_r($ex, true));
    file_put_contents('../data/report/' . $name . '_exception.json', $report);

    ErrorMessage(500);
}
