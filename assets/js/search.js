async function defGare(id){
	var addnew = document.getElementById('addnew');

	document.getElementById('over').style.display = 'block';
    addnew.value = '';
    addnew.focus();
	
    searchClass( addnew );
    insertEl = id;

	var radios = document.getElementsByName('type');
	for (var radio of radios) {
		if (radio.checked) {
			if(radio.value == 'Itinéraires'){
				addnew.placeholder = 'D\'où partons nous ?';
				CHECKITINERAIRES = 0;
				await getStation(ITICOMPANY);
			} else {
				addnew.placeholder = 'Rechercher une gare';
			}
		}
	}
}
function closeOverlay(){
    document.getElementById('over').style.display = 'none';
	if (typeof CHECKITINERAIRES === 'undefined') {
		delete CHECKITINERAIRES;
	}
}
async function getStation(company){
	var addnew = document.getElementById('addnew');
	ITICOMPANY = company;
	ITISEARCH = 0;
	ITISEARCHMAX = 0;
	try{
		document.getElementById('listTrain').innerHTML = '<br><div>Chargement en cours...</div>';
		url = 'getStation?c=' + company; 

		var echo = "";
				
		let response = await fetch(url);	
		if (response.status === 200) {
			datas = await response.text();
			datas = JSON.parse(datas);
				
			available = [];
			availableLower = [];

			for(var data in datas) {
				for (var el in datas[data]){
					available[datas[data][el]['id']] = datas[data][el]['name'];
					availableLower[datas[data][el]['id']] = datas[data][el]['name'].toLowerCase();
				}
			}
			searchClass(addnew);
		} else {
			Print_message(0, 'Récupération des gares impossible')
		}
	} catch (e) {
		console.log(e)
		Print_message(0, 'Récupération des gares impossible');
		document.getElementById('listTrain').innerHTML = '<br><div>Une erreur s\'est produite</div>';
	}
}
async function getRoute(from){
	var addnew = document.getElementById('addnew');
	try{
		document.getElementById('listTrain').innerHTML = '<br><div>Recherche des trajet possible depuis <b>' + ITINAME + '</b>.<br>Chargement en cours...</div>';
		url = 'getRoute?from='+ from + '&company=' + ITICOMPANY; 

		var echo = "";
				
		let response = await fetch(url);	
		if (response.status === 200) {
			datas = await response.text();
			datas = JSON.parse(datas);
				
			available = [];
			availableLower = [];

			for(var data in datas) {
				for (var el in datas[data]){
					available[datas[data][el]['id']] = datas[data][el]['name'];
					availableLower[datas[data][el]['id']] = datas[data][el]['name'].toLowerCase();
				}
			}
			searchClass( addnew );
		} else {
			Print_message(0, 'Récupération des gares impossible')
		}
	} catch (e) {
		console.log(e)
		Print_message(0, 'Récupération des gares impossible');
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
	searchClass(id);
}
function searchRes(){ 
    ITISEARCH = 0;
}
function searchClass(id){ 
    //try{
        var echo = ''; var i = 0;
		if (typeof available === 'undefined') {			
			
		}
        if (id.value != ""){        
			echo += '<div style="text-align: center;color: #999;font-size: 14px;margin-bottom: 5px;"><b>Entrer</b> pour valider le choix mis en valeur</div>';

            for (el in available){
                if(availableLower[el].indexOf(id.value.toLowerCase()) >= 0) {                        
                    if (i == ITISEARCH){
						ITIEL = el;
						ITIGARE = available[el];
						i++;
						echo += '<div class="overmouse2" id="gareselect" name="' + el + '" onclick="addStation(\'' + el + '\',\'' + available[el] + '\')">' + available[el] + '</div>';
					} else {
						echo += '<div class="overmouse" onclick="addStation(\'' + el + '\',\'' + available[el] + '\')">' + available[el] + '</div>';
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
					echo += '<div class="overmouse" style="margin-left: 10px;" onclick="addStation(\'' + datas[data][el]['id'] + '\',\'' + datas[data][el]['name'] + '\')">' + datas[data][el]['name'] + '</div>';
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
		console.log(ITIEL);
		console.log(ITIGARE);
		addStation(ITIEL, ITIGARE);
	}

}
async function addStation(id, name){
	var element = document.getElementById('select');

	var radios = document.getElementsByName('type');
	for (var radio of radios) {
		if (radio.checked) {
			if(radio.value == 'Itinéraires'){
				if (CHECKITINERAIRES == 0){
					CHECKITINERAIRES++;
					ITINAME = name;
					ITIID = id;
					var addnew = document.getElementById('addnew');

					addnew.placeholder = 'Où allons nous ?';
					addnew.value = '';
					addnew.focus();
					delete available;
					delete availableLower;
					await getRoute(id);
					searchClass( addnew );
				} else {

					element.innerHTML = ITINAME + ' → ' + name;
					ITIID2 = id;
					closeOverlay();
				}
			} else {
				element.innerHTML = name;
				element.name = id;
				closeOverlay();
			}
		}
	}

	
}
function Select(id){
	var element = document.getElementById('select');
	element.innerHTML = 'Rechercher une gare ou un itinéraire';
	element.name = '';

	if (id == 'Itinéraires'){
		document.getElementById("choose").style.left = "0px";
		document.getElementById("choose").style.width = "120px";
		document.getElementById("choose").style.backgroundColor  = "#297CD3";
		document.getElementById("ItinérairesCheck").checked = true;
		document.getElementById("form2").style.display = "block";
	}
	if (id == 'Départs'){
		document.getElementById("choose").style.left = "130px";
		document.getElementById("choose").style.width = "108px";
		document.getElementById("choose").style.backgroundColor  = "#297CD3";
		document.getElementById("DépartsCheck").checked = true;
		document.getElementById("form2").style.display = "none";
	}
	if (id == 'Arrivées'){
		document.getElementById("choose").style.left = "245px";
		document.getElementById("choose").style.width = "108px";
		document.getElementById("choose").style.backgroundColor  = "#09914a";
		document.getElementById("ArrivéesCheck").checked = true;
		document.getElementById("form2").style.display = "none";
	}
}
function Details(id){
	var details = 'details' + id;
	var detail = 'detail' + id;
	var img = 'img' + id;

	if(document.getElementById(details).style.display == "none"){
		document.getElementById(details).style.display = "block";
		document.getElementById(detail).style.display = "block";
		document.getElementById(img).style.transform = "rotate(180deg)";

		if (document.getElementById('tarifs' + id)){
			var width = document.getElementById('details' + id).offsetWidth;
			var width2 = document.getElementById('tarifs' + id).offsetWidth;
			width = width - width2 - 30;
			document.getElementById('desserte' + id).style.width = width + 'px';
		}
	
	} else{
		document.getElementById(details).style.display = "none";
		document.getElementById(detail).style.display = "none";
		document.getElementById(img).style.transform = "rotate(0deg)";
	}
}
function trajectlink(id){
	document.getElementById("trajectlink").style.top = getPosition(id).y +'px';
	document.getElementById("trajectlink").style.left = (getPosition(id).x -50) +'px';
}

async function Search(){
	
	//document.getElementById("Btn").innerHTML = 'Patientez...';	
	var radios = document.getElementsByName('type');
	for (var radio of radios) {
		if (radio.checked) {		
			
			document.getElementById("Btn").innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xml:space="preserve"> <path fill="#297CD3" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" /></path> </svg>';

			if(radio.value == 'Départs'){
				if(document.getElementById("select").name != 0){

					url = 'getDep?from=' + document.getElementById("select").name + '&company=' + ITICOMPANY;
					let response = await fetch(url);
			
					if (response.status === 200) {
						let data = await response.text();
						
						if(data == 'OK'){
							document.getElementById("Btn").innerHTML = 'Quelques instants...';
							window.location.href = 'départs?company=' + ITICOMPANY + '&from=' + document.getElementById("select").name ;
						}
						if(data == 'Api Invalide'){
							document.getElementById("Btn").innerHTML = 'Une erreur s\'est produite';
						}
						if(data == 'Erreur Api'){
							document.getElementById("Btn").innerHTML = 'Erreur Api';
						}
					}

				} else if (document.getElementById("select").name == 0){
					document.getElementById("Btn").innerHTML = 'Valider';
				}

			} else if(radio.value == 'Arrivées'){
				if(document.getElementById("select").name != 0){

					url = 'getArr?from=' + document.getElementById("select").name + '&company=' + ITICOMPANY;
					let response = await fetch(url);
			
					if (response.status === 200) {
						let data = await response.text();
						
						if(data == 'OK'){
							document.getElementById("Btn").innerHTML = 'Quelques instants...';
							window.location.href = 'arrivées?company=' + ITICOMPANY + '&from=' + document.getElementById("select").name ;
						}
						if(data == 'Api Invalide'){
							document.getElementById("Btn").innerHTML = 'Une erreur c\'est produite';
						}
						if(data == 'Erreur Api'){
							document.getElementById("Btn").innerHTML = 'Erreur Api';
						}
					}
							
				} else if (document.getElementById("select").name == 0){
					document.getElementById("Btn").innerHTML = 'Valider';
				}
			} else if (radio.value == 'Itinéraires'){
				if (typeof ITIID !== undefined && typeof ITIID2 !== undefined) {									
					url = 'getRoute2?from=' + ITIID + '&to=' + ITIID2 +'&company=' + ITICOMPANY;
					let response = await fetch(url);
			
					if (response.status === 200) {
						let data = await response.text();
						
						if(data == 'OK'){
							document.getElementById("Btn").innerHTML = 'Quelques instants...';
							window.location.href = 'itinéraires?company=' + ITICOMPANY + '&from=' + ITIID + '&to=' + ITIID2;
						}
						if(data == 'Api Invalide'){
							document.getElementById("Btn").innerHTML = 'Une erreur c\'est produite';
						}
					}					
				}
			}	
		}
	}
}

function Info(id){
	var Info = 'Info' + id;
	var Down = 'InfoDown' + id;

	if(document.getElementById(Info).style.display == "none"){
		document.getElementById(Info).style.display = "block";
		if ( document.getElementById(Down) ){
       		document.getElementById(Down).style.display = "none";
		}
	
	} else{
		document.getElementById(Info).style.display = "none";
        if ( document.getElementById(Down) ){
			document.getElementById(Down).style.display = "initial";
	 	}
	}
}
function trajectlink(id, code, name){
	document.getElementById("trajectlink").style.display = 'block';
	document.getElementById("trajectlink").style.opacity = 1;
	document.getElementById("trajectlink").style.top = (getPosition(id).y + 50) +'px';
	document.getElementById("trajectlink").style.left = getPosition(id).x +'px';
	bck_id = id;
	bck_code = code;
	bck_name = name;
	if (typeof timeout !== 'undefined') {
		clearTimeout(timeout);
	}	
	els = document.getElementsByClassName('trajectlinkName');
	for(el in els){
		if (!isNaN(el)){
			els[el].innerHTML = name
	}}
	els = document.getElementsByClassName('trajectlinkUrl');
		els[0].href = 'itinéraires?company=' + company + '&from=' + origine + '&to=' + code
		els[1].href = 'départs?company=' + company + '&from=' + code
		els[2].href = 'arrivées?company=' + company + '&from=' + code
}
function trajectlinkhide(){
	document.getElementById("trajectlink").style.opacity = 0;
	timeout = setTimeout('document.getElementById("trajectlink").style.display = "none"', 300);
	
}
function getPosition(el) {
	var xPos = 0;
	var yPos = 0;
	
	while (el) {
		if (el.tagName == "BODY") {
		// deal with browser quirks with body/window/document and page scroll
		var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
		var yScroll = el.scrollTop || document.documentElement.scrollTop;
	
		xPos += (el.offsetLeft - xScroll + el.clientLeft);
		yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
		// for all other non-BODY elements
		xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}
	
		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

Select('Itinéraires');