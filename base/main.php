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

function check(){
    // Vérification librairie
    $testGD = get_extension_funcs("gd"); // Grab function list 
    if (!$testGD){
        return false;
        // "Librairie PHP-GD non installé. Certaines fonctionnalités risquent de ne pas etre opérationelle"
    }
    return true;
}

?>