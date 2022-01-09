<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

function resizeImage($imagePath, $width, $height) {
    //The blur factor where > 1 is blurry, < 1 is sharp.
    $imagick = new Imagick( $imagePath );

    $imagick->resizeImage($width, $height, imagick::FILTER_HERMITE , 1, false);

    header("Content-Type: image/jpg");
    return $imagick->getImageBlob();
}

if (isset($_GET['p']) && $_GET['p'] != '') {
    $name = substr($_GET['p'], strrpos($_GET['p'], '/'));

    if (is_file('/mnt/disk_raid1/cache/' . $name)) {
        header("content-type: image/jpeg"); 
        $img = file_get_contents('/mnt/disk_raid1/cache/' . $name);
        echo $img;

    } else {
        //header("content-type: image/jpeg"); 
        $img = resizeImage('/mnt/disk_raid1/files/' . $_GET['p'], 50, 50);
        echo $img;
        file_put_contents('/mnt/disk_raid1/cache/' . $name, $img);

    }
}

?>
