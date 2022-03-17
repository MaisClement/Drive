<?php
    $PATH = file_get_contents('PATH.txt');
    $IP = file_get_contents('IP.txt');

if (isset($_GET['p']) && $_GET['p'] != '') {
    $name = $_GET['p'];

    if (is_file($PATH . $name)) {
        header("content-type: image/jpeg"); 
        $img = file_get_contents($PATH . $name);
        echo $img;

    } 
}

?>
