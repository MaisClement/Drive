/* --- Image --- */

function btn_open_viewer(){
    const val = bckID.getElementsByTagName('input');
    const name = val[0].value;
    open_viewer(PATH[ipath] + name);
}
async function open_viewer(val){
    console.log(val)
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
async function viewer_go_back(){
    await open_viewer(PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') + 1 ) + IMGPERC);
}
async function viewer_go_forward(){
    await open_viewer(PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') + 1 ) + IMGSUIV);
}
function stopImgLoader(){
    document.getElementById('imgloader').style.display = 'none';

    ARROWTIMEOUT = setTimeout(hide_arrow, 3000);
}
function show_arrow(){
    document.getElementById('viewerbck').style.opacity = '1';
    document.getElementById('viewerfor').style.opacity = '1';

    if (typeof ARROWTIMEOUT !== 'undefined')
        clearTimeout(ARROWTIMEOUT);
    
    ARROWTIMEOUT = setTimeout(hide_arrow, 3000);
}
function hide_arrow(){
    document.getElementById('viewerbck').style.opacity = '0';
    document.getElementById('viewerfor').style.opacity = '0';
}
async function exit_viewer (){
    document.getElementById('explorer').style.display = 'block';
    document.getElementById('viewer').style.display = 'none';

    document.getElementById('viewimg').src = ''

    var path = PATH[ipath].substring(0,  PATH[ipath].lastIndexOf('/') );
    await change_path(path);
}
