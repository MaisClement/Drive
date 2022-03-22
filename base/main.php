<?php

function autoloader_js(){
    $js = [];
    $files = scandir('./view/js/');

    foreach($files as $file) {
        if (strpos($file, '.js'))
            require_once('./view/js/' . $file);
    }

    return $js;
}

?>