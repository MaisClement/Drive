<?php

if (isset($_GET['p']) && $_GET['p'] != '') {
    $name = $_GET['p'];

    if (is_file('/mnt/disk_raid1/files/' . $name)) {
        header("content-type: image/jpeg"); 
        $img = file_get_contents('/mnt/disk_raid1/files/' . $name);
        echo $img;

    } 
}

?>
