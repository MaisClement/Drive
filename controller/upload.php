<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = file_get_contents('./config/PATH.txt');
    $HOST = file_get_contents('./config/HOST.txt');

if (isset($_POST['p']) && isset($_POST['n']) && $_POST['n'] != ''){
    $path = $PATH . $_POST['p'];
    $name = $_POST['n'];

    if (!is_dir($path)){
        mkdir($path, 0777, true);
    }

    //$temp = basename($_FILES['avatar']['tmp_name']);
    if(!move_uploaded_file($_FILES['file']['tmp_name'], $path . $name)){
        echo 'KC';
    } else {
        chmod($path . $name, 0777);  // notation octale : valeur du mode correcte
        echo 'OK';
    }
} else {
    echo 'KC';
}