<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = file_get_contents('./config/PATH.txt');
    $HOST = file_get_contents('./config/HOST.txt');

if (isset($_GET['p']) && isset($_GET['n']) && $_GET['n'] != ''){
    mkdir ($PATH . $_GET['p'] . $_GET['n'], 0777);
    echo 'OK';
}