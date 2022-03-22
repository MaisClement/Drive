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