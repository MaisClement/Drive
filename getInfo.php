<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

    $PATH = '/mnt/disk_raid1/files/';
    $IP = '//192.168.0.11/';

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

$JSON['disk_size'] = sizeFormat(disk_total_space('/mnt/disk_raid1'));
$JSON['disk_usage'] = sizeFormat(foldersize('/mnt/disk_raid1/'));

$JSON['disk_perc_usage'] = round(foldersize('/mnt/disk_raid1/') / disk_total_space('/mnt/disk_raid1') * 10000) / 100;

$JSON['cache_size'] = sizeFormat(foldersize('/mnt/disk_raid1/cache/'));

echo json_encode($JSON);