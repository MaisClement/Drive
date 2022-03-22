<?php
    //Display error
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    //Get config
    $PATH = file_get_contents('./config/PATH.txt');
    $HOST = file_get_contents('./config/HOST.txt');

    if (isset($_GET['ctrl']) && is_file('./controller/' . $_GET['ctrl'] . '.php')){
        include_once ('./controller/' . $_GET['ctrl'] . '.php');
    
    } else {
        require_once('./view/index.html');
        
    }
?>