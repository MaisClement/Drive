<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

function FormatName($name){
    $search = array(" ", "-", "_", "/", "\\", "\'", "À", "Á", "Â", "Ã", "Ä", "Å", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ò", "Ó", "Ô", "Õ", "Ö", "Ù", "Ú", "Û", "Ü", "Ý", "à", "á", "â", "ã", "ä", "å", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ò", "ó", "ô", "õ", "ö", "ù", "ú", "û", "ü", "ý", "ÿ");
    $replace = array("",  "",  "",  "",  "",    "",  "A", "A", "A", "A", "A", "A", "C", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "Y", "a", "a", "a", "a", "a", "a", "c", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u", "y", "y");
    $name = str_replace($search, $replace, $name);
    $name = strtolower($name);

    return $name;
}

function search($dir, $query) {
    $json = '';
    $files = array_diff(scandir($dir), array('.','..'));
        foreach ($files as $file) {
            if (is_dir("$dir/$file")){

                $json .= search("$dir/$file", $query);

                    // Obligé de rajouter un espace => echo strpos('btsblanc', 'bts'); // Retourn 0
                if (strpos(' ' . FormatName($file), FormatName($query)))
                    $json .= '"' . $dir . '/' . $file . '.dir",';
                
            } else {
                if (strpos(FormatName($file), FormatName($query)))
                    $json .= '"' . $dir . '/' . $file . '",';
                
            }
        }
        return $json;
} 

$PATH = file_get_contents('./config/PATH.txt');
$HOST = file_get_contents('./config/HOST.txt');

$query = $_GET['q'];

if (!isset($_GET['q']) || $_GET['q'] == ''){
    echo '[]'; exit;
}

$json = '[';
$json .= search($PATH, $query);
$json = substr($json, 0, strlen($json) -1);

$json = str_replace($PATH, '', $json);
$json .= ']';

if ($json == ']')
    $json = '[]';

echo $json;