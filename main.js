ipath = 0;
PATH = [];
PATH[ipath] = '';
IMGLOAD = 0;
IMGTOTAL = 0;

ImgExt = 'png, jpg, jpeg, gif, webp';

IP = '//192.168.0.11/';

async function getFile(){
	var url = IP + 'getFile.php?p=' + PATH[ipath]; 
    var el = document.getElementById('el');
    var loader = document.getElementById('loader');
    var loaderimg = document.getElementById('loaderimg');
    var echo = '';

    loader.style.display = 'block';
    loaderimg.style.width = '0%';
    IMGLOAD == 0; IMGTOTAL = 0;

    var file = document.getElementById('file');
    var dir = document.getElementById('dir');
    if (typeof bckID !== 'undefined' && bckID) {
        bckID.style.border = "";
        bckID.style.backgroundColor = "";
        file.style.display = "none";
        dir.style.display = "none";
        bckID = '';
    }

	let response = await fetch(url);	
	if (response.status === 200) {
		DATA = await response.json();

        PATH[ipath] = DATA['path'];

        if (DATA['files'] == '[]'){
            echo = '<div style="text-align: center">Aucun élément</div>'

        } else {
            if (getCookieValue('displayInListMode') == 1)
                echo = echo + '<table><tr><td style="width: 50px;"></td><td><b>Nom</b></td><td><b>Dernière modification</b></td><td><b>Poids</b></td><tr>';

            for(file in DATA['files'] ){
                if (getCookieValue('displayInListMode') == 1){
                    if (DATA['files'][file]['type'] == 'dir'){
                        echo = echo + '<tr class="el dir list_btn">';

                    } else if (DATA['files'][file]['type'] == 'gif' || DATA['files'][file]['type'] == 'jpg' || DATA['files'][file]['type'] == 'jpeg'|| DATA['files'][file]['type'] == 'png'){
                        echo = echo + '<tr class="el files image list_btn">';
                        
                    } else {
                        echo = echo + '<tr class="el files list_btn">';
                    }

                    echo = echo + '<td><img src="' + DATA['files'][file]['img'] + '" onload="imgLoad()" onerror="imgError(this)"></td>';
                        IMGTOTAL++;

                    if ((DATA['files'][file]['img'] == 'type/file.png' || getCookieValue('displayExtension') == 1) && DATA['files'][file]['type'] != 'dir'){
                        echo = echo + '<td>' + DATA['files'][file]['name'] + '.' + DATA['files'][file]['type'] + '</td>';
                    } else {
                        echo = echo + '<td>' + DATA['files'][file]['name'] + '</td>';
                    }
                    echo = echo + '<td style="left: 50%;">' + DATA['files'][file]['time'] + '</td><td>' + DATA['files'][file]['size'] + '</td>';
                    if (DATA['files'][file]['type'] == 'dir'){
                        echo = echo + '<input type="hidden" name="name" value="' + DATA['files'][file]['name'] + '">';
                    } else {
                        echo = echo + '<input type="hidden" name="name" value="' + DATA['files'][file]['name'] + '.' + DATA['files'][file]['type'] + '">';
                    }     
                    echo = echo + '<input type="hidden" name="type" value="' + DATA['files'][file]['type'] + '">';
                    echo = echo + '<input type="hidden" name="img" value="' + DATA['files'][file]['img'] + '">';
                    echo = echo + '<input type="hidden" name="time" value="' + DATA['files'][file]['time'] + '">';
                    echo = echo + '<input type="hidden" name="fulltime" value="' + DATA['files'][file]['fulltime'] + '">';
                    echo = echo + '<input type="hidden" name="size" value="' + DATA['files'][file]['size'] + '">';
                    echo = echo + '<input type="hidden" name="fullsize" value="' + DATA['files'][file]['fullsize'] + '">';
                    echo = echo + '</tr>';

                } else {
                    if (DATA['files'][file]['type'] == 'dir'){
                        echo = echo + '<div class="el dir large_btn">';

                    } else if (DATA['files'][file]['type'] == 'gif' || DATA['files'][file]['type'] == 'jpg' || DATA['files'][file]['type'] == 'jpeg'|| DATA['files'][file]['type'] == 'png'){
                        echo = echo + '<div class="el files image large_btn">';
                        
                    } else {
                        echo = echo + '<div class="el files large_btn">';
                    }
                    echo = echo + ' <img src="' + DATA['files'][file]['customimg'] + '" onload="imgLoad()" onerror="imgError(this)">';
                        IMGTOTAL++;
                    echo = echo + ' <br>';
                    if ((DATA['files'][file]['img'] == 'type/file.png' || getCookieValue('displayExtension') == 1) && DATA['files'][file]['type'] != 'dir'){
                        echo = echo + DATA['files'][file]['name'] + '.' + DATA['files'][file]['type'];    
                    } else {
                        echo = echo + DATA['files'][file]['name'];
                    }

                    if (DATA['files'][file]['type'] == 'dir'){
                        echo = echo + '<input type="hidden" name="name" value="' + DATA['files'][file]['name'] + '">';
                    } else {
                        echo = echo + '<input type="hidden" name="name" value="' + DATA['files'][file]['name'] + '.' + DATA['files'][file]['type']  + '">';
                    }                    
                    echo = echo + '<input type="hidden" name="type" value="' + DATA['files'][file]['type'] + '">';
                    echo = echo + '<input type="hidden" name="img" value="' + DATA['files'][file]['img'] + '">';
                    echo = echo + '<input type="hidden" name="time" value="' + DATA['files'][file]['time'] + '">';
                    echo = echo + '<input type="hidden" name="fulltime" value="' + DATA['files'][file]['fulltime'] + '">';
                    echo = echo + '<input type="hidden" name="size" value="' + DATA['files'][file]['size'] + '">';
                    echo = echo + '<input type="hidden" name="fullsize" value="' + DATA['files'][file]['fullsize'] + '">';
                    echo = echo + '</div>';
                }
            }

            if (IMGTOTAL == 0){
                loader.style.display = 'none';
            }

            if (getCookieValue('displayInListMode') == 1)
                echo = echo + '</table>';          
        }
        el.innerHTML = echo;
        updatePath();
	} else {
        el.innerHTML = 'Une erreur s\'est produite';
    }
}
function updatePath(){
    var temppath = PATH[ipath]
    temppath.replace('//', '/');
    var search = '/';
    var path = document.getElementById('path');
    var echo = '<a class="path-link" onclick="changePath(\'\')">Accueil</a>';
    var chem = '';
    var folder = 'Accueil';

    while (temppath.indexOf(search) >= 0) {
        folder = temppath.substring(0, temppath.indexOf(search));
        chem += folder + '/';

        echo = echo + ' > <a class="path-link" onclick="changePath(\'' + chem.substring(0, chem.length -1) + '\')">' + folder + '</a>' ;

        temppath = temppath.substring(temppath.indexOf(search) + 1, temppath.length);
    }
    path.innerHTML = echo;

    window.history.pushState(ipath, 'Drive', IP + PATH[ipath]);
    window.document.title = folder +' - Drive';
}
async function changePath(id){
    ipath++;
    PATH[ipath] = id + '/';
    if (PATH[ipath] == '/'){
        PATH[ipath] = '';
    }
    await getFile();
}
async function backPath(){
    if (ipath != 0){
        ipath--;
        await getFile();
    }
}
async function BtnOpenFolder(){
    id = bckID.getElementsByTagName('input')[0].value;
    ipath++;
    PATH[ipath] = PATH[ipath -1] + id + '/';
    if (PATH[ipath] == '/'){
        PATH[ipath] = '';
    }
    await getFile();
}
async function select(e, data){
    var file = document.getElementById('file');
    var img = document.getElementById('img');
    var dir = document.getElementById('dir');
    
    if (!file.contains(e.target)){
        if (typeof bckID !== 'undefined' && bckID) {
            bckID.style.border = "";
            bckID.style.backgroundColor = "";
            file.style.display = "none";
            dir.style.display = "none";
            img.style.display = "none";
            //bckID = '';
        }       
        var el = e.target.parentElement.className;

        if (el.indexOf('file') >= 0 || el.indexOf('dir') >= 0){
            el = e.target.parentElement.className;
            var id = e.target.parentElement;

        } else {
            el = e.target.className;
            var id = e.target;

        }
        if (el.indexOf('file') >= 0 || el.indexOf('dir') >= 0){
            id.style.border = "#33A4E2 2px solid";
            id.style.backgroundColor = "#33A4E21F";

            if (el.indexOf('image') >= 0){
                img.style.display = "initial";
                file.style.display = "initial";

                if (typeof bckID !== 'undefined') {
                    if (bckID == id){
                        var name = bckID.getElementsByTagName('input')[0].value;
                        ipath++;
                        PATH[ipath] = PATH[ipath -1] + name;
                        if (PATH[ipath] == '/'){
                            PATH[ipath] = '';
                        }
                        await openImg(PATH[ipath]);
                    }
                }  

            } else if (el.indexOf('file') >= 0){
                file.style.display = "initial";

            } else {
                dir.style.display = "initial";

                if (typeof bckID !== 'undefined') {
                    if (bckID == id){
                        var val = bckID.getElementsByTagName('input');
                        ipath++;
                        PATH[ipath] = PATH[ipath - 1] + val[0].value + '/';
                        await getFile();
                    }
                }  
            }

            bckID = id;
        } else {
            bckID = '';
        }
    }
}

/* --- Remove --- */

function BtnShowRemoveBox(){
    var val = bckID.getElementsByTagName('input');
    var over = document.getElementById('overrm');
    var rmname = document.getElementById('rmname');
    var rmsrc = document.getElementById('rmsrc');
    var rmtime = document.getElementById('rmtime');
    var rmsize = document.getElementById('rmsize');

    over.style.display = 'block';
    ACTION = 'RM';
    rmname.innerHTML = val[0].value;
    rmsrc.src = val[2].value;
    rmtime.innerHTML = val[3].value;
    rmsize.innerHTML = val[5].value;
    ELNAME = val[0].value;
}
async function BtnRemoveElement(){
    var old = bckID;
    delete bckID;

    var url = IP + 'removeEl.php?p=' + PATH[ipath] + ELNAME; 
    delete ACTION;

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data != 'OK'){
            alert(data);
            await getFile();
        }
    }
    
    var el = document.getElementsByClassName('el');
    for (var i = 0; i < el.length; i++) {
        if (el[i] == old){
            if (el[i + 1]){
                bckID = el[i + 1];
                bckID.style.border = "#33A4E2 2px solid";
                bckID.style.backgroundColor = "#33A4E21F";
                break;
            } else if (el[i - 1]){
                bckID = el[i - 1];
                bckID.style.border = "#33A4E2 2px solid";
                bckID.style.backgroundColor = "#33A4E21F";
                break;
            }
        }
    }

    old.outerHTML = '';
    BtnHideRemoveBox();

}
function BtnHideRemoveBox(){
    var over = document.getElementById('overrm');
    over.style.display = 'none';
    delete ACTION;
}

/* --- Rename --- */

function BtnShowRenameBox(){
    var val = bckID.getElementsByTagName('input');
    ELNAME = val[0].value;
    
    let newname = prompt("Renommer le fichier", "");

    if (newname == null || newname == "") {
        newname = "User cancelled the prompt.";
    } else {
        BtnRenameElement(newname);
    } 
}
async function BtnRenameElement(newname){
    var url = IP + 'renameEl.php?p=' + PATH[ipath] + ELNAME + '&n=' + PATH[ipath] + newname ; 

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data == 'OK'){
            await getFile();
        } else {
            alert(data);
        }
    }
}

/* --- New Folder --- */

function BtnShowNewFoldBox(){
    var over = document.getElementById('overnewfold');
    var input = document.getElementById('newfold');

    over.style.display = 'block'
    input.focus();
}
async function BtnNewFoldElement(id){
    var input = document.getElementById('newfold');
    var url = IP + 'mkdir.php?p=' + PATH[ipath] + '&n=' + input.value ; 

    var bckinner = id.innerHTML;
    id.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xml:Hr="preserve"> <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" /></path> </svg>';

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data == 'OK'){
            await getFile();
            BtnHideNewFoldBox();
            id.innerHTML = bckinner;
            newname.value = '';
        } else {
            alert(data);
        }
    }
}
function BtnHideNewFoldBox(){
    var over = document.getElementById('overnewfold');
    over.style.display = 'none';
}

/* --- Upload --- */

function ShowOverlay(id){
    var el = document.getElementById(id);
    el.style.display = 'block';
}
function CloseOverlay(id){
    var el = document.getElementById(id);
    el.style.display = 'none';
}
function BtnShowUploadBox(){
    var over = document.getElementById('overupload');
    over.style.display = 'block';
}
function input(id, type){
    var list = document.getElementById('uploadList' + type);
    var echo = '';

    list.innerHTML = 'Préparation...';

    for (var i = 0; i < id.files.length; i++){        
        echo = echo + '<div class="overmouse" id="upload' + id.files[i].name + '">' + id.files[i].name + '</div>'
    }
    list.innerHTML = echo;
    console.log(id.files.length);
}
async function upload(type){
    CloseOverlay('overupload'); CloseOverlay('overuploadDir');  CloseOverlay('overuploadFile'); 
    var id = document.getElementById('fileupload' + type);
    var bck = document.getElementById('uploadbck');
    var perc = document.getElementById('uploadperc');
    var status = document.getElementById('uploadstatus');
    var info = document.getElementById('uploadinfo');

    info.innerHTML = '<i> Préparation... </i>';

    id.style.display = 'none';
    bck.style.display = 'block';
    perc.style.display = 'block';
    perc.style.backgroundColor = '#005BA1';
    status.style.display = 'block';
    perc.className = 'wait';
    perc.style.width = '0%';
    
    var path = PATH[ipath];
    var d = new Date();
    NTIME = d.getTime();    
    TOTALSIZE = 0; 
    UPLOADSIZE = 0;
    FILES = []; FILESERROR = [];
    TYPE = type;

    var y = 0;
    for (var i = 0; i < id.files.length; i++){ 
/*
        
        if (type == 'dir'){
            json[i] = path + id.files[i].webkitRelativePath;

        } else {
            json[i] = path + id.files[i].name; 
            
        }   
    }

        json = JSON.stringify(json);

        let formData = new FormData();
        formData.append('p', json);

        url = IP + 'getFileInfo.php?p=' + PATH[ipath] + id.files[i].name; 

        let response = await fetch('_account2', {
                                            method: 'post',
                                            body: formData
                                            });	
        if (response.status === 200) {
            let data = await response.json();
                
            if(data == 'OK'){

        //---------------------
 
        url = IP + 'getFileInfo.php?p=' + PATH[ipath] + id.files[i].name; 

        let response = await fetch(url);		
        if (response.status === 200) {
            var data = await response.json();

            if (typeof data['error'] !== 'undefined'){
                if ( data['error'] == 'No file'){
                    FILES[y] = [];    
                    FILES[y]['name'] = id.files[i].name
                    FILES[y]['path'] = path;
                    FILES[y]['file'] = id.files[i];
                    FILES[y]['size'] = id.files[i].size;
                    TOTALSIZE += id.files[i].size;
                    console.log('no file');
                    y++;
                }
            } else if (data['fullsize'] == id.files[i].size && data['size'] == id.files[i].lastModified) {
                console.log('fichier ignoré')
            } else {
                console.log('qqhc')
            }


        }*/
        FILES[y] = [];    
        FILES[y]['name'] = id.files[i].name
        if (type == 'dir'){
            FILES[y]['path'] = path + id.files[i].webkitRelativePath.replace(id.files[i].name, '');
        } else {
            FILES[y]['path'] = path;
        }        
        FILES[y]['file'] = id.files[i];
        FILES[y]['size'] = id.files[i].size;
        TOTALSIZE += id.files[i].size;
        y++;
    }
    perc.className = '';
    alternate();
    doFile();
}
async function doFile(){
    var avv = document.getElementById('uploadperc');
    var timer = document.getElementById('timer');
    var perc = document.getElementById('perc');
    var info = document.getElementById('uploadinfo');
    var id = document.getElementById('fileupload' + TYPE);

    if (FILES.length >= 1) {
        await sendFile(FILES[0]['file'], FILES[0]['name'], FILES[0]['path'], FILES[0]['size']);

        var d = new Date();
        var speed = UPLOADSIZE / (d.getTime() - NTIME);

        avv.style.width = ((UPLOADSIZE / TOTALSIZE) * 100) + '%';
        
        var remain = Math.ceil(((TOTALSIZE - UPLOADSIZE)/speed) / 600);
        remain = Math.floor(remain / 5) *5;
        if (remain == 5 || remain == 0)
            remain = 'Quelques secondes...';
        else if (remain >= 3600)
            remain = Math.floor(remain / 3600) + ' Heures ' + Math.floor((remain % 3600)  / 60) + ' minutes restantes';
        else if (remain >= 60)
            remain =  Math.floor(remain / 60) + ' Minutes ' + Math.floor(remain % 60) + ' secondes restantes';
        else
            remain = remain + ' secondes restantes'

        timer.innerHTML = remain;
        perc.innerHTML = Math.round((UPLOADSIZE / TOTALSIZE) * 100) + ' %';    
        window.document.title = Math.round((UPLOADSIZE / TOTALSIZE) * 100) + ' % | Envoi en cours... - Drive';

    } else {
        if (FILESERROR.length == 0){
            avv.style.backgroundColor = '#189A2E';
            avv.style.width = '100%';
            info.innerHTML = 'Terminé ! <i> Sans erreur </i>';
            timer.innerHTML = '';
            perc.innerHTML = '';
            timer.style.display = 'none';
            perc.style.display = 'none';
            id.style.display = 'block';
            window.document.title = '100 % | Terminé ! - Drive';

            setTimeout('document.getElementById("uploadperc").style.backgroundColor = "#820282";', 4500);
            setTimeout('hideUploadStatus()', 5000);
            setTimeout('window.document.title = "Drive"', 5000);
        } else {
            avv.style.backgroundColor = '#C61515';
            avv.style.width = '100%';
            info.innerHTML = 'Terminé ! <i> Avec ' + (FILESERROR.length) + ' erreur(s) </i>';
            timer.innerHTML = '';
            perc.innerHTML = '';
            timer.style.display = 'none';
            perc.style.display = 'none';
            id.style.display = 'block';
            
            
            setTimeout('document.getElementById("uploadperc").style.backgroundColor = "#820282";', 9500);
            setTimeout('hideUploadStatus()', 10000);
        }

        await getFile();
    }
}
async function sendFile(file, name, path, size){    
    var avv = document.getElementById('uploadperc');
    var bck = document.getElementById('uploadbck');
    var info = document.getElementById('uploadinfo');

    var filel = document.getElementById('upload' + name);

    bck.style.backgroundColor = '';
    avv.style.backgroundColor = '';

    if (filel){
        filel.className = 'overmouse uploadtransfert';
    }
    info.innerHTML = 'Envoi de <i>' + name + '</i>...';

    let formData = new FormData();
    formData.append('n', name);
    formData.append('p', path);
    formData.append('file', file);

    url = IP + 'upload.php'; 

    let response = await fetch(url, {
                                    method: 'post',
                                    body: formData
                                    });		
    if (response.status === 200) {
        var data = await response.text();

        if(data == 'OK'){
            document.getElementById('upload' + name).outerHTML = '';            
            FILES.shift();
            doFile();
        } else {
            bck.style.backgroundColor = '#C61515';
            avv.style.backgroundColor = '#930F0F';
            info.innerHTML = 'Echec de l\'envoi du fichier <i>' + name + '</i>';

            document.getElementById('upload' + name).className = 'overmouse';
            document.getElementById('upload' + name).style.backgroundColor = '#930F0F99';
            
            FILES.shift();
            FILESERROR.push(name);
            setTimeout('doFile()', 3000);
        }
    } else {
        //do
    }

    UPLOADSIZE += size;
}
function hideUploadStatus() {
    var bck = document.getElementById('uploadbck');
    var perc = document.getElementById('uploadperc');
    var status = document.getElementById('uploadstatus');

    bck.style.display = 'none';
    perc.style.display = 'none';
    status.style.display = 'none';
}
function alternate(){
    var perc = document.getElementById("perc")
    var timer = document.getElementById('timer');
    var uploadstatus = document.getElementById('uploadstatus');

    if (uploadstatus.style.display == 'block'){
        if (perc.style.display == 'none'){
            perc.style.display = 'block';
            timer.style.display = 'none';
        } else {
            perc.style.display = 'none';
            timer.style.display = 'block';
        }
        setTimeout('alternate()', 3000);
    }
}

/* --- Keyboard control */

async function test(el){
    var file = document.getElementById('file');
    var dir = document.getElementById('dir');

    console.log(el.keyCode)

    if (document.getElementById('explorer').style.display != 'none'){
        if (typeof ACTION !== 'undefined'){
            if (el.keyCode == 13){ // Enter
                if (ACTION == 'RM'){
                    BtnRemoveElement(document.getElementById('rmbtn'));
                }
            } else if (el.keyCode == 27){ // Echap
                if (ACTION == 'RM'){
                    BtnHideRemoveBox();
                }
            } 
        } else {
            if (el.keyCode == 38 || el.keyCode == 37){ // Haut et gauche
                var el = document.getElementsByClassName('el');
                for (var i = 0; i < el.length; i++) {
                    if (el[i] == bckID){
                        if (el[i - 1]){
                            bckID.style.border = "";
                            bckID.style.backgroundColor = "";
                            file.style.display = "none";
                            dir.style.display = "none";
                            bckID = el[i - 1];
                            bckID.style.border = "#33A4E2 2px solid";
                            bckID.style.backgroundColor = "#33A4E21F";
                            if (bckID.className.indexOf('file') >= 0){
                                file.style.display = "initial";
                
                            } else {
                                dir.style.display = "initial";
                            }
                            break;
                        }
                    }
                }
            }
            if (el.keyCode == 39 || el.keyCode == 40){ // Has et droite
                var el = document.getElementsByClassName('el');
                for (var i = 0; i < el.length; i++) {
                    if (el[i] == bckID){
                        if (el[i + 1]){
                            bckID.style.border = "";
                            bckID.style.backgroundColor = "";
                            file.style.display = "none";
                            dir.style.display = "none";
                            bckID = el[i + 1];
                            bckID.style.border = "#33A4E2 2px solid";
                            bckID.style.backgroundColor = "#33A4E21F";
                            if (bckID.className.indexOf('file') >= 0){
                                file.style.display = "initial";
                
                            } else {
                                dir.style.display = "initial";
                            }
                            break;
                        }
                    }
                }
            }
            if (el.keyCode == 13){ // Enter
                if (bckID.className.indexOf('dir') >= 0){
                    BtnOpenFolder();
                } 
            } else if (el.keyCode == 46){ // Suppr
                if (bckID.className.indexOf('el') >= 0){
                    BtnShowRemoveBox();
                }
            }
            if (el.keyCode == 8){ // Haut et gauche
                await backPath();
            }
        }
    } else if (document.getElementById('viewer').style.display != 'none'){
        if (typeof IMGPERC !== 'undefined' && el.keyCode == 37){
            await viewerbck();

        } else if (typeof IMGSUIV !== 'undefined' && el.keyCode == 39){
            await viewerfor();

        } else if (el.keyCode == 27){
            exitviewer();
        }
    }
}

/* --- Info -- */

async function showInfo(){
    document.getElementById('infos').style.display = 'block';
    document.getElementById('det').style.right = '0px';
    await getInfo();
}
function hideInfo(){
    document.getElementById('infos').style.display = 'none';
    document.getElementById('det').style.right = '-100%';
}
async function getInfo(){
    var det = document.getElementById('det');

    var echo = "";
    var url = IP + 'getInfo.php';

    let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.json();

        document.getElementById('disk_size').innerHTML = data['disk_size'];
        document.getElementById('disk_usage').innerHTML = data['disk_usage'];
        document.getElementById('disk_perc_usage').style.width = data['disk_perc_usage'] + "%";
        document.getElementById('disk%').innerHTML = data['disk_perc_usage'] + " %";
        document.getElementById('cache_size').innerHTML = data['cache_size']; 

        if (data['disk_perc_usage'] <= 80){
            document.getElementById('disk_perc_usage').style.backgroundColor = "#33A4E2"
        } else {
            document.getElementById('disk_perc_usage').style.backgroundColor = "#f43838"
        }
    }   
    
}

/* --- Image --- */

function imgLoad(){
    var loaderimg = document.getElementById('loaderimg');
    var loader = document.getElementById('loader');
    IMGLOAD++;
    loader.style.display = 'none';
    if (IMGLOAD >= IMGTOTAL){
        loaderimg.style.width = '100%';
        loaderimg.style.opacity = '0';
        IMGLOAD = 0; IMGTOTAL = 0;

    } else {
        var perc = (IMGLOAD / IMGTOTAL) * 100
        loaderimg.style.opacity = '1';
        loaderimg.style.width = perc + '%';
    }
}
function imgError(id){
    id.src = IP + '/type/error.png';
}
async function openImg(val){
    document.getElementById('explorer').style.display = 'none';
    document.getElementById('viewer').style.display = 'block';

    var name = val.substring( val.lastIndexOf('/') + 1 );
    document.getElementById('imgname').innerHTML = name;
    document.getElementById('imghname').innerHTML = '';

    document.getElementById('imgloader').style.display = 'block';
    document.getElementById('imgReader').style.display = 'block';

    var url = IP + 'getContent.php?p=' + val.substring(0,  val.length );
    document.getElementById('viewimg').src = url;

    var img = document.getElementById('img');
    img.style.display = "none";

    var url = '/getFileInfo.php?s=1&p=' + val.substring(0,  val.length );
    let response = await fetch(url);	
	if (response.status === 200) {
		DATA = await response.json();

        document.getElementById('imghname').innerHTML = DATA['time'] + ' • ' + DATA['size'];

        if (DATA['prec'] != 'null'){
            IMGPERC = DATA['prec'];
            document.getElementById('viewerbck').style.display = 'block';

        } else {
            delete IMGPERC;
            document.getElementById('viewerbck').style.display = 'none';
            
        }
        if (DATA['suiv'] != 'null'){
            IMGSUIV = DATA['suiv'];
            document.getElementById('viewerfor').style.display = 'block';

        } else {
            delete IMGSUIV;
            document.getElementById('viewerfor').style.display = 'none';
            
        }
    }

    window.history.pushState(ipath, 'Drive', IP + val);
    window.document.title = name +' - Drive';
}
async function viewerbck(){
    await openImg(PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') + 1 ) + IMGPERC);
}
async function viewerfor(){
    await openImg(PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') + 1 ) + IMGSUIV);
}
function stopImgLoader(){
    document.getElementById('imgloader').style.display = 'none';

    ARROWTIMEOUT = setTimeout('hidearrow()', 3000);
}
function viewtest(){
    document.getElementById('viewerbck').style.opacity = '1';
    document.getElementById('viewerfor').style.opacity = '1';

    clearTimeout(ARROWTIMEOUT);
    ARROWTIMEOUT = setTimeout('hidearrow()', 3000);
}
function hidearrow(){
    document.getElementById('viewerbck').style.opacity = '0';
    document.getElementById('viewerfor').style.opacity = '0';
}
async function exitviewer (){
    document.getElementById('explorer').style.display = 'block';
    document.getElementById('viewer').style.display = 'none';

    document.getElementById('viewimg').src = ''

    var path = PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') );
    await changePath(path);
}
function fullscreen(){
    var el = document.getElementById('viewer');
    if (el.requestFullscreen) {
        el.requestFullscreen();
    }

    document.getElementById('fullscreen').style.display = 'none';
    document.getElementById('exitfullscreen').style.display = 'block';
}
function exitfullscreen(){
    document.exitFullscreen();
    document.getElementById('fullscreen').style.display = 'block';
    document.getElementById('exitfullscreen').style.display = 'none';
}

/* --- Ecriture de cookie --- */

async function setSettingsCookie(el){
    if (el.checked){
        var value = 1;
    } else {
        var value = 0;
    }
    document.cookie = el.id + '=' + value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/'; 
    await getFile();
}
function getCookieValue(name) {
    const nameString = name + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })
    if (value.length) {
        var response = value[0].substring(nameString.length, value[0].length)
        if (response.substring(0, 1) == '='){
            response = response.substring(1)
        }
        return (response)
    } else {
        return false
    }
}

/* --- On lit l'url pour le premier chargement --- */

var href = window.location.href;
href = href.substring( href.indexOf(IP) + IP.length );
if (href.indexOf('.') > IP.length){
    var ext = href.toLowerCase().substring( href.indexOf('.') + 1);
    
    if (i = ext.indexOf(ImgExt)){
        PATH[ipath] = href;
        openImg(href);
    }
} else {

    if (href.charAt(href.length -1) != '/'){
        href = href + '/';
    }
    if (href == '/'){
        href = '';
    }
    PATH[ipath] = href;

    /* --- On initialise les cookie --- */
    if (getCookieValue('displayExtension') == 1){
        document.getElementById('displayExtension').checked = true;
    }
    if (getCookieValue('displayInListMode') == 1){
        document.getElementById('displayInListMode').checked = true;
    }

    getFile();
}