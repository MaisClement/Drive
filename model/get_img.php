<?php
    //Display error
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


header("Content-Type: image/jpg");

$testGD = get_extension_funcs("gd"); // Grab function list 
if (!$testGD){
     echo "GD not even installed."; exit; 
}


$PATH = file_get_contents('./config/PATH.txt');
$HOST = file_get_contents('./config/HOST.txt');

// Fichier et nouvelle taille
$filename = $PATH . $_GET['p'];
$size = 100;

// Calcul des nouvelles dimensions
list($width, $height) = getimagesize($filename);

$ratio = $width / $height;
$newwidth = $size * $ratio;
$newheight = $size;

// Chargement
$thumb = imagecreatetruecolor($newwidth, $newheight);

if(exif_imagetype($filename) == IMAGETYPE_JPEG){
    $source = imagecreatefromjpeg($filename);

} else if (exif_imagetype($filename) == IMAGETYPE_PNG){
    $source = imagecreatefrompng($filename);
} else {
    echo 'Something wrong';
}


// Redimensionnement
imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

// Affichage
imagejpeg($thumb);

?>
