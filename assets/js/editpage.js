var searchform = '';
var TXTSTYLE = [];
var STATE = [];
var STATENB = 0;
var STATECUR = 0;

TXTSTYLE['title1'] = 'Titre 1';
TXTSTYLE['title2'] = 'Titre 2';
TXTSTYLE['title3'] = 'Titre 3';
TXTSTYLE['sub-title'] = 'Sous titre 1';
TXTSTYLE['sub-title2'] = 'Sous titre 2';
TXTSTYLE['sub-title3'] = 'Sous titre 3';
TXTSTYLE['normal'] = 'Normal';
TXTSTYLE['details1'] = 'Details 1';
TXTSTYLE['details2'] = 'Details 2';


function CONT(type, name, color = 'default'){

	ZONEDROP = '<div class="zonedrop" ondragover="colorDrop(this); allowDrop(event, this)" ondragleave="endDrop(this)" ondrop="drop(event)"></div>'

	if (type == 'NewElement'){
		return ZONEDROP +"<div id='NewElement'></div>";

	} else if (type == 'Zone'){
		
		DIVDRAG = '<div id="drag' + NTIME + '" class="drag" draggable="true" ondragstart="drag(this, ' + NTIME + ')" style="display: none"></div>';

		var echo = ZONEDROP + "<div id='" + NTIME + "' class='bck' onclick='SetActiv(this)'>" + DIVDRAG;
		echo += "<div draggable='false'  class='" + type + " " + name + "' ";
		if (color != 'default') {
			echo += "style='background-color: #" + color + "'";
		} 
		echo += "name='" + name + "' type='" + type + "' name='" + name + "' color='" + color + "'>";

		NTIME++;

		return echo;

	} else if (type == 'ZoneEnd'){
		return "</div></div>";
	}
}
function EL(type, name, data, color = 'default', txttype = 'normal', align = 'left'){

	N = Math.floor((Math.random() * 999999) + 1);

	DIVDRAGEL = '<div id="drag' + N + '" class="dragEl" draggable="true" ondragstart="dragElement(this, ' + N + ')" style="display: none"></div>';
	ELEMDROP = '<div class="elemdrop" ondragover="colorDrop(this); allowDrop(event, this)" ondragleave="endDrop(this)" ondrop="dropElement(event)"></div>'

	if (type == 'HR'){
		return ELEMDROP + DIVDRAGEL + "<div id=" + N + " class='Element " + name + "' 					type='" + type + "' name='" + name + "' color='" + color + "' onclick='ctrl(this)'> </div>";
	
	} else if (type == 'SPACE'){
		return ELEMDROP + DIVDRAGEL + "<div id=" + N + " class='Element " + name + "' 					type='" + type + "' name='" + name + "' color='" + color + "' onclick='ctrl(this)'> </div>";
	
	} else if (type == 'TRAFIC'){
		return ELEMDROP + DIVDRAGEL + "<div id=" + N + " class='Element " + name + "' 					type='" + type + "' name='" + name + "' data='" + data +"' color='" + color + "' onclick='ctrl(this)'> <div class='info-flex' style='align-items: center;'><span style='border: 3px solid #a9a9a9; box-shadow: 0 0 20px 0 #818181, 0 5px 5px 0 rgba(0, 0, 0, 0.29);' class='info-div'><span style='background-image: url(&quot;image.php?serv=" + data +"&amp;company=" + company + "&quot;);' class='bck'></span><img src='image/exclamation_grey.png' class='info-img'></span><h3>Trafic indéterminé</h3></div></div>"

	} else if (type == 'TEXT'){
		return ELEMDROP + DIVDRAGEL + "<div id=" + N + " class='Element " + name + " " + txttype + "' 	type='" + type + "' txttype='" + txttype + "' name='" + name + "' data='" + data +"' align='" + align + "' color='" + color + "' onclick='ctrl(this)' contenteditable='true' placeholder='<zone de texte>'>" + data +"</div>"

	} else if (type == 'INFO'){
		var i = data.indexOf('/');
		var y = data.lastIndexOf('/');
		var param = data.substring(0, i);
		var station = data.substring(i + 1, y);
		var style = data.substring(y + 1);

		var echo = ELEMDROP + DIVDRAGEL + "<div class='Element " + name + "' type='" + type + "' name='" + name + "' data='" + data +"' color='" + color + "' onclick='ctrl(this)'>"
		echo += "<iframe src='https://mylines.fr/embed/?company=" + company + "&" + param + "=" + station + "&style=" + style + "'></iframe></div>"

		return echo;

	} else if (type == 'HTML'){
		return ELEMDROP + DIVDRAGEL + "<div class='Element " + name + "' type='" + type + "' name='" + name + "' data='" + data +"' color='" + color + "' onclick='ctrl(this)'>" + data + "</div>";
		

	} else if (type == 'SEARCH'){
		return ELEMDROP + DIVDRAGEL + "<div class='Element " + name + "' type='" + type + "' name='" + name + "' data='" + data +"' color='" + color + "' onclick='ctrl(this)'> " + searchform + " </div>"

	}
}
function NewElement(id){
	var d = new Date();
	NTIME = d.getTime();

	if (id == 'trafic'){
		document.getElementById('over' + id).style.display = 'block';
		defClass();
		
	} else if (id == 'info'){
		document.getElementById('over' + id).style.display = 'block';
		defInfo();
	
	} else if (id == 'html'){
		document.getElementById('over' + id).style.display = 'block';
		defHtml();
	
	} else if (id == 'search'){
		var el = document.getElementById('NewElement');

		var echo = CONT('Zone', 'Search1') //Fermeture de la zone
		echo += EL('SEARCH', 'search', '');
		echo += CONT('ZoneEnd', 'Search1'); //Fermeture de la zone
		echo += CONT('NewElement');

		el.outerHTML = echo;
		SetActiv(document.getElementById(n))
	
	}
	loadEl(makeJson());
}
function closeOverlay(id){
    document.getElementById('over' + id).style.display = 'none';
}

//---------- InfoTrafic
	function addClass(id){
		addEl('TRAFIC', 'trafic', id);
		document.getElementById('overtrafic').style.display = 'none';
	}
	function defClass(){
		document.getElementById('overtrafic').style.display = 'block';
		document.getElementById('addnewClass').value = '';
		document.getElementById('addnewClass').focus();
		updateClassList();
		searchClass( document.getElementById('addnewClass') );
	}
	function searchClass(id){ 
		try{
			var echo = '';
			if (id.value != ""){        

				document.getElementById('search').innerHTML = '<div class="overmouse" onclick="addClass(\'' + id.value + '\')"><img src="image/add.svg" class="svg" style="width: 25px"><span style="position: relative;top: -8px;left: 8px;">Ajouter <b>' + id.value + '</b></span></div>';

				for (el in availableClass){
					if(availableClassLower[el].indexOf(id.value.toLowerCase()) >= 0) {                        
						echo += '<div class="overmouse" onclick="addClass(\'' + availableClass[el] + '\')">' + availableClass[el] + '</div>';
					}
				}
			} else {
				document.getElementById('search').innerHTML = '';

				for (el in availableClass){
					echo += '<div class="overmouse" onclick="addClass(\'' + availableClass[el] + '\')">' + availableClass[el] + '</div>';
				}
			}
			if (echo == ''){
				document.getElementById('listClass').innerHTML = '<br><div>Aucun résultat</div>';
			} else {
				document.getElementById('listClass').innerHTML = echo;
			}
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 16') 
		}
	}
	async function getClass(){
		try{
			var url = 'edittrafic?all'; 
			
			var response = await fetch(url);	
			if (response.status === 200) {
				all = await response.json();
				availableClass = all;

			} else {
				Print_message(0,'Erreur réseau. Mylines n\'est pas accesible ou est indisponible.');
			}
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 14') 
		}
		await getStation();
	}
	function updateClassList(){
		try{
			var group = document.getElementsByTagName('input');
			var i = 0;
			var list = '[';
			availableClass = [];
			availableClassLower = [];
			for (category in group){
				if (category == "item" || category == "length"){
					break
				}
				if (group[category].name == "class"){
					var clas = group[category].value;
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
					availableClass[i] = all[train]
					availableClassLower[i] = all[train].toLowerCase()
					i++;
				}
			}            
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 15') 
		}
	}

//---------- info
	function Style(e){
		style = e;
	}
	function Param(e){
		param = e;
	}
	function defInfo(){
		document.getElementById('overinfo').style.display = 'block';
		document.getElementById('addnewInfo').value = '';
		document.getElementById('addnewInfo').focus();
		updateClassList();
		searchTrain( document.getElementById('addnewInfo') );
	}
	async function getStation(){
		var addnewInfo = document.getElementById('addnewInfo');
		ITICOMPANY = company;
		ITISEARCH = 0;
		ITISEARCHMAX = 0;
		try{
			document.getElementById('listTrain').innerHTML = '<br><div>Chargement en cours...</div>';
			var turl = 'getStation?c=' + company; 

			var echo = "";
					
			let response = await fetch(turl);	
			if (response.status === 200) {
				datas = await response.text();
				datas = JSON.parse(datas);
					
				availableInfo = [];
				availableInfoLower = [];

				for(var data in datas) {
					for (var el in datas[data]){
						availableInfo[datas[data][el]['id']] = datas[data][el]['name'];
						availableInfoLower[datas[data][el]['id']] = datas[data][el]['name'].toLowerCase();
					}
				}
				searchClass(addnewInfo);
			} else {
				document.getElementById('listTrain').innerHTML = '<br><div>Récupération des gares impossible</div>';
			}
		} catch (e) {
			console.log(e)
			document.getElementById('listTrain').innerHTML = '<br><div>Une erreur s\'est produite</div>';
		}
	}
	function searchDown(ev, id){ 
		if (ev.keyCode == 40){
			if (ITISEARCH < ITISEARCHMAX){
				ITISEARCH++;
			}
		} else if (ev.keyCode == 38){
			if (ITISEARCH > 0){
				ITISEARCH--;
			}
		}
		searchTrain(id);
	}
	function searchRes(){ 
		ITISEARCH = 0;
	}
	function searchTrain(id){ 
		//try{
			var echo = ''; var i = 0;
			if (typeof availableInfo === 'undefined') {			
				
			}
			if (id.value != ""){        
				echo += '<div style="text-align: center;color: #999;font-size: 14px;margin-bottom: 5px;"><b>Entrer</b> pour valider le choix mis en valeur</div>';

				for (el in availableInfo){
					if(availableInfoLower[el].indexOf(id.value.toLowerCase()) >= 0) {                        
						if (i == ITISEARCH){
							ITIEL = el;
							ITIGARE = availableInfo[el];
							i++;
							echo += '<div class="overmouse2" id="gareselect" name="' + el + '" onclick="addInfo(\'' + el + '\',\'' + availableInfo[el] + '\')">' + availableInfo[el] + '</div>';
						} else {
							echo += '<div class="overmouse" onclick="addInfo(\'' + el + '\',\'' + availableInfo[el] + '\')">' + availableInfo[el] + '</div>';
							i++;
						}
						ITISEARCHMAX = i-1;
					}
				}
				if (document.getElementById('gareselect')){
					document.getElementById('gareselect').focus();
				}
			} else {
				ITISEARCH = 0;
				document.getElementById('search').innerHTML = '';

				for(var data in datas) {	
					echo += '<div style="padding: 10px 0;">' + data + '</div>';
					for (var el in datas[data]){
						echo += '<div class="overmouse" style="margin-left: 10px;" onclick="addInfo(\'' + datas[data][el]['id'] + '\',\'' + datas[data][el]['name'] + '\')">' + datas[data][el]['name'] + '</div>';
					}
				}
			}
			if (echo == ''){
				document.getElementById('listTrain').innerHTML = '<br><div>Aucun résultat</div>';
			} else {
				document.getElementById('listTrain').innerHTML = echo;
			}
		//} catch (e) {
		//    console.error(e)
		//    Print_message(0, 'Une erreur s\'est produite - Err. 16') 
		//}
	}
	function handle(e){
		e.preventDefault();	

		if (document.getElementById('gareselect')){
			addInfo(ITIEL, ITIGARE);
		}

	}
	function addInfo(id){
		addEl('INFO', 'info', param + '/' + id + '/' + style);
		closeOverlay('info');
	}

//---------- InfoTrafic
	function defHtml(){
		document.getElementById('overhtml').style.display = 'block';
		document.getElementById('HtmlValue').value = '';
		document.getElementById('HtmlValue').focus();
		document.getElementById('Htmlerr').innerHTML = '';
	}
	function addHtml(){
		var val = document.getElementById('HtmlValue').value;
		var err = document.getElementById('Htmlerr');

		if (val.indexOf('<iframe') >= 0 && val.indexOf('</iframe>') >= 0 ){
			addEl('HTML', 'html', val);
			closeOverlay('html');

		} else {
			err.innerHTML = 'Intégration invalide.';

		}
	}

//---------- Initialisation
	async function getPage(){
		try{
			var url = 'editpage';
			var el = document.getElementById('data')
			el.innerHTML = 'Chargement...';


			let response = await fetch(url);	
			if (response.status === 200) {
				let datas = await response.text();
				datas = JSON.parse(datas);

				el.innerHTML = echo;
			}
		} catch (e) {
			console.error(e);
			Print_message(0, 'Récupération des pages impossible.');
			document.getElementById('edit_page').innerHTML = '<a style="color : #C61515">Une erreur s\'est produite.</a>';
		}
	}
	async function getPages(){
		try{
			var url = 'getPage';
			var el = document.getElementById('selectpage')
			el.innerHTML = '<option>Chargement...</option>';

			let response = await fetch(url);	
			if (response.status === 200) {
				let datas = await response.text();
				datas = JSON.parse(datas);

				var echo = '<option value="home">Accueil</option>' + echoListPages(datas)
				el.innerHTML = echo

				el.value = pageid;
			}
		} catch (e) {
			console.error(e);
			Print_message(0, 'Récupération des pages impossible.');
			document.getElementById('edit_page').innerHTML = '<a style="color : #C61515">Une erreur s\'est produite.</a>';
		}
	}
	function echoListPages(json){
		var echo = '';
		for (var i in json){
			echo += '<option value="' + json[i].id + '">' + json[i].name + '</option>'
			if (json[i].child != "[]"){
				echo += echoListPages(json[i].child)
			}
		}
		return echo;
	}
	function setOutils(){
		document.getElementById('loadoutils').outerHTML = '';
		document.getElementById('loadoutils2').style.display = 'initial';
	}
	async function getSearch(){
		try{
			var url = 'search-form_fake.php'; 
			
			var response = await fetch(url);	
			if (response.status === 200) {
				searchform = await response.text();
				

			} else {
				Print_message(0,'Une erreur s\'est produite - Err. 19');
			}
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 18') 
		}
	}

//---------- Fonctionnement
	function Activ(e){
		if (!document.getElementById('Outils').contains(e.target)){
			if (!document.getElementById('data').contains(e.target) && !document.getElementById('ctrl').contains(e.target) && !document.getElementById('ctrlFont').contains(e.target) && !document.getElementById('ctrlFontEx').contains(e.target)) {
				if (typeof activ !== 'undefined') {
					activ.style.border = "#00000000 3px solid";
					document.getElementById('ctrlZone').style.display = 'none' ;
					delete activ;
					var ctrl = document.getElementById('ctrl');
					var ctrlTxt = document.getElementById('ctrlTxt');
					var ctrlFont = document.getElementById('ctrlFont');
					var ctrlFontEx = document.getElementById('ctrlFontEx');
					var ctrlAlign = document.getElementById('ctrlAlign');
					var ctrlColorText = document.getElementById('ctrlColorText');
					ctrl.style.display = 'none';
					ctrlEl.style.marginTop = '';

					var dragElE = document.getElementById('drag' + ctrlEl.id)
					dragElE.style.display = 'none';

					ctrlTxt.style.display = 'none';
					ctrlFont.style.display = 'none';
					ctrlFontEx.style.display = 'none';
					ctrlAlign.style.display = 'none';
					ctrlColorText.style.display = 'none';					
					dragEl.style.display = 'none';
					
					var zonedrop = document.getElementsByClassName('zonedrop');
					var zone1 = document.getElementsByClassName('zone1')
					for (var i = 0; i < zonedrop.length; i++){
						zonedrop[i].style.display = 'none';
					}
					for (var y = 0; y < zone1.length; y++){
						zone1[y].style.margin = '2% 10% 2% 10%';
					}
				} 
			}
		}
	}
	function SetActiv(el){
		if (typeof activ !== 'undefined') {
			activ.style.border = "#00000000 3px solid";
			dragEl.style.display = 'none';
			document.getElementById('ctrlZone').style.display = 'none' ;
			delete activ;
			delete dragEl;
		}
		el.style.border = "#297CD3 3px solid";
		activ = el;
		activEl = el;
		
		dragEl = document.getElementById('drag' + activEl.id);		
		dragEl.style.display = 'block';
		var y = activ.getBoundingClientRect().height;
		var top = activ.offsetTop ;
		var res = top + ((y - 40) / 2 );
		dragEl.style.top = res + 'px';

		document.getElementById('ctrlZone').style.display = 'block' ;
		document.getElementById('ctrlZone').style.top = activ.getBoundingClientRect().y + 'px' ;
	}
	function showAlign(){
		document.getElementById('ctrlAlign').style.display = 'block' ;
		document.getElementById('ctrlAlign').style.top = (ctrlEl.getBoundingClientRect().y - 70) + 'px' ;
		document.getElementById('ctrlAlign').style.left = (ctrlEl.getBoundingClientRect().x + 269) + 'px' ;

		if (typeof alignbtn !== 'undefined') {
			alignbtn.classList.remove('cur');
			delete alignbtn;
		} 

		var align = ctrlEl.getAttribute('align');

		alignbtn = document.getElementById('align' + align);
		alignbtn.classList.add('cur');
	}
	function showFont(id){
		var idpos = id.getBoundingClientRect();

		var ctrlFontEx = document.getElementById('ctrlFontEx');

		ctrlFontEx.style.display = 'block';
		ctrlFontEx.style.top = (idpos.top - 10) + 'px';
		ctrlFontEx.style.left = (idpos.left - 10) + 'px';
	}
	function showColorText(){
		var ctrlColorText = document.getElementById('ctrlColorText');
		if (ctrlColorText.style.display == 'block'){
			ctrlColorText.style.display = 'none';

		} else {
			ctrlColorText.style.display = 'block' ;
			ctrlColorText.style.top = (ctrlEl.getBoundingClientRect().y - 17) + 'px' ;
			ctrlColorText.style.left = (ctrlEl.getBoundingClientRect().x + 110) + 'px' ;
		}
	}
	function setColorText(color) {
		document.execCommand('styleWithCSS', false, true);
		document.execCommand('foreColor', false, '#' + color);

		var ctrlColorText = document.getElementById('ctrlColorText');
		ctrlColorText.style.display = 'none';
	}
	function showColorZone() {
		SetActiv(activEl);
		var ctrlColorZone = document.getElementById('ctrlColorZone');
		
		ctrlColorZone.style.display = 'block' ;
		ctrlColorZone.style.top = (activEl.getBoundingClientRect().y) + 'px' ;
		ctrlColorZone.style.left = (activEl.getBoundingClientRect().x) + 'px' ;

		SetActiv(activEl);
		setTimeout('SetActiv(activEl);', 150);
	}
	function setColorZone(color) {
		var zone = activEl.getElementsByClassName('Zone');

		zone[0].style.backgroundColor = '#' + color;
		zone[0].setAttribute("color", color);

		var ctrlColorZone = document.getElementById('ctrlColorZone');
		ctrlColorZone.style.display = 'none';
	}
	function hide(el){
		el.style.display = 'none';
		console.log('hide')
	}
	function insertAfter(newNode, existingNode) {
		existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
	}
	function ctrl(el) {
		var x = 0;
		var y = 0;
		var ctrl = document.getElementById('ctrl');
		var ctrlTxt = document.getElementById('ctrlTxt')
		var ctrlFont = document.getElementById('ctrlFont');
		var typefont = document.getElementById('typefont');
		ctrlEl = el;

		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			x += el.offsetLeft - el.scrollLeft;
			y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}

		ctrl.style.display = 'block';
		ctrl.style.top = (y - 70) + 'px';
		ctrl.style.left = (x - 10) + 'px';
		
		ctrlEl.style.marginTop = '10px';
		var dragEl = document.getElementById('drag' + ctrlEl.id)
		dragEl.style.display = 'block';
		
		if(ctrlEl.className.indexOf('text') >= 0) {
			ctrlTxt.style.display = 'initial';
			ctrlFont.style.display = 'block';

			var type = ctrlEl.getAttribute('txttype');
			typefont.innerHTML = TXTSTYLE[type];

			if (window.innerWidth > 1005){
				ctrlFont.style.top = (y - 70) + 'px';
				ctrlFont.style.left = (ctrl.getBoundingClientRect().left + ctrl.getBoundingClientRect().width) + 'px';

			} else {
				ctrlFont.style.top = (y + 50) + 'px';
				ctrlFont.style.left = (x - 10) + 'px';
			}
		}
	}

//--------- Texte
	function format(command, value) {
		document.execCommand(command, false, value);
	}
	function setAlign(deco){
		ctrlEl.setAttribute('align', deco);

		ctrlEl.classList.remove('left');
		ctrlEl.classList.remove('center');
		ctrlEl.classList.remove('right');
		ctrlEl.classList.remove('justify');

		ctrlEl.classList.add(deco);

		document.getElementById('ctrlAlign').style.display = 'initial';
	}
	function removeDecoration() {
		var data = ctrlEl.innerHTML;

		var search = ["<b>", "</b>", "<i>", "</i>", "<u>", "</u>", "<s>", "</s>", "<strike>", "</strike>"];
		data = replaceAllArray(data, search, "");
		ctrlEl.innerHTML = data;
	}
	function setStyle(style){
		if (ctrlEl){

			var oldstyle = ctrlEl.getAttribute('txttype');
			ctrlEl.classList.remove(oldstyle)

			ctrlEl.classList.add(style);
			ctrlEl.setAttribute('txttype', style);

		}
	}
	function escapeRegExp(str){
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	function replaceAll(str, term, replace) {
		return str.replace(new RegExp(escapeRegExp(term), 'g'), replace);
	}
	function replaceAllArray(str, term, replace) {
		for (var i = 0; i < term.length; i++){
			str = replaceAll(str, term[i], replace)
		}
		return str;
	}

//---------- Nouveau éléments
	function addEl(type, name, data = ''){
		var d = new Date();
		NTIME = d.getTime();

		var el = document.getElementById('NewElement');
		if (typeof activ !== 'undefined') {
			var element = activ.getElementsByClassName('Element');
			var h = document.createElement("span");
			h.id = 'insert'  

			insertAfter(h, element[element.length - 1]);
			document.getElementById('insert').outerHTML = EL(type, name);

			loadEl(makeJson());
			
		} else {
			var echo = CONT('Zone', 'zone1') //Fermeture de la zone
			echo += EL(type, name, data);
			echo += CONT('ZoneEnd', 'zone1'); //Fermeture de la zone
			echo += CONT('NewElement');

			el.outerHTML = echo;
			loadEl(makeJson());
			SetActiv(document.getElementById(NTIME));
		}
		
	}
	function rmEl(){
		ctrlEl.outerHTML = "";

		var ctrl = document.getElementById('ctrl');
		var ctrlTxt = document.getElementById('ctrlTxt');
		var ctrlFont = document.getElementById('ctrlFont');
		var ctrlAlign = document.getElementById('ctrlAlign');
		var ctrlColorText = document.getElementById('ctrlColorText');
		ctrl.style.display = 'none';
		ctrlEl.style.marginTop = '';

		var dragElE = document.getElementById('drag' + ctrlEl.id)
		dragElE.style.display = 'none';
		
		ctrlTxt.style.display = 'none';
		ctrlFont.style.display = 'none';
		ctrlAlign.style.display = 'none';
		ctrlColorText.style.display = 'none';

		document.getElementById('ctrlZone').style.display = 'none' ;
		delete activ;
		delete activEl;

		loadEl(makeJson());
	}
	function rmZone(){
		activ.outerHTML = "";
		delete activ;
		delete activEl;

		document.getElementById('ctrlZone').style.display = 'none' ;

		loadEl(makeJson());
	}

//---------- Sauvegarde et tout les truc chiant :D
	function makeJson(){
		var page = document.getElementById('page');

		var zones = []; var zon = [];
		var zones = page.getElementsByClassName('Zone');
		var json = []; var y = 0;

		for (var i = 0; i < zones.length; i++) {
			var elz = []; var els = [];
			var element = zones[i].getElementsByClassName('Element');

			if (element.length != 0) {
				json[i] = {};
				json[i]['type'] = zones[i].getAttribute("type");
				json[i]['name'] = zones[i].getAttribute("name");
				json[i]['color'] = zones[i].getAttribute("color");
				json[i]['content'] = {};

				for (var j = 0; j < element.length; j++) {

					json[i]['content'][j] = {};

					json[i]['content'][j]['type'] = element[j].getAttribute("type");
					json[i]['content'][j]['name'] = element[j].getAttribute("name");
					json[i]['content'][j]['color'] = element[j].getAttribute("color");

					if (json[i]['content'][j]['type'] == 'TEXT'){
						json[i]['content'][j]['txttype'] = element[j].getAttribute("txttype");
						json[i]['content'][j]['data'] = escapeString(element[j].innerHTML);
						json[i]['content'][j]['align'] = element[j].getAttribute("align");
					
					} else {
						json[i]['content'][j]['txttype'] = 'null';
						json[i]['content'][j]['align'] = 'null';
						json[i]['content'][j]['data'] = escapeString(element[j].getAttribute("data"));
					}
				}

			}
		}

		return json;
	}
	function escapeString(str){
		var res = JSON.stringify(str);
		return res.substring(1, res.length - 1);
	}
	function loadEl(json){
		var z = 0; var echo = '';
		var el = document.getElementById('data');

		document.getElementById('searchbtn').style.display = 'block';

		for (var el in json){
			echo += CONT(json[el].type, json[el].name, json[el].color)

			for (var els in json[el].content){

				if (json[el].content[els].type == 'SEARCH'){
					document.getElementById('searchbtn').style.display = 'none';
				}

				echo += EL(json[el].content[els].type, json[el].content[els].name, json[el].content[els].data, json[el].content[els].color, json[el].content[els].txttype, json[el].content[els].align)
			}

			echo += CONT('ZoneEnd', 'zone1', json[el].color);		
		}

		echo += CONT('NewElement');

		document.getElementById('data').innerHTML = echo;

		STATE[STATENB] = echo;
		STATENB++; STATECUR++;

	}
	function clearPage() {
		var json = [];

		loadEl(json);
	}
	function undo(){
		if (STATECUR > 0){
			STATECUR--;
		}

		document.getElementById('data').innerHTML = STATE[STATECUR];
	}
	function redo(){
		if (STATECUR < STATENB){
			STATECUR++;
		}

		document.getElementById('data').innerHTML = STATE[STATECUR];
	}
	async function doSave(el){
		try{
			var bck = el.innerHTML;
			el.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xml:Hr="preserve"> <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" /></path> </svg>';
			el.style.paddingTop = '4px';

			var json = makeJson();

			let saveData = new FormData();
			saveData.append('data', JSON.stringify(json) );
			saveData.append('pageId', pageId );

			let response = await fetch('editpage', {
											method: 'post',
											body: saveData
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

			el.style.paddingTop = '17px';
			el.innerHTML = bck; 
			
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 18') 
		}
	}

	async function updatePageData(el){
		var bck = el.innerHTML;
		el.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xml:Hr="preserve"> <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" /></path> </svg>';
		el.style.paddingTop = '4px';

		await getPageData(pageId);

		el.style.paddingTop = '17px';
		el.innerHTML = bck; 
	}
		

	async function getPageData(el){
		try{
			var d = new Date();
			NTIME = d.getTime();

			var url = 'editpage?pageData=' + el;

			let response = await fetch(url);	
			if (response.status === 200) {
				let data = await response.json();
				
				loadEl(data);				
				
			} else {
				Print_message(0, 'Une erreur s\'est produite');
			}
		} catch (e) {
			console.error(e)
			Print_message(0, 'Une erreur s\'est produite - Err. 18') 
		}
	}


//----------

	function backlaunch(){
		history.back();
	}
	function ignorelaunch(){
		document.getElementById("root").outerHTML = '';
		document.getElementById("html").style.display = "initial";
	}

	async function launch(){
		try{
			if (imgloaded >= 7){
			
				document.getElementById('data').innerHTML = CONT('NewElement');
				
				await getPages();
				await getClass();
				await getSearch();
				await getPageData(pageId);

				if (window.innerWidth < '800'){
					document.getElementById('alert').style.display = 'block';
					document.getElementById('name').style.display = 'none';

				} else {
					//C'est bon !
					document.getElementById("root").outerHTML = '';
					document.getElementById("html").style.display = "initial";

				}

			setTimeout('setOutils()', 900);
			
			} else {
				setTimeout('launch()', 500);
			}
		} catch (e) {
			document.getElementById('error').style.display = 'block';
			document.getElementById('name').style.display = 'none';

			console.error(e);
		} 
	}

launch();