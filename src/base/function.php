<?php

// ---

function ErrorMessage($http_code, $details = '')
{
    http_response_code($http_code);
    $json = array(
        'error' => array(
            'code' => (int) $http_code,
            'message' => (string) isset($GLOBALS['HTTP_CODE'][$http_code]) ? $GLOBALS['HTTP_CODE'][$http_code] : "",
            'details' => (string) $details == '' ? "" : $details,
        )
    );
    echo json_encode($json);
    exit;
}

function isFolderGotChild($dir)
{
    $dir = $dir . '/';
    if (!$files = scandir($dir))
        return false;

    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {

            if (is_dir($dir . $file)) {
                return true;
            }
        }
    }
}
function folderSize($dir)
{
    $count_size = 0;
    $count = 0;
    $dir_array = scandir($dir);
    foreach ($dir_array as $key => $filename) {
        if ($filename != ".." && $filename != ".") {
            if (is_dir($dir . "/" . $filename)) {
                $new_foldersize = foldersize($dir . "/" . $filename);
                $count_size = $count_size + $new_foldersize;
            } else if (is_file($dir . "/" . $filename)) {
                $count_size = $count_size + filesize($dir . "/" . $filename);
                $count++;
            }
        }
    }
    return $count_size;
}


function delTree($dir)
{
    $files = array_diff(scandir($dir), array('.', '..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}