function Wchange(id){
	let w = document.getElementById('W');
	let winput = document.getElementById('Winput');

	if (id.checked == true){
		w.style.display = 'block';
	} else {
		w.style.display = 'none';
		winput.checked = false;
	}
}

// ---

//---------
//--------- Info Trafic // Err 2xx
const infoimg = ["info.png", "work.png", "error.png", "stop.png"];
const infocolor = ["#2196f3", "#ff7107", "#ffc107", "#f44336"];
nb_info = 0;

function InfoSetImg(id){
	try{
		id.parentElement.parentElement.firstChild.src = id.src

		let pos = id.src.lastIndexOf("/") + 1
		let sub = id.src.substring(pos)

		pos = infoimg.indexOf(sub)
		if (pos != -1){
			id.parentElement.parentElement.parentElement.style.backgroundColor = infocolor[pos]
			id.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottomColor = infocolor[pos]
		}
	} catch (e) {
        Print_message(0, 'Une erreur s\'est produite - Err. 22') 
    }
}
function InfoRestoreImg(id){
	if (typeof backgrdinfocolor !== 'undefined') { 
		id.parentElement.style.backgroundColor = backgrdinfocolor
	}
}
function InfoChangeImg(id){
	try{
		if (typeof backgrdinfocolor === 'undefined') { 
			backgrdinfocolor = id.parentElement.style.backgroundColor
		}
		let pos = id.src.lastIndexOf("/") + 1
		let sub = id.src.substring(pos)

		pos = infoimg.indexOf(sub)
		if (pos != -1){
			id.parentElement.style.backgroundColor = infocolor[pos]
		}
	} catch (e) {
        Print_message(0, 'Une erreur s\'est produite - Err. 201');
		console.error(e);
    }
}
function rmInfo(id){
    id.parentElement.outerHTML = '';
}
async function getInfo(){
	try{
		url = 'api/getInfo'; 
		let i = 0; 
		let echo = '';

		let response = await fetch(url);	
		if (response.status === 200) {
			let datas = await response.text();
			datas = JSON.parse(datas);
			
			if (datas == "[]"){
				echo += '<b>Info(s) selon la classification du train : </b><br>';
				echo += '<div class="add-cat" onclick="InfoAdd(this, 0)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
				echo += '<br><b>Info(s) selon le nom du train : </b><br>';
				echo += '<div class="add-cat" onclick="InfoAdd(this, 1)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
			} else {
				echo += '<b>Info(s) selon la classification du train : </b><br>';
				if (datas["0"]){
					for (info in datas["0"]){
						echo += InfoPrint(datas["0"][info]['type'], datas["0"][info]['class'], datas["0"][info]['title'], datas["0"][info]['des'], 0);
					}
					i++;
				}
				echo += '<div class="add-cat" onclick="InfoAdd(this, 0)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
				echo += '<br><b>Info(s) selon le nom du train : </b><br>';
				if (datas["1"]){
					for (info in datas["1"]){
						echo += InfoPrint(datas["1"][info]['type'], datas["0"][info]['class'], datas["1"][info]['title'], datas["1"][info]['des'], 1);
					}
					i++;
				}
				echo += '<div class="add-cat" onclick="InfoAdd(this, 1)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
		
			}
			document.getElementById('edit_info').innerHTML = echo;
		}
	} catch (e) {
		console.error(e);
		Print_message(0, 'Récupération des infos trafic impossible.');
		document.getElementById('edit_info').innerHTML = '<a style="color : #C61515">Une erreur s\'est produite.</a>';
	}
}
async function InfoUpdate(id){
	try{
		let bckinner = id.innerHTML;
		id.innerHTML = loader;
		await getInfo();
		id.innerHTML = bckinner;
		Print_message(1, 'Actualisé avec succès.');
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 202');
		console.error(e); 
    }
}
async function InfoSave(id){
	try{
		let bckinner = id.innerHTML;
		id.innerHTML = loader;

		let datas = document.getElementById('edit_info')
		let clas = datas.getElementsByClassName('InfoClass')
		let title = datas.getElementsByClassName('InfoTitle')
		let value = datas.getElementsByClassName('InfoValue')
		let type = datas.getElementsByClassName('info-trafic-img')
		let json = []; let i = 0; let eltype = ""; let pos = ""; let sub = ""

		for (el in clas){
			if (el == "item" || el == "length"){
				break
			}
			eltype = type[el].firstChild.src
			pos = eltype.lastIndexOf("/") + 1
			sub = eltype.substring(pos)
			pos = infoimg.indexOf(sub) + 1
		
			json[i] = [
				clas[el].name,
				clas[el].value,
				pos,
				title[el].value,
				value[el].value,
			]
			i++;
		}
		json = JSON.stringify(json);

		let formData = new FormData();
		formData.append('infos', json);

		let response = await fetch('_account2', {
										method: 'post',
										body: formData
										});	
		if (response.status === 200) {
			let data = await response.text();
				
			if(data == 'OK'){
				Print_message(1,'Enregistré avec succès.');
			}
			else {
				Print_message(0, data)
			}
		} else {
			Print_message(0, 'Une erreur s\'est produite');
		}
		id.innerHTML = bckinner;
	} catch (e) {	
		Print_message(0, 'Une erreur s\'est produite - Err. 204');
		console.error(e);
    }
}
function InfoAdd(id, type){
	id.outerHTML = InfoPrint(0, '', '', '', type) + '<div class="add-cat" onclick="InfoAdd(this, ' + type + ')"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>';
	document.getElementById('Info' + nb_info + 'Name').focus();
}
function InfoPrint(level, name, title, des, type){
	nb_info += 1;
	data = '<div style="top: 10px;" class="info-trafic-block">'
	data += '- <input id="Info' + nb_info + 'Name" class="InfoClass" name="' + type + '" type="text" value="' + name + '" maxlength="50" placeholder="Classification ou Nom"></input>'
	data += '<span class="del-img" onclick="rmInfo(this)">×</span>'
	data += '	<table style="border-bottom: 2px solid ' + infocolor[level] + '">'
	data += '		<tr>'	
	data += '			<td style="background-color: ' + infocolor[level] + ';padding: 5px;width: 450px; top: 0" class="info-trafic-title">'
	data += '				<span class="info-trafic-img"><img src="assets/img/' + infoimg[level] + '">'
	data += '					<span class="info-trafic-chtype">'
	data += '						<img src="assets/img/info.png" onmouseover="InfoChangeImg(this)" onmouseout="InfoRestoreImg(this)" onclick="InfoSetImg(this)"><img src="assets/img/work.png" onmouseover="InfoChangeImg(this)" onmouseout="InfoRestoreImg(this)" onclick="InfoSetImg(this)"><img src="assets/img/error.png" onmouseover="InfoChangeImg(this)" onmouseout="InfoRestoreImg(this)" onclick="InfoSetImg(this)"><img src="assets/img/stop.png" onmouseover="InfoChangeImg(this)" onmouseout="InfoRestoreImg(this)" onclick="InfoSetImg(this)">'
	data += '					</span>'
	data += '				</span>'
	data += '				<input class="InfoTitle" type="text" value="' + title + '" maxlength="50" placeholder="Titre" />'
	data += '			</td>'
	data += '		</tr>'
	data += '		<tr>'
	data += '			<td class="info-trafic-info">'
	data += '			<textarea class="InfoValue fluent_textarea" id="Info' + nb_info + 'Value" maxlength="300" placeholder="Vide" onchange="lengthStr(\'Info' + nb_info + '\', 300)" onkeypress="lengthStr(\'Info' + nb_info + '\', 300)" onpaste="lengthStr(\'Info' + nb_info + '\', 300)" oninput="lengthStr(\'Info' + nb_info + '\', 300)" onblur="lengthStr(\'Info' + nb_info + '\', 300)">' + des + '</textarea>'
	data += '			<div id="Info' + nb_info + 'len" style="margin-top: -15px; text-align: right; color: inherit;"></div>'
	data += '			</td>'
	data += '		</tr>'
	data += '	</table>'
	data += '	<br>'
	data += '</div>'
	return data;	
}

//--------- Hide // Err 3xx
function rmHide(id){
    id.parentElement.outerHTML = '';
}
async function getHide(){
	try{
		url = 'api/getHide';
		let i = 0; 
		let echo = '';

		let response = await fetch(url);	
		if (response.status === 200) {
			let datas = await response.text();
			datas = JSON.parse(datas);
			
			if (datas == "[]"){
				echo += '<b>Train(s) masqué selon leur classification :</b><br>';
				echo += '<div class="add-cat" onclick="HideAdd(this, 0)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
				echo += '<br><b>Train(s) masqué selon leur nom : </b><br>';
				echo += '<div class="add-cat" onclick="HideAdd(this, 1)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
			} else {
				echo += '<b>Train(s) masqué la classification du train : </b><br>';
				if (datas["0"]){
					for (info in datas["0"]){
						echo += HidePrint(0, datas["0"][info]['class']);
					}
					i++;
				}
				echo += '<div class="add-cat" onclick="HideAdd(this, 0)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
				echo += '<br><b>Train(s) masqué selon leur nom : </b><br>';
				if (datas["1"]){
					for (info in datas["1"]){
						echo += HidePrint(1, datas["1"][info]['class']);
					}
					i++;
				}
				echo += '<div class="add-cat" onclick="HideAdd(this, 1)"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>'
		
			}
			document.getElementById('edit_hide').innerHTML = echo;
		}
	} catch (e) {
		console.error(e);
		Print_message(0, 'Récupération des trains masqué impossible.');
		document.getElementById('edit_hide').innerHTML = '<a style="color : #C61515">Une erreur s\'est produite.</a>';
	}
}
async function hideUpdate(id){
	try{
		let bckinner = id.innerHTML;
		id.innerHTML = loader;
		await getHide();
		id.innerHTML = bckinner;
		Print_message(1, 'Actualisé avec succès.');
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 303');
		console.error(e);
    }
}
async function HideSave(id){
	try{
		let bckinner = id.outerHTML;
		id.innerHTML = loader;

		let datas = document.getElementById('edit_hide')
		let clas = datas.getElementsByClassName('HideClass')
		let json = []; let i = 0; let eltype = ""; let pos = ""; let sub = ""

		for (el in clas){
			if (el == "item" || el == "length"){
				break
			}		
			json[i] = [
				clas[el].name,
				clas[el].value
			]
			i++;
		}
		json = JSON.stringify(json);

		let formData = new FormData();
		formData.append('hide', json);

		let response = await fetch('_account2', {
										method: 'post',
										body: formData
										});	
		if (response.status === 200) {
			let data = await response.text();
				
			if(data == 'OK'){
				Print_message(1,'Enregistré avec succès.');
			}
			else {
				Print_message(0, data)
			}
		} else {
			Print_message(0, 'Une erreur s\'est produite');
		}
		id.outerHTML = bckinner;
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 304');
		console.error(e);
    }
}
function HideAdd(id, type){
	id.outerHTML = HidePrint(type, '') + '<div class="add-cat" onclick="HideAdd(this, ' + type + ')"><img src="assets/img/add.svg" class="svg"><span>Ajouter une information</span></div>';
	document.getElementById('Hide' + nb_info).focus();
}
function HidePrint(type, name){
	nb_info += 1;
	data = '<div class="hide">'
	data += '<span class="del-img" onclick="rmHide(this)">×</span>'
	data += '- <input id="Hide' + nb_info + '"  class="HideClass" name="' + type + '" type="text" value="' + name + '" maxlength="50" placeholder="Classification ou Nom"></input>'
	data += '</div>'
	return data;	
}

//--------- Editeur info trafic // Err 4xx
function EditMakeJson(){
    try{
        let group = document.getElementsByTagName('input');
        let title = 'RoualgeDeCranneséhéihuihsuihjkhnqu_fysngwuiehnw ku';
        let y = 0;
        let i = 0;
        let json = '{';

        console.log(group)
		console.log(group.length)
		
		for (let category = 0; category < group.length; category++) {
			console.log(group)
			console.log(category)
      
            if (group[category].name == "title"){
                if (title != group[category].value){
                    title = group[category].value;
                    if (y == 0){
                        json += '"' + title + '":[';
                    } else {
                        json += '],"' + title + '":[';
                    }
                }                        
                i = 0;
                y++;
            }
            if (group[category].name == "class"){
                let clas = group[category].value;
                if (i == 0){
                    json += '"' + clas + '"';
                } else {
                    json += ',"' + clas + '"';
                } 
                i++;

            }
        }
        json += ']}';
        if (json =="{]}"){
            json = '{"" : []}';
        }
        json = JSON.parse(json);
		console.log('fin');
        return(json);
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 307');
		console.error(e);
    }
}
async function EditMouveClass(el){
    try {
        let echo = '';
        let prec = '';
        let datas = EditMakeJson()
        i = 0;

        echo += '<div class="add-cat" onclick="EditAddGroup(this)"><img src="assets/img/add.svg" class="svg" ><span>Insérer une catégorie</span></div>';

        for (data in datas){                   
            echo += '<div class="group"><span class="input"><input type="text" placeholder="<Nom de la catégorie>" name="title" value="' + data + '"/>';
            echo += '<span class="del-img2" onclick="rmGroup(this)">×</span></span>'
            i = 0;
            prec = '';

            for (train in datas[data]){
                if (i == 1){
                    echo += EditPrintClass(datas[data][train], prec, datas[data][ parseInt(train) ]);
                        prec = datas[data][train];
                    echo += EditPrintClass(el, prec, datas[data][ parseInt(train) + 1 ]);
                        prec = el;
                    i++;
                }
                else if (datas[data][train] == el){
                    i++
                } else {
                    echo += EditPrintClass(datas[data][train], prec, datas[data][ parseInt(train) + 1 ]);
                        prec = datas[data][train];
                }
            }
            echo += EditPrintBottom()
        }            
        document.getElementById('edit').innerHTML = echo;
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 411');
		console.error(e);
    }

}
function EditPrintClass(train, prec, suiv){
    try{
        echo = '<span class="info-div info-div-grey">';
        echo += '<input type="hidden" value="' + train +'" name="class"/>';             
        echo += '<span style=\'background-image: url("image.php?serv=' + train +'");\' class="bck"></span>';
        echo += '<img src="assets/img/exclamation_grey.png" class="info-img">';
        echo += '<span class="del-img" onclick="rmClass(this)">×</span>';
        if (prec != ''){ 
            echo += '<span class="dep-img" onclick="EditMouveClass(\'' + prec +'\')"><</span>';
        }
        if (suiv != undefined){
            echo += '<span class="dep-img2" onclick="EditMouveClass(\'' + train +'\')">></span>';
        }
        echo += '</span>';
        return (echo);
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 412');
		console.error(e); 
    }
}
function EditPrintBottom(){
    try{    
        let echo = '<span class="add-div" onclick="EditDefClass(this)">';

        echo += '<img src="assets/img/add.svg" class="svg" style="width: 60px; max-height: 60px; padding-top: 0px; padding-bottom: 0px;">';
        echo += '</span><hr></div>';
        echo += '<div class="add-cat" onclick="EditAddGroup(this)"><img src="assets/img/add.svg" class="svg" ><span>Insérer une catégorie</span></div>';
        return (echo)
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 413');
		console.error(e);
    }
}
async function EditShowData(datas){
    try{
        let echo = '';
        let prec = '';
        
        echo += '<div class="add-cat" onclick="EditAddGroup(this)"><img src="assets/img/add.svg" class="svg"><span>Insérer une catégorie</span></div>';

        for (data in datas){
            echo += '<div class="group"><span class="input"><input type="text" placeholder="<Nom de la catégorie>" name="title" value="' + data + '"/>';
            echo += '<span class="del-img2" onclick="rmGroup(this)">×</span></span>';

            i = 0;
            prec = '';

            for (train in datas[data]){
                echo += EditPrintClass(datas[data][train], prec, datas[data][ parseInt(train) + 1 ]);
                    prec = datas[data][train];
            }
            echo += EditPrintBottom()
        }
        document.getElementById('edit').innerHTML = echo;
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 413');
		console.error(e);
    }
}
function EditUpdateList(){
    try{
        let group = document.getElementsByTagName('input');
        let i = 0;
        let list = '[';
        available = [];
        availableLower = [];
        for (category in group){
            if (category == "item" || category == "length"){
                break
            }
            if (group[category].name == "class"){
                let clas = group[category].value;
                if (i == 0){
                    list += '"' + clas + '"';
                } else {
                    list += ',"' + clas + '"';
                } 
                i++;

            }
        }
        list += ']';
        list = JSON.parse(list);
        i = 0;

        for (train in all) {
            if (list.indexOf(all[train]) == -1){
                available[i] = all[train]
                availableLower[i] = all[train].toLowerCase()
                i++;
            }
        }            
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 415');
		console.error(e);
    }
}
function EditSearchClass(id){ 
    try{
        let echo = '';
        if (id.value != ""){        

            document.getElementById('search').innerHTML = '<div class="overmouse" onclick="EditAddClass(\'' + id.value + '\')"><img src="assets/img/add.svg" class="svg" style="width: 25px"><span style="position: relative;top: -8px;left: 8px;">Ajouter <b>' + id.value + '</b></span></div>';

            for (el in available){
                if(availableLower[el].indexOf(id.value.toLowerCase()) >= 0) {                        
                    echo += '<div class="overmouse" onclick="EditAddClass(\'' + available[el] + '\')">' + available[el] + '</div>';
                }
            }
        } else {
            document.getElementById('search').innerHTML = '';

            for (el in available){
                echo += '<div class="overmouse" onclick="EditAddClass(\'' + available[el] + '\')">' + available[el] + '</div>';
            }
        }
        if (echo == ''){
            document.getElementById('listTrain').innerHTML = '<br><div>Aucun résultat</div>';
        } else {
            document.getElementById('listTrain').innerHTML = echo;
        }
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 416');
		console.error(e);
    }
}
async function setDefault(el){
    try {
        let bck = el.outerHTML
        el.innerHTML = loader;
        el.style.paddingTop = '4px';

        let url = 'edittrafic?default'; 
        
        let response = await fetch(url);	
        if (response.status === 200) {
            let text = await response.json();

            EditShowData(text);
        } else {
            Print_message(0,'Erreur réseau. Mylines n\'est pas accesible ou est indisponible.');

        }
        el.outerHTML = bck;
        Print_message(1,'Affichage remis par défaut');
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 419');
		console.error(e);
    }
}
async function setClear(el){
    try{
		let bck = el.outerHTML;
        el.innerHTML = loader;
        el.style.paddingTop = '4px';

        let data = '{"" : []}'; 
        text = JSON.parse(data);
        EditShowData(text);
        
        el.outerHTML = bck;

        Print_message(1,'Remis à zéro');
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 417');
		console.error(e);
    }
}
async function getTrafic(){
	let url = 'edittrafic?saved'; 
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let text = await response.text();

		if (text == '' || text == '[]'){
			url = 'edittrafic?default'; 
			response = await fetch(url);
			text = await response.json();
			EditShowData(text);
		} else { 
			text = JSON.parse(text);
			EditShowData(text);
		}
		url = 'edittrafic?all'; 
		response = await fetch(url);
		all = await response.json();
	}
}
async function updateTrafic(el){
		let bck = el.outerHTML
		el.innerHTML = loader;
		el.style.paddingTop = '4px';

        await getTrafic();
        
        el.outerHTML = bck;
        Print_message(1,'Actualisé avec succès.');
}
async function doSave(el){
    try{
		let bck = el.outerHTML
        el.innerHTML = loader;
        el.style.paddingTop = '4px';

        let formData = new FormData();
        formData.append('data', JSON.stringify(EditMakeJson()) );

		let response = await fetch('edittrafic', {
										method: 'post',
										body: formData
										});	
		if (response.status === 200) {
			let data = await response.text();
				
			if(data == 'OK'){
				await getTrafic(el);        

        		Print_message(1,'Enregistré avec succès.');

			} else {
				Print_message(0, data)
			}
		} else {
			Print_message(0, 'Une erreur s\'est produite');
		}

		el.outerHTML = bck;
                
    } catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 418');
		console.error(e);
    }
}
function rmClass(id){
    id.parentElement.outerHTML = '';
    EditShowData(EditMakeJson());
}
function rmGroup(id){
    id.parentElement.parentElement.outerHTML = '';
    EditShowData(EditMakeJson());
}
function pressEnter(e, id){ //pressEnter(event, this)
    if(e.keyCode === 13){
        e.preventDefault(); 

        EditAddClass(id.value)
    }
}
function EditAddClass(id){
    insertEl.innerHTML = EditPrintClass(id, '', '')
    closeOverlay();
    EditShowData(EditMakeJson())
}
function EditAddGroup(id){
    id.outerHTML = '<input type="text" placeholder="Nouvelle catégorie" name="title" value="Nouvelle catégorie"/>';
    EditShowData(EditMakeJson())
}
function EditDefClass(id){
    document.getElementById('overedittrafic').style.display = 'block';
    document.getElementById('addnew').value = '';
    document.getElementById('addnew').focus();
    EditUpdateList();
    EditSearchClass( document.getElementById('addnew') );
    insertEl = id;
}
function closeOverlay(){
	document.getElementById('overedittrafic').style.display = 'none';
}
//--------- Page
function rmPage(id){
	document.getElementById('overdelpage').style.display = 'block';
	let name = id.getElementsByClassName('NamePage')
	document.getElementById('overpagename').innerHTML = name[0].value;
    delel = id 
}
async function rmPage2(id){
	let bckinner = id.innerHTML;
	id.innerHTML = loader;

	delel.parentElement.outerHTML = '';	

	let page = document.getElementById('edit_page')
	let save = document.getElementById('save_page')
	page.innerHTML = printPage(getGroupPage(save))

	await savePage();
	await getPage();

	document.getElementById('overdelpage').style.display = 'none';
	id.innerHTML = bckinner;
}
function bckRmPage(){
	document.getElementById('overdelpage').style.display = 'none';
}
function changeVisi(id){
	let els = document.getElementsByClassName('PinPage')
	let elp = document.getElementsByClassName('VisiPage')
	if (id.name == "0"){
		id.src = "assets/img/visibility.svg";
		id.name = "1";
	} else {
		for (let el in elp){
			if (el == "item" || el == "length"){
				break
			}
			if (elp[el] == id){
				els[el].src = "assets/img/unpin.svg";
				els[el].name = "0";
			}			
		}
		id.src = "assets/img/invisible.svg"
		id.name = "0";
	}
}
function changePin(id){
	let els = document.getElementsByClassName('PinPage')
	let elp = document.getElementsByClassName('VisiPage')
	if (id.name == "0"){
		for (let el in els){
			if (el == "item" || el == "length"){
				break
			}
			if (els[el] == id){
				elp[el].src = "assets/img/visibility.svg";
				elp[el].name = "1";
			}
			els[el].src = "assets/img/unpin.svg";
			els[el].name = "0";
		}

		id.src = "assets/img/pin.svg";
		id.name = "1";		
	} else {
		id.src = "assets/img/unpin.svg"
		id.name = "0";
	}
}
async function pageUpdate(id){
	try{
		let bckinner = id.innerHTML;
		id.innerHTML = loader;
		await getPage();
		id.innerHTML = bckinner;
		Print_message(1, 'Actualisé avec succès.');
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 501');
		console.error(e);
    }
}
async function getPage(){
	try{
		url = 'api/getPage';

		let response = await fetch(url);	
		if (response.status === 200) {
			let datas = await response.text();
			datas = JSON.parse(datas);

			let echo = printPage(datas)
			document.getElementById('edit_page').innerHTML = echo;
		}
	} catch (e) {
		console.error(e);
		Print_message(0, 'Récupération des pages impossible.');
		document.getElementById('edit_page').innerHTML = '<a style="color : #C61515">Une erreur s\'est produite.</a>';
	}
}
function printPage(data){
	let echo = "";
	for (i in data){
		echo += echoNewGroup()
		echo += '<div class="GroupPage" id="' + data[i]['id'] + '" draggable="true" ondragstart="drag(event)"  ondrop="drop(event, 0)" ondragover="allowDrop(event, this)">'
		echo += echoPage (data[i]['id'], data[i]['name'], data[i]['visibility'], data[i]['pinned'], data[i]['child']);
		echo += '<div style="margin-left: 25px;">'
		echo += printPage (data[i]['child']);
		echo += '</div></div>'
	}
	return echo;
}
function echoNewGroup(){
	echo = '<div class="NewGroup" ondragstart="drag(event)"  ondrop="drop(event, 1)" ondragover="allowDrop(event, this); colorDrop(this)"  ondragleave="endDrop(this)"><div ondrop="drop(event, 2)"></div></div>'
	return echo
}
async function addPage(id){
	let bckinner = id.innerHTML;
	id.innerHTML = loader;

	await savePage();

	let response = await fetch('editpage?new');	
	if (response.status === 200) {
		let data = await response.text();
			
		if(data == 'OK'){
			await getPage();
			Print_message(1,'Nouvelle page créée avec succès.');
		} else {
			Print_message(0, data)
		}
	} else {
		Print_message(0, 'Une erreur s\'est produite');
	}
	id.innerHTML = bckinner;
}
function echoPage(Id, Name, Visibility, Pinned, Child){
	echo = '<div class="page" ondragover="colorDrop(this)"  ondragleave="endDrop(this)">'
	if (Pinned == "0"){
		echo += '	<img class="mini_fluent_btn PinPage svg" src="assets/img/unpin.svg" name="0" onclick="changePin(this)">'
	} else {
		echo += '	<img class="mini_fluent_btn PinPage svg" src="assets/img/pin.svg" name="1" onclick="changePin(this)">'
	}
	if (Visibility == "0"){
		echo += '	<img class="mini_fluent_btn VisiPage svg" src="assets/img/invisible.svg" name="0" onclick="changeVisi(this)">'
	} else {
		echo += '	<img class="mini_fluent_btn VisiPage svg" src="assets/img/visibility.svg" name="1" onclick="changeVisi(this)">'
	}
	echo += '	<span class="del-img" onclick="rmPage(this.parentElement)">×</span>'
	echo += '	<input class="NamePage" type="text" maxlength="50" placeholder="Nom de la page" value="' + Name + '" style="position: relative;top: -6px;width: 150px;">'	
	echo += '	<a href="editpage?page=' + Id + '" class="small_fluent_btn" style="opacity: 1; display: inline-block">'
	echo += '	<img src="assets/img/signin.svg" class="svg"><span style="opacity: 1;">Editer </span>'
	echo += '	</a>'
	echo += '</div>'
	return echo
}
async function savePage(){
	try{
		let data = document.getElementById('edit_page')
		
		let json = getGroupPage(data);
		console.log(json)
		json = JSON.stringify(json);

		let formData = new FormData();
		formData.append('pages', json);

		let response = await fetch('editpage', {
										method: 'post',
										body: formData
										});	
		if (response.status === 200) {
			let data = await response.text();
				
			if(data != 'OK'){
				Print_message(0, data)
			}
		} else {
			Print_message(0, 'Une erreur s\'est produite');
		}
	} catch (e){
		Print_message(0, 'Une erreur s\'est produite - Err. 505');
		console.error(e);
	}
}
async function savePageBtn(id){
	try{
		let bckinner = id.innerHTML;
		id.innerHTML = loader;

		await savePage();
		await getPage();
		Print_message(1, 'Enregistré avec succès') 
		id.innerHTML = bckinner;
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite - Err. 502');
		console.error(e);
    }
}
function getGroupPage(id){
	let grp = id.getElementsByClassName('GroupPage')
	let i = 0; let json = [];
	
	for (el in grp){
		if (el == "item" || el == "length"){
			break
		}
		if (elementDepth(grp[el]) == elementDepth(id) + 1 || elementDepth(grp[el]) == elementDepth(id) + 2){
			let names = grp[el].getElementsByClassName('NamePage');
			let pins = grp[el].getElementsByClassName('PinPage');
			let visi = grp[el].getElementsByClassName('VisiPage');

			for (nams in names){
				if (nams == "item" || nams == "length"){
					break
				}
				if (elementDepth(names[nams]) == elementDepth(grp[el]) + 1 || elementDepth(names[nams]) == elementDepth(grp[el]) + 2){
					json[i] = {}
					json[i]['id'] = grp[el].id
					console.log(grp[el].id)
					json[i]['name'] = names[nams].value
					json[i]['pinned'] = pins[nams].name
					json[i]['visibility'] = visi[nams].name
				}
			}
			json[i]['child'] = getGroupPage(grp[el])
			i++;
		}
	}
	return json;
}
function elementDepth(id){
	let depth = 0
	while(null!==id.parentElement){
		id = id.parentElement
		depth++
	}
	return depth
}
function allowDrop(ev, id) {
	ev.preventDefault();
}
function colorDrop(id){
	if (id.className == "NewGroup"){
		id.style.opacity = 1;
	} else {
		id.style.border = "#297CD3 2px solid";
	}
}
function endDrop(id) {
	if (id.className == "NewGroup"){
		id.style.opacity = 0;
	} else {
		id.style.border = "none";
	}
}
function drag(ev) {
	let els = document.getElementsByClassName('NewGroup')
	for(let i=0; i< els.length; i++){
		els[i].style.display = "block";
	}
	els = document.getElementsByClassName('page')
	for(let i=0; i< els.length; i++){
		els[i].style.height = "30px";
		els[i].style.marginBottom = 0;
	}
	dragdata = ev.target;
	//dragdata.outerHTML = "";
}
function drop(ev, u) {
	console.log(ev.target)
	console.log(u)
	ev.preventDefault();
	if (u == 1 || u == 2){
		if (u == 1){
			let target = ev.target
		} else {
			let target = ev.target.parentElement
		}
		target.outerHTML = dragdata.outerHTML

			el1 = target.getElementsByTagName('input');
			el2 = dragdata.getElementsByTagName('input');
			for (let i= 0; i > el2; i++) {
				el1[i].value = el2[i].value
			}

		dragdata.outerHTML = "";

	} else if (ev.target.parentElement != dragdata && dragdata.outerHTML.indexOf(ev.target.outerHTML) <= 0){
		ev.target.outerHTML = ev.target.outerHTML + dragdata.outerHTML;
		dragdata.outerHTML = "";
	}
	ev.target.style.border = "none";
	let page = document.getElementById('edit_page')
	let save = document.getElementById('save_page')
	page.innerHTML = printPage(getGroupPage(save))

	let els = document.getElementsByClassName('NewGroup')
	for(let i=0; i< els.length; i++){
		els[i].style.display = "none";
	}
	els = document.getElementsByClassName('page')
	for(let i=0; i< els.length; i++){
		els[i].style.height = "";
		els[i].style.marginBottom = "5px";
	}
}