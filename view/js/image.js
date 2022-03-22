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
    id.src = IP + '/view/type/error.png';
}
async function openImg(val){
    document.getElementById('explorer').style.display = 'none';
    document.getElementById('viewer').style.display = 'block';

    var name = val.substring( val.lastIndexOf('/') + 1 );
    document.getElementById('imgname').innerHTML = name;
    document.getElementById('imghname').innerHTML = '';

    document.getElementById('imgloader').style.display = 'block';
    document.getElementById('imgReader').style.display = 'block';

    var url = IP + '?ctrl=get_content&p=' + val.substring(0,  val.length );
    document.getElementById('viewimg').src = url;

    var img = document.getElementById('img');
    img.style.display = "none";

    url = IP + '?ctrl=get_file_info&s=1&p=' + val.substring(0,  val.length );
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
    await change_path(path);
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