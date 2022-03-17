<?php

function getAllDir($folder){
    $files = scandir($folder);
    $i = 0;

    foreach($files as $file) {
        if ($file != '.' && $file != '..'){
            
            if (is_dir($folder . $file))
                $i += getAllDir($folder . $file . '/');
            
            else
                $i++;
           
        }
    }
    return $i;
}

function resizeImage($imagePath, $width, $height) {
    $imagick = new Imagick( $imagePath );

    $imagick->resizeImage($width, $height, imagick::FILTER_HERMITE , 1, false);

    return $imagick->getImageBlob();
}

function eachFile($folder, $total, $nbfiles){
    $files = scandir($folder);

    foreach($files as $file) {
        if ($file != '.' && $file != '..'){
            
            if (is_dir($folder . $file)){
                $total += eachFile($folder . $file . '/', $total, $nbfiles);
            
            } else {
                if (is_file('/mnt/disk_raid1/cache/' . $file)) {

                    //echo $folder . $file . PHP_EOL;
                    
                
                } else if(is_array(getimagesize($folder . $file))){ 
                            
                    $img = resizeImage($folder . $file, 50, 50);
                    file_put_contents('/mnt/disk_raid1/cache/' . $file, $img);

                    $total++;

                    echo ($total / $nbfiles) * 100 . ' %'  . PHP_EOL;
                
                }
            }  
        }
    }
    return $total;
}

$PATH = file_get_contents('PATH.txt');
$IP = file_get_contents('IP.txt');


$nbfiles = getAllDir($PATH);

echo '=== Génération du cache en cours ===';

eachFile($PATH, 0, $nbfiles);



?>
