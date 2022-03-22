// --- Keyboard control ---
// 🟢

async function control(e){
    const file = document.getElementById('file');
    const dir = document.getElementById('dir');

    if (document.getElementById('explorer').style.display != 'none'){
        if (typeof ACTION !== 'undefined'){
            if (e.keyCode == 13){ // Enter
                if (ACTION == 'RM'){
                    remove_el(document.getElementById('rmbtn'));
                }
            } else if (e.keyCode == 27){ // Echap
                if (ACTION == 'RM'){
                    btnhide_remove_el();
                }
            } 
        } else {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){ // Haut et gauche
                    let pos;
                if (e.keyCode == 37 || e.keyCode == 38){
                    pos = -1;
                }
                if (e.keyCode == 39 || e.keyCode == 40){
                    pos = 1;
                }

                let el = document.getElementsByClassName('el');
                for (i = 0; i < el.length; i++) {
                    if (el[i] == bckID){
                        if (el[i + pos]){
                            bckID.style.border = "";
                            bckID.style.backgroundColor = "";
                            file.style.display = "none";
                            dir.style.display = "none";
                            bckID = el[i + pos];
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
            if (e.keyCode == 13){ // Enter
                if (bckID.className.indexOf('dir') >= 0){
                    open_folder();
                } 
            } else if (e.keyCode == 46){ // Suppr
                if (bckID.className.indexOf('el') >= 0){
                    btn_remove_el();
                }
            } else if (e.keyCode == 81){
                searchfocus();
            }
        }
    } else if (document.getElementById('viewer').style.display != 'none'){
        if (typeof IMGPERC !== 'undefined' && e.keyCode == 37){
            await viewer_go_back();

        } else if (typeof IMGSUIV !== 'undefined' && e.keyCode == 39){
            await viewer_go_forward();

        } else if (e.keyCode == 27){
            exit_viewer();
        }
    }
}