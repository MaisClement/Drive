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

                    echo = echo + '<td><img src="' + DATA['files'][file]['img'] + '" onload="imgLoad()" onerror="imgError(this)"></td>';
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
                    echo = echo + ' <img src="' + DATA['files'][file]['customimg'] + '" onload="imgLoad()" onerror="imgError(this)">';
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
    let patharr = [];

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
                        await openImg(PATH[ipath]);
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
            alert(data);

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
            alert(data);
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
            alert(data);
            await get_file();

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
    if (get_cookie_value('displayExtension') == 1){
        document.getElementById('displayExtension').checked = true;
    }
    if (get_cookie_value('displayInListMode') == 1){
        document.getElementById('displayInListMode').checked = true;
    }

    document.getElementById('searchtext').value = '';

    get_file();
}