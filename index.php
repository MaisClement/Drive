<?php
    $PATH = file_get_contents('PATH.txt');
    $IP = file_get_contents('IP.txt');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="<?php echo $IP ?>main.css" type="text/css">
    <title>Drive</title>
</head>
<body onkeydown="test(event)">
    <el id="explorer">
        <header>
            <div style="width: 100px;">
                <img src="<?php echo $IP ?>img/ftp.png">
                <span>Drive</span>
            </div>

            <div class="search" onclick="searchfocus()" onblur="hide_search()">
                <div class="input">
                    <img src="<?php echo $IP ?>img/search_blue.png" />
                    <input
                        id="searchtext"
                        type="text" 
                        placeholder = "Recherche"
                        value = ""
                        autocomplete="false"
                        onchange = "search(this)"
                        onkeydown = "search(this)"
                    />
                </div>
                    <br>
                <table class="result" id="result"></table>
            </div>
            
            <div style="width: 120px;">
                <img src="<?php echo $IP ?>img/menu.png" class="menu" onclick="showInfo()">
            </div>
        </header>

        

        <div id="uploadbck"    style="display: none;"></div>
        <div id="uploadperc"   style="display: none;"></div>
        <div id="uploadstatus" style="display: none;"><span id="uploadinfo"  style="float: left;"></span><span style="float: right;" id="timer"></span><span id="perc" style="float: right"></span></div>

        <div class="options" id="options" style="display: inline-block;">
            <div class="small_fluent_btn" onclick="getFile()" style="width: 39px">
                <img class="svg" src="<?php echo $IP ?>img/reset.svg">
            </div>
            <div class="small_fluent_btn" onclick="BtnShowNewFoldBox(this)" style="width: 39px;">
                <img class="svg" src="<?php echo $IP ?>img/new-folder.png">
            </div>
            <div class="small_fluent_btn" onclick="BtnShowUploadBox()" style="width: 39px">
                <img class="svg" src="<?php echo $IP ?>img/upload.png">
                <i id="loader3" class="loader-3" style="display: none"></i>
            </div>
            <span style="background-color: #777;border-radius: 5px;width: 2px;height: 30px;display: inline-block;"></span>
        </div>

        <span id="img" style="display: none">
            <div class="small_fluent_btn" onclick="viewImg()" style="width: 100px">
                <img class="svg" src="<?php echo $IP ?>img/directory.png"><span style="opacity: 1;">Ouvrir</span>
            </div>
        </span>

        <span id="other" style="display: none">
            <div class="small_fluent_btn" onclick="viewOther()" style="width: 135px">
                <img class="svg" src="<?php echo $IP ?>img/download.png"><span style="opacity: 1;">Télécharger</span>
            </div>
        </span>

        <span id="file" style="display: none">
            <div class="small_fluent_btn" onclick="BtnShowRemoveBox()" style="width: 190px">
                <img src="<?php echo $IP ?>img/delete-file.png"><span style="opacity: 1;">Supprimer le fichier</span>
            </div>
            <div class="small_fluent_btn" onclick="BtnShowRenameBox()" style="width: 130px">
                <img class="svg" src="<?php echo $IP ?>img/edit-file.png"><span style="opacity: 1;">Renommer</span>
            </div>
        </span>

        <span id="dir" style="display: none">
            <div class="small_fluent_btn" onclick="BtnOpenFolder()" style="width: 100px">
                <img class="svg" src="<?php echo $IP ?>img/directory.png"><span style="opacity: 1;">Ouvrir</span>
            </div>
            <div class="small_fluent_btn" onclick="BtnShowRemoveBox()" style="width: 190px">
                <img src="<?php echo $IP ?>img/delete-folder.png"><span style="opacity: 1;">Supprimer le dossier</span>
            </div>
            <div class="small_fluent_btn" onclick="BtnShowRenameBox()" style="width: 130px">
                <img class="svg" src="<?php echo $IP ?>img/edit-file.png"><span style="opacity: 1;">Renommer</span>
            </div>
        </span>
        
            <br>

        <div class="small_fluent_btn" onclick="backPath(this)" style="width: 39px">
            <img class="svg" src="<?php echo $IP ?>img/left.png">
        </div>
        <div class="small_fluent_btn path" id="path"></div>

        <hr style="border: 1px solid #820282;">   
        <i id="loader" class="loader-4"></i>
        <div id="loaderimg" class="loaderimg"></div>

        <div id="el" onclick="select(event)" ondrop="DropFile(event);" ondragover="onDragOverFile(event);" ondragleave="onDragLeaveFile()"></div>

        <div class="over-back" id="infos" onclick="hideInfo()"></div>
        <div class="info-box" id="det">            
            <span onclick="hideInfo()" style="text-align: right;cursor: pointer;display: block;"><span style="font-size: 20px;" onclick="hideInfo()">×</span> Fermer</span>
            <span class="Options">Espace disque </span> <br><br>
            
            <div class="Size-Barre" style="background-color: #ffffff20"></div>
            <div class="Size-Barre" id="disk_perc_usage" style="background-color: #33A4E2; top: -10px; z-index:3; width: 0"></div>
                <br>
            <span class="Color-Size" style="background-color: #4f474e;"></span>
            <span class="Light"> Total disponible</span> <span id="disk_size" class="val">...</span>
                <br> <span class="Light"> Utilisé </span> <span id="disk_usage" class="val">...</span>
                <br> <span class="Light"> Soit </span> <span id="disk%" class="val">...</span>

                <br><br><hr><br> 
            <span class="Options">Paramètres</span>
            <br> <span class="Light"> Afficher les extensions </span> 
                <label class="toggle-control"> <input type="checkbox" id="displayExtension" onclick="setSettingsCookie(this)"> <span class="control"></span> </label>

            <br> <span class="Light"> Affichage Liste </span> 
                <label class="toggle-control"> <input type="checkbox" id="displayInListMode" onclick="setSettingsCookie(this)"> <span class="control"></span> </label>

                <br><br><hr><br> 
            <span class="Options">À propos</span> <br> <br> 
            <a href="https://icones8.fr/" target="_blank" class="linkblue"> Icones par Icones8</a>
                <br> 
            <a href="https://www.php.net/manual/fr/book.imagick.php" target="_blank" class="linkblue"> Using ImageMagick </a>
                <br> <br> 
            <span> Version 1.2.1 </span> 
            
            
        </div>

        <div class="over-back" id="overrm" style="display: none;">
            <div class="over-box">
                <h1>Suppression</h1>
                Vous étes sur le point de supprimer l'élement <b id="rmname">***</b>
                    <br><br>
                <img src="" id="rmsrc">            
                <div style="position: relative; top: -70px;left: 160px;">
                    Poids approximatif : <b id="rmsize">***</b>
                        <br>
                    Dernière modification : <b id="rmtime">***</b>
                    <br>
                </div>
                <div style="position: absolute;width: 90%;bottom: 25px;">
                    <div class="small_fluent_btn" onclick="BtnHideRemoveBox()" style="width: 120px;display: inline-block;">
                        <img class="svg" src="<?php echo $IP ?>img/cancel.png" class="svg"><span style="opacity: 1;">Annuler</span>
                    </div>
                    <div style="background-color: #FF7676; border-radius: 10px;float: right;width: 135px;">
                        <div class="small_fluent_btn" onclick="BtnRemoveElement(this)" style="width: 130px;">
                            <img src="<?php echo $IP ?>img/trash.png" class="svg" id="rmbtn"><span style="opacity: 1;">Supprimer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="over-back" id="overnewfold" style="display: none;">
            <div class="over-box">
                <h1>Nouveau dossier</h1>
                <span class="text">
                    <input type="text" id="newfold" placeholder="Nouveau dossier">
                </span>
                    
                <div style="position: absolute;width: 90%;bottom: 25px;">
                    <div class="small_fluent_btn" onclick="BtnHideNewFoldBox()" style="width: 120px;display: inline-block;">
                        <img class="svg" src="<?php echo $IP ?>img/cancel.png" class="svg"><span style="opacity: 1;">Annuler</span>
                    </div>
                    <div style="background-color: #94FF76; border-radius: 10px;float: right;width: 135px;">
                        <div class="small_fluent_btn" onclick="BtnNewFoldElement(this)" style="width: 130px;">
                            <img src="<?php echo $IP ?>img/new-folder.png" class="svg"><span style="opacity: 1;">Créer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="over-back" id="overupload" style="display: none;">
            <div class="over-box">
                <h1>Que voulez vous envoyez ?</h1>
            
                <div style="display: flex">

                    <div class="large_btn" onclick="CloseOverlay('overupload'); ShowOverlay('overuploadDir');">
                        <img src="<?php echo $IP ?>type/folder.png"> 
                            <br>
                        Dossier
                    </div>
                    <div class="large_btn" onclick="CloseOverlay('overupload'); ShowOverlay('overuploadFile');">
                        <img src="<?php echo $IP ?>type/file.png"> 
                            <br>
                        Fichier
                    </div>
                </div>
                    
                <div style="position: absolute;width: 90%;bottom: 25px;">
                    <div class="small_fluent_btn" onclick="CloseOverlay('overupload')" style="width: 120px;display: inline-block;">
                        <img class="svg" src="<?php echo $IP ?>img/cancel.png" class="svg"><span style="opacity: 1;">Annuler</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="over-back" id="overuploadDir" style="display: none;">
            <div class="over-box">
                <h1>Envoi de dossier</h1>
            
                <span class="text">
                    <input type="file" id="fileuploaddir" onchange="input(this, 'dir')" multiple webkitdirectory>
                </span>

                <div id="uploadinfo"></div>

                <div style="position: initial; overflow-y: scroll;margin-top: 15px;max-height: 250px;overflow-x: hidden;">
                    <div id="uploadListdir"> </div>
                </div>
                    
                <div style="position: absolute;width: 90%;bottom: 25px;">
                    <div class="small_fluent_btn" onclick="CloseOverlay('overuploadDir')" style="width: 120px;display: inline-block;">
                        <img class="svg" src="<?php echo $IP ?>img/cancel.png" class="svg"><span style="opacity: 1;">Annuler</span>
                    </div>
                    <div style="background-color: #94FF76; border-radius: 10px;float: right;width: 135px;">
                        <div class="small_fluent_btn" onclick="upload('dir')" style="width: 130px;">
                            <img src="<?php echo $IP ?>img/upload.png" class="svg"><span style="opacity: 1;">Envoyer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="over-back" id="overuploadFile" style="display: none;">
            <div class="over-box">
                <h1>Envoi de fichier</h1>
            
                <span class="text">
                    <input type="file" id="fileuploadfile" onchange="input(this, 'file')" multiple>
                </span>

                <div id="uploadinfo"></div>

                <div style="position: initial; overflow-y: scroll;margin-top: 15px;max-height: 250px;overflow-x: hidden;">
                    <div id="uploadListfile"> </div>
                </div>
                    
                <div style="position: absolute;width: 90%;bottom: 25px;">
                    <div class="small_fluent_btn" onclick="CloseOverlay('overuploadFile')" style="width: 120px;display: inline-block;">
                        <img class="svg" src="<?php echo $IP ?>img/cancel.png" class="svg"><span style="opacity: 1;">Annuler</span>
                    </div>
                    <div style="background-color: #94FF76; border-radius: 10px;float: right;width: 135px;">
                        <div class="small_fluent_btn" onclick="upload('file')" style="width: 130px;">
                            <img src="<?php echo $IP ?>img/upload.png" class="svg"><span style="opacity: 1;">Envoyer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el>

    <el id="viewer" onmousemove="viewtest(event)" style="display: none">
        <header>
            <img src="<?php echo $IP ?>img/delete.png" style="float: right; cursor: pointer;height: 40px;padding-top: 6px;" onclick="exitviewer()">
            <span id="imgname"></span>
                <br>
            <span id="imghname" style="font-size: 15px;top: 5px;"></span>
            
        </header>

        <i id="imgloader" class="loader-4" style="z-index: 2;"></i>

        <div class="imgReader" id="imgReader">
            <img id="viewimg" class="img" onload="stopImgLoader()">
            <span id="viewerbck" class="viewarrow"  onclick="viewerbck()">
                <img src="<?php echo $IP ?>/img/back.png">
            </span>
            <span id="viewerfor" class="viewarrow" onclick="viewerfor()" style="right: 0px;"> 
                <img src="<?php echo $IP ?>/img/forward.png">
            </span>
        </div>
    </el>
</body>

    <script>
        IP = "<?php echo $IP; ?>";
    </script>
    <script src="<?php echo $IP ?>main.js"></script>
</html>