<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = '/mnt/disk_raid1/files/';

if (isset($_GET['p']) && $_GET['p'] != '' && isset($_GET['n']) && $_GET['n'] != ''){
    rename($PATH . $_GET['p'], $PATH . $_GET['n']);
    echo 'OK';
}