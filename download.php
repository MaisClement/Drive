<?php

    $PATH = file_get_contents('PATH.txt');
    $IP = file_get_contents('IP.txt');

if(isset($_GET['p'])){
    
    $filename = $PATH . $_GET['p'];

        if(file_exists($filename)) {

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header("Cache-Control: no-cache, must-revalidate");
        header("Expires: 0");
        header('Content-Disposition: attachment; filename="'.basename($filename).'"');
        header('Content-Length: ' . filesize($filename));
        header('Pragma: public');

        flush();

        readfile($filename);

        exit;
    
    } else {
        echo "File does not exist.";
    }

} else
    echo "Filename is not defined."
?>