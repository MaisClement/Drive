<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = file_get_contents('PATH.txt');
    $IP = file_get_contents('IP.txt');

function folderSize($dir){
    $count_size = 0;
    $count = 0;
    $dir_array = scandir($dir);
        foreach($dir_array as $key=>$filename){
        if($filename!=".." && $filename!="."){
            if(is_dir($dir."/".$filename)){
                $new_foldersize = foldersize($dir."/".$filename);
                $count_size = $count_size + $new_foldersize;
            }else if(is_file($dir."/".$filename)){
                $count_size = $count_size + filesize($dir."/".$filename);
                $count++;
            }
        }
        }
    return $count_size;
}
function sizeFormat($bytes){ 
    $kb = 1024;
    $mb = $kb * 1024;
    $gb = $mb * 1024;
    $tb = $gb * 1024;
    
    if (($bytes >= 0) && ($bytes < $kb)) {
        return $bytes . ' o';
    
    } elseif (($bytes >= $kb) && ($bytes < $mb)) {
        return ceil($bytes / $kb) . ' Ko';
    
    } elseif (($bytes >= $mb) && ($bytes < $gb)) {
        return ceil($bytes / $mb) . ' Mo';
    
    } elseif (($bytes >= $gb) && ($bytes < $tb)) {
        return ceil($bytes / $gb) . ' Go';
    
    } elseif ($bytes >= $tb) {
        return ceil($bytes / $tb) . ' To';
    } else {
        return $bytes . ' o';
    }
}

$PATH = file_get_contents('PATH.txt');
$IP = file_get_contents('IP.txt');

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    // Windows
    $disk_size = disk_total_space(substr($PATH, 0, 2));
    $foler_size = disk_free_space(substr($PATH, 0, 2));
    
} else {
    // Linux
    $disk_size = disk_total_space('/mnt/disk_raid1');
    $foler_size = foldersize($PATH);
}




$JSON['disk_size'] = sizeFormat($disk_size);
$JSON['disk_usage'] = sizeFormat($foler_size);

$JSON['disk_perc_usage'] = round($foler_size / $disk_size * 10000) / 100;

// $JSON['cache_size'] = sizeFormat(foldersize('/mnt/disk_raid1/cache/'));

echo json_encode($JSON);