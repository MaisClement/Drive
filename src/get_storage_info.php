<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');
header("Content-type:application/json");

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    // Windows
    $disk_size = disk_total_space(substr($PATH, 0, 2));
    $disk_free = disk_free_space(substr($PATH, 0, 2));
    $foler_size = foldersize($PATH);

} else {
    // Linux
    $disk_size = disk_total_space($PATH);
    $disk_free = disk_free_space($PATH);
    $foler_size = foldersize($PATH);
}

$json = array(
    'disk_size' => (String) $disk_size,
    'disk_free' => (String) $disk_free,
    'usage' => (String) $foler_size,
    'all' => (String) $foler_size,
);

echo json_encode($json);