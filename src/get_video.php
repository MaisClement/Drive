<?php

// Fichier et nouvelle taille
$filename = $PATH . $_GET['p'];

$img = file_get_contents($filename);
echo $img;

?>