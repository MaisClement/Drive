<?php
    //Display error
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


header("Content-Type: image/jpg");

$PATH = file_get_contents('./config/PATH.txt');
$HOST = file_get_contents('./config/HOST.txt');

// Fichier et nouvelle taille
$filename = $PATH . $_GET['p'];

$img = file_get_contents($filename);
echo $img;

?>
