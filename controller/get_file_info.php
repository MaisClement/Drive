<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$PATH = file_get_contents('./config/PATH.txt');
$HOST = file_get_contents('./config/HOST.txt');

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
function file_case($fileName, $caseSensitive) {
	if(file_exists($fileName)) {
		return $fileName;
	}
	if($caseSensitive) return false;

	// Handle case insensitive requests            
	$directoryName = dirname($fileName);
	$fileArray = glob($directoryName . '/*', GLOB_NOSORT);
	$fileNameLowerCase = strtolower($fileName);
	foreach($fileArray as $file) {
		if(strtolower($file) == $fileNameLowerCase) {
			return $file;
		}
	}
	return false;
}

if (isset($_GET['p'])){
    $path = $PATH . $_GET['p'];
    $path = file_case($path, false);

} else {
    $path = $PATH;
    $path = file_case($path, false);
}

$ImgExt = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

if (is_file($path)) {
    $JSON['time'] = date ("d/m/Y H:i:s", filemtime($path));
    $JSON['fulltime'] = filemtime($path);
    $JSON['size'] = sizeFormat(filesize($path));
    $JSON['fullsize'] = filesize($path);
    
    if(isset($_GET['s'])){
        
        $tpath = substr($path, 0, strrpos($path, '/')) . '/';
        $name = substr($path, strrpos($path, '/') + 1);
        $files = scandir($tpath);

        $JSON['path'] = $path;
        $JSON['name'] = $name;

        $y = false;
        $perc = 'null';
        $suiv = 'null';
        foreach ($files as $file){
            if (in_array(substr($file, strrpos($file, '.') + 1), $ImgExt)){
                if ($file == $name){
                    $y = true;

                } else if ($y == true){
                    $suiv = $file;
                    $y = false;
                    break;

                } else {
                    $perc = $file;
                }   
            }
        }

        $JSON['prec'] = $perc;
        $JSON['suiv'] = $suiv;
    }

} else {
    $JSON['error'] = 'No file';
}

echo json_encode($JSON);