// --- Keyboard control ---
// 🟢

async function control(el){
    var file = document.getElementById('file');
    var dir = document.getElementById('dir');

    console.log(el.keyCode)

    if (document.getElementById('explorer').style.display != 'none'){
        if (typeof ACTION !== 'undefined'){
            if (el.keyCode == 13){ // Enter
                if (ACTION == 'RM'){
                    remove_el(document.getElementById('rmbtn'));
                }
            } else if (el.keyCode == 27){ // Echap
                if (ACTION == 'RM'){
                    btnhide_remove_el();
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
                    open_folder();
                } 
            } else if (el.keyCode == 46){ // Suppr
                if (bckID.className.indexOf('el') >= 0){
                    btn_remove_el();
                }
            } else if (el.keyCode == 81){
                searchfocus();
            }
        }
    } else if (document.getElementById('viewer').style.display != 'none'){
        if (typeof IMGPERC !== 'undefined' && el.keyCode == 37){
            await viewer_go_back();

        } else if (typeof IMGSUIV !== 'undefined' && el.keyCode == 39){
            await viewer_go_forward();

        } else if (el.keyCode == 27){
            exit_viewer();
        }
    }
}