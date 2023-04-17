<?php

header("Content-Type: image/jpg");

// Fichier et nouvelle taille
$filename = '../data/type/' . $_GET['i'] . '.png';

$img = file_get_contents($filename);
echo $img;