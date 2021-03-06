<?php
    //Display error
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    //Change upload limits
    ini_set('upload_max_filesize', '4G');
    ini_set('post_max_size', '4G');
    ini_set('max_input_time', 300);
    ini_set('max_execution_time', 300);

    header('Access-Control-Allow-Origin: *');

    //Get config
    $PATH = file_get_contents('./config/PATH.txt');
    $HOST = file_get_contents('./config/HOST.txt');

    require_once('./base/main.php');

    if (isset($_GET['ctrl']) && is_file('./model/' . $_GET['ctrl'] . '.php')){
        include_once ('./model/' . $_GET['ctrl'] . '.php');
    
    } else {
        require_once('./view/index.html');
        
    }
?>