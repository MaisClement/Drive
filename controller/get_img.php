<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

header("Content-Type: image/jpg");

function resizeImage($imagePath, $width, $height) {
    //The blur factor where > 1 is blurry, < 1 is sharp.
    $imagick = new Imagick( $imagePath );

    $imagick->resizeImage($width, $height, imagick::FILTER_HERMITE , 1, false);

    return $imagick->getImageBlob();
}

$PATH = file_get_contents('./config/PATH.txt');
$HOST = file_get_contents('./config/HOST.txt');

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    // Windows
    echo file_get_contents('view/type/jpg.png');
    
} else {
    // Linux
    if (isset($_GET['p']) && $_GET['p'] != '') {
        $name = substr($_GET['p'], strrpos($_GET['p'], '/'));
    
        $img = resizeImage($PATH . $_GET['p'], 50, 50);
        echo $img;
        file_put_contents($PATH . $name, $img);
    }

}



?>