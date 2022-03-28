ipath = 0;
PATH = [];
PATH[ipath] = '';
IMGLOAD = 0;
IMGTOTAL = 0;

const img_extension = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

async function get_file(){
	var url = IP + '?ctrl=get_file&p=' + PATH[ipath]; 
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

        console.log(DATA['files']);

        if (DATA['files'] === []){
            let domel = document.createElement("div")
            .innerHTML = 'Aucun élément'
            .style.textAlign = 'center'
            .appendChild(domel); 

        } else {
            if (get_cookie_value('displayInListMode') == 1)
                echo = echo + '<table><tr><td style="width: 50px;"></td><td><b>Nom</b></td><td><b>Dernière modification</b></td><td><b>Poids</b></td><tr>';

            for(file in DATA['files'] ){
                if (get_cookie_value('displayInListMode') == 1){
                    if (DATA['files'][file]['type'] == 'dir'){
                        echo = echo + '<tr class="el dir list_btn">';

                    } else if (DATA['files'][file]['type'] == 'gif' || DATA['files'][file]['type'] == 'jpg' || DATA['files'][file]['type'] == 'jpeg'|| DATA['files'][file]['type'] == 'png'){
                        echo = echo + '<tr class="el files image list_btn">';
                        
                    } else {
                        echo = echo + '<tr class="el files other list_btn">';
                    }

                    echo = echo + '<td><img src="' + DATA['files'][file]['img'] + '" onload="file_ico_load()" onerror="file_ico_catch_load(this)"></td>';
                        IMGTOTAL++;

                    if ((DATA['files'][file]['img'] == 'view/type/file.png' || get_cookie_value('displayExtension') == 1) && DATA['files'][file]['type'] != 'dir'){
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
                    echo = echo + ' <img src="' + DATA['files'][file]['customimg'] + '" onload="file_ico_load()" onerror="file_ico_catch_load(this)">';
                        IMGTOTAL++;
                    echo = echo + ' <br>';
                    if ((DATA['files'][file]['img'] == 'view/type/file.png' || get_cookie_value('displayExtension') == 1) && DATA['files'][file]['type'] != 'dir'){
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

            if (get_cookie_value('displayInListMode') == 1)
                echo = echo + '</table>';          
        }
        el.innerHTML = echo;
        update_path();
	} else {
        let el = document.createElement("div");
        el.innerHTML = 'Une erreur s\'est produite';
        el.style.textAlign = 'center';
        el.appendChild(el); 
    }
}
function update_path(){
    let temppath = PATH[ipath].replace('//', '/');

    const search = '/';
    const path = document.getElementById('path');

    path.innerHTML = '';

    let chem = '';
    let folder = 'Accueil';

    let domel = document.createElement("a");
        domel.innerHTML = 'Accueil';
        domel.style.textAlign = 'center';
        domel.className = 'path-link';
        domel.onclick = function () {
            change_path('');
        };
        path.appendChild(domel); 

    let i = 0;

    while (temppath.indexOf(search) >= 0) {
        folder = temppath.substring(0, temppath.indexOf(search));
        chem += folder + '/';

            domel[i] = document.createElement("a");
            domel[i].innerHTML = ' > ';
            path.appendChild(domel[i]);

            i++;

            domel[i] = document.createElement("a");
            domel[i].innerHTML = folder;
            domel[i].style.textAlign = 'center';
            domel[i].className = 'path-link';
            domel[i].addEventListener( 'click', function(){
                change_path(chem.substring(0, chem.length -1));
            } );
            path.appendChild(domel[i]);

            i++;

        temppath = temppath.substring(temppath.indexOf(search) + 1, temppath.length);
    }
    window.history.pushState(ipath, 'Drive', IP + PATH[ipath]);
    window.document.title = folder +' - Drive';
}
async function change_path(id){
    ipath++;
    PATH[ipath] = id + '/';
    if (PATH[ipath] == '/'){
        PATH[ipath] = '';
    }
    await get_file();
    hide_search();
}
async function back_path(){
    if (ipath != 0){
        ipath--;
        await get_file();
    }
}
async function open_folder(){
    id = bckID.getElementsByTagName('input')[0].value;
    ipath++;
    PATH[ipath] = PATH[ipath -1] + id + '/';
    if (PATH[ipath] == '/'){
        PATH[ipath] = '';
    }
    await get_file();
}
async function select(e, data){
    var file = document.getElementById('file');
    var img = document.getElementById('img');
    var dir = document.getElementById('dir');
    var other = document.getElementById('other');
    
    if (!file.contains(e.target)){
        if (typeof bckID !== 'undefined' && bckID) {
            bckID.style.border = "";
            bckID.style.backgroundColor = "";
            file.style.display = "none";
            dir.style.display = "none";
            img.style.display = "none";
            other.style.display = "none";
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
                        await open_viewer(PATH[ipath]);
                    }
                }  

            } else if (el.indexOf('file') >= 0){
                other.style.display = "initial";
                file.style.display = "initial";

                if (typeof bckID !== 'undefined') {
                    if (bckID == id){
                        var name = bckID.getElementsByTagName('input')[0].value;
                        ipath++;
                        PATH[ipath] = PATH[ipath -1];
                        if (PATH[ipath] == '/'){
                            PATH[ipath] = '';
                        }
                        open_other(PATH[ipath] + name);
                    }
                }  

            } else {
                dir.style.display = "initial";

                if (typeof bckID !== 'undefined') {
                    if (bckID == id){
                        var val = bckID.getElementsByTagName('input');
                        ipath++;
                        PATH[ipath] = PATH[ipath - 1] + val[0].value + '/';
                        await get_file();
                    }
                }  
            }
            
            hide_search();

            bckID = id;
        } else {
            bckID = '';
        }
    }
}

function file_ico_load(){
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
function file_ico_catch_load(id){
    id.src = IP + '/view/type/error.png';
}

// --- New Folder ---
// 🟢

function btn_new_folder(){    
    let name = prompt("Nouveau dossier", "");

    if (name != null || name != "") {
        new_folder(PATH[ipath], name);
    } 
}
async function new_folder(path, name){
    var url = IP + '?ctrl=mkdir&p=' + path + '&n=' + name ; 

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data == 'OK'){
            await get_file();

        } else {
            if (data.indexOf('Permission denied') >= 0){
                show_overlay('overperm');
            } else {
                alert(data);
            }
        }
    }
}

// --- Rename ---
// 🟢

function btn_rename_el(){
    var val = bckID.getElementsByTagName('input');
    
    let newname = prompt("Renommer le fichier", val[0].value);

    if (newname != null && newname != 'null' && newname != "") {
        rename_el(PATH[ipath], val[0].value, newname);
    } 
}
async function rename_el(path, oldname, newname){
    var url = IP + '?ctrl=rename&p=' + path + oldname + '&n=' + path + newname ; 

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data == 'OK'){
            await get_file();
        } else {
            if (data.indexOf('Permission denied') >= 0){
                show_overlay('overperm');
            } else {
                alert(data);
            }
        }
    }
}

// --- Remove --- GET SPE OVERBOX !
// 🟢

function btn_remove_el(){
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
function btnhide_remove_el(){
    var over = document.getElementById('overrm');
    over.style.display = 'none';
    delete ACTION;
}
async function remove_el(){
    var old = bckID;
    delete bckID;

    var url = IP + '?ctrl=remove&p=' + PATH[ipath] + ELNAME; 
    delete ACTION;

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

        if (data != 'OK'){
            if (data.indexOf('Permission denied') >= 0){
                show_overlay('overperm');
            } else {
                alert(data);
            }
            await get_file();
            btnhide_remove_el();

        } else {
            var el = document.getElementsByClassName('el');
            for (var i = 0; i < el.length; i++) {
                if (el[i] == old){
                    if (el[i + 1])
                        bckID = el[i + 1];
                        
                    else if (el[i - 1])
                        bckID = el[i - 1];
                        
                    bckID.style.border = "#33A4E2 2px solid";
                    bckID.style.backgroundColor = "#33A4E21F";
                    break;
                }
            }
        
            old.remove();
            btnhide_remove_el();
        }
    }
}

// --- Info ---
// 🟢

async function show_info(){
    document.getElementById('infos').style.display = 'block';
    document.getElementById('det').style.right = '0px';
    await get_info();
}
function hide_info(){
    document.getElementById('infos').style.display = 'none';
    document.getElementById('det').style.right = '-100%';
}
async function get_info(){
    var url = IP + '?ctrl=get_info';

    let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.json();

        document.getElementById('disk_size').innerHTML = data['disk_size'];
        document.getElementById('disk_usage').innerHTML = data['disk_usage'];
        document.getElementById('disk_perc_usage').style.width = data['disk_perc_usage'] + "%";
        document.getElementById('disk%').innerHTML = data['disk_perc_usage'] + " %";

        if (data['disk_perc_usage'] <= 80){
            document.getElementById('disk_perc_usage').style.backgroundColor = "#33A4E2"
        } else {
            document.getElementById('disk_perc_usage').style.backgroundColor = "#f43838"
        }
    }   
    
}

// --- Other ---
// 🟢

function view_other(){
    var val = bckID.getElementsByTagName('input');

    open_other(PATH[ipath] + val[0].value);
}
function open_other(name){
    var url = IP + '?ctrl=download&p=' + name;

    window.open(url);
}

/* --- Search --- */

function searchfocus(){
    var searchtext = document.getElementById('searchtext');
    var result = document.getElementById('result');
    searchtext.focus();

    if (searchtext.value != '')
        result.style.display = 'block';
}
async function search(id){
    var result = document.getElementById('result');
    result.style.display = 'block';

    const alltype = ['csv', 'doc', 'docx', 'file', 'folder', 'gif', 'ico', 'jpg', 'mov', 'mp3', 'mp4', 'odt', 'pdf', 'png', 'pptx', 'xls', 'xlsx', 'zip']

    var url = IP + '?ctrl=search&q=' + id.value;
    let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.json();

        var echo = '';

        for(var i = 0; i < data.length; i++){
            var name = data[i].substring(data[i].lastIndexOf('/') + 1);
            var type = data[i].substring(data[i].lastIndexOf('.') + 1);
            var path = data[i].substring(0, data[i].lastIndexOf('/'));

            if (type == 'dir'){
                type = 'folder';
                name = name.substring(0, name.length - 4);
                path += '/' + name;
            }

            if (alltype.indexOf(type) == -1)
                type = 'file';

            echo += '<tr onclick="change_path(\'' + path + '\');"><td><img src="' + IP + '/view/type/' + type + '.png"></td><td>' + name + '</td></tr>';
            ''

            if (i == 100)
                break;
        }
    }

    result.innerHTML = echo;
}
function hide_search(){
    var result = document.getElementById('result');
    result.style.display = 'none';
}

/* --- Upload --- */

function show_overlay(id){
    var el = document.getElementById(id);
    el.style.display = 'block';
}
function close_overlay(id){
    var el = document.getElementById(id);
    el.style.display = 'none';
}
function BtnShowUploadBox(){
    var over = document.getElementById('overupload');
    over.style.display = 'block';
}
function upload_input(id, type){
    var list = document.getElementById('uploadList' + type);

    for (var i = 0; i < id.files.length; i++){        
        let files = document.createElement("div");
        files.innerHTML = id.files[i].name;
        files.id = 'upload' + id.files[i].name;
        files.className = 'overmouse';
        list.appendChild(files); 
    }
}
async function upload_prepare(type){
    close_overlay('overupload'); close_overlay('overuploadDir');  close_overlay('overuploadFile'); 
    var id = document.getElementById('fileupload' + type);
    var bck = document.getElementById('uploadbck');
    var perc = document.getElementById('uploadperc');
    var status = document.getElementById('uploadstatus');
    var info = document.getElementById('uploadinfo');

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
    INTERVAL = setInterval(alternate, 3000);
    alternate();
    exe_upload();

}
async function exe_upload(){
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
            remain = Math.floor(remain / 3600) + ' heures ' + Math.floor((remain % 3600)  / 60) + ' minutes restantes';
        else if (remain >= 60)
            remain =  Math.floor(remain / 60) + ' minutes ' + Math.floor(remain % 60) + ' secondes restantes';
        else
            remain = remain + ' secondes restantes'

        timer.innerHTML = remain;
        perc.innerHTML = Math.round((UPLOADSIZE / TOTALSIZE) * 100) + ' %';    
        window.document.title = Math.round((UPLOADSIZE / TOTALSIZE) * 100) + ' % | Envoi en cours... - Drive';

    } else {
        if (FILESERROR.length == 0){
            avv.style.backgroundColor = '#189A2E';
            info.innerHTML = 'Terminé ! - Sans erreur';

        } else {
            avv.style.backgroundColor = '#C61515';
            info.innerHTML = 'Terminé ! - Avec ' + (FILESERROR.length) + ' erreur(s)';

        }

        avv.style.width = '100%';
        timer.innerHTML = '';
        perc.innerHTML = '';
        timer.style.display = 'none';
        perc.style.display = 'none';
        id.style.display = 'block';
        window.document.title = '100 % | Terminé ! - Drive';

        setTimeout(hide_upload_status, 5000);
        clearInterval(INTERVAL);

        await get_file();
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
    info.innerHTML = 'Envoi de ' + name + '...';

    let formData = new FormData();
    formData.append('n', name);
    formData.append('p', path);
    formData.append('file', file);

    url = IP + '?ctrl=upload'; 

    let response = await fetch(url, {
                                        method: 'post',
                                        body: formData
                                    });		
    if (response.status === 200) {
        var data = await response.text();

        if(data == 'OK'){
            document.getElementById('upload' + name).remove();            
            FILES.shift();
            exe_upload();

        } else {
            bck.style.backgroundColor = '#C61515';
            avv.style.backgroundColor = '#930F0F';
            info.innerHTML = 'Echec de l\'envoi du fichier - ' + name;

            document.getElementById('upload' + name).className = 'overmouse';
            document.getElementById('upload' + name).style.backgroundColor = '#930F0F99';
            
            FILES.shift();
            FILESERROR.push(name);
            setTimeout(exe_upload, 3000);
        }
    } else {
        bck.style.backgroundColor = '#C61515';
        avv.style.backgroundColor = '#930F0F';
        info.innerHTML = 'Echec de l\'envoi du fichier - ' + name;

        document.getElementById('upload' + name).className = 'overmouse';
        document.getElementById('upload' + name).style.backgroundColor = '#930F0F99';
        
        FILES.shift();
        FILESERROR.push(name);
        setTimeout(exe_upload, 3000);
    }

    UPLOADSIZE += size;
}
function hide_upload_status() {
    var bck = document.getElementById('uploadbck');
    var perc = document.getElementById('uploadperc');
    var status = document.getElementById('uploadstatus');

    bck.style.display = 'none';
    perc.style.display = 'none';
    status.style.display = 'none';

    document.getElementById("uploadperc").style.backgroundColor = "#820282";

    window.document.title = "Drive"
}
function alternate(){
    const perc = document.getElementById("perc")
    const timer = document.getElementById('timer');
    const uploadstatus = document.getElementById('uploadstatus');

    if (uploadstatus.style.display == 'block'){
        if (perc.style.display == 'none'){
            perc.style.display = 'block';
            timer.style.display = 'none';

        } else {
            perc.style.display = 'none';
            timer.style.display = 'block';
        
        }
    }
}

/* --- Ecriture de cookie --- */

async function set_cookie_value(el){
    if (el.checked){
        var value = 1;
    } else {
        var value = 0;
    }
    document.cookie = el.id + '=' + value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/'; 
    await get_file();
}
function get_cookie_value(name) {
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
    
    if (i = ext.indexOf(img_extension)){
        PATH[ipath] = href;
        open_viewer(href);
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
    if (get_cookie_value('displayExtension') == 1){
        document.getElementById('displayExtension').checked = true;
    }
    if (get_cookie_value('displayInListMode') == 1){
        document.getElementById('displayInListMode').checked = true;
    }

    document.getElementById('searchtext').value = '';

    get_file();
}