<?php

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

   // ---  

if (isset($_GET['p'])){
    $path = $PATH . $_GET['p'];
    $chem = $_GET['p'];

} else {
    $path = $PATH;
    $chem = '';
}

if (!$files = scandir($path)){
    $path = $PATH;
    $chem = '';
    $files = scandir($path);
}

$i = 0;

$JSON['path'] = $chem;

foreach ($files as $file){
    if ($file != '.' && $file != '..'){

        if (is_dir($path . $file)){
            $JSON['files'][$i]['name'] = $file;
            $JSON['files'][$i]['type'] = 'dir';
            $JSON['files'][$i]['img'] = $IP . 'type/folder.png';
            $JSON['files'][$i]['customimg'] = $IP . 'type/folder.png';
            $JSON['files'][$i]['time'] = date ("d/m/Y H:i:s", filemtime($path . $file));
            $JSON['files'][$i]['fulltime'] = filemtime($path . $file);
                $size = folderSize($path . $file);
            $JSON['files'][$i]['size'] = sizeFormat($size);
            $JSON['files'][$i]['fullsize'] = $size;

        } else {
            $JSON['files'][$i]['name'] = substr($file, 0, strrpos($file, '.'));

            $type = strtolower(substr($file, strrpos($file, '.') + 1));
            $JSON['files'][$i]['type'] = $type;

            $JSON['files'][$i]['img'] = $IP . 'type/file.png';

            if ($type == 'png' || $type == 'jpg' || $type == 'jpeg') {
                $JSON['files'][$i]['customimg'] = $IP . 'getImg.php?p=' . $chem . $file;
            } else if (is_file('type/' . $type . '.png')) {
                $JSON['files'][$i]['customimg'] = $IP . 'type/' . $type . '.png';
            } else {
                $JSON['files'][$i]['customimg'] = $IP . 'type/file.png';
            }
            
            $JSON['files'][$i]['time'] = date ("d/m/Y H:i:s", filemtime($path . $file));
            $JSON['files'][$i]['fulltime'] = filemtime($path . $file);
            $JSON['files'][$i]['size'] = sizeFormat(filesize($path . $file));
            $JSON['files'][$i]['fullsize'] = filesize($path . $file);
        }

    }
    $i++;
}

//print_r($JSON);

echo json_encode($JSON);