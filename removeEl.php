<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = file_get_contents('PATH.txt');
    $IP = file_get_contents('IP.txt');

function delTree($dir) {
    $files = array_diff(scandir($dir), array('.','..'));
        foreach ($files as $file) {
            (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
        }
        return rmdir($dir);
    } 

if (isset($_GET['p']) && $_GET['p'] != ''){
    if (is_dir($PATH . $_GET['p']))
        delTree($PATH . $_GET['p']);
    else
        unlink($PATH . $_GET['p']);
}

echo 'OK';