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

    //Get config
    $PATH = file_get_contents('./config/PATH.txt');
    $HOST = file_get_contents('./config/HOST.txt');

    if (isset($_GET['ctrl']) && is_file('./controller/' . $_GET['ctrl'] . '.php')){
        include_once ('./controller/' . $_GET['ctrl'] . '.php');
    
    } else {
        require_once('./view/index.html');
        
    }
?>