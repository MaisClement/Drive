<?php

header("Content-Type: image/jpg");

// Fichier et nouvelle taille
$filename = $PATH . $_GET['p'];

$img = file_get_contents($filename);
echo $img;

?>
