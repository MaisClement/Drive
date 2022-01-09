function Show(id) {
	let el = document.getElementById(id);
	let btn = document.getElementById(id + 'btn');

	ChangeUrl(id + ' - MyLines', '?=' + id);

	el.style.display = "block";
	el.style.animation = "SettingsOptions 0.8s ease";

	if (btn)
		btn.classList.add("selected");

	if (typeof lastId !== 'undefined') {
		if (id != lastId){

			let oldel = document.getElementById(lastId);
			let oldelbtn = document.getElementById(lastId + 'btn');
			oldel.style.display = "none";
			if (btn && oldelbtn)
				oldelbtn.classList.remove("selected");
			
			document.getElementById('settings-options').scrollTo(0, 0);
		}
	}
	lastId = id
}
function Help(id) {
		id = id + 'help';

	if (document.getElementById(id).style.display == "block")
		document.getElementById(id).style.display = "none";
	else
		document.getElementById(id).style.display = "block"
	
}
function ChangeUrl(title, url) {
    if (typeof (history.pushState) != "undefined") {
        let obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } 
}

function change_color_theme(checkboxElem) {
	if (checkboxElem.checked) {
		document.cookie = "Theme=dark; expires=Thu, 01 Jan 2050 00:00:01 UTC; path=/;"; 
		window.location.reload();
	} else {
		document.cookie = "Theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload();
	}
}
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const loader = '<div class="loader"> <svg width="40px" height="40px" viewBox="0 0 50 50"> <path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite"/></path></svg></div>'
const check = '<img src="assets/img/check.svg" class="white-svg" style="height: 20px;position: relative;top: 0;">';
// -----

// Compte
//
async function api_update(){
	let api = document.getElementById("ApiValue").value;
	let button = document.getElementById("ApiBtn");
	let url = '_account2?api=' + api; 

	if (api == ''){  
		button.innerHTML = "Clé Api invalide";

	} else {
		button.innerHTML = loader;
	  
		let response = await fetch(url);	
		if (response.status === 200) {
			let data = await response.text();
			
			button.innerHTML = data;

			if(data == 'OK')
				button.innerHTML = check;
		}
	}
}
async function mail_update(){
	let mail = document.getElementById("MailValue").value;
	let code = document.getElementById("MailCode").value;
	let button = document.getElementById("MailBtn");

	let url = '_account2?mail=' + mail + '&code=' + code; 

	let atposition = mail.indexOf("@");  
	let dotposition = mail.lastIndexOf("."); 
	if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= mail.length)
		button.innerHTML = "Adresse mail invalide";

	else {
		let response = await fetch(url);	
		if (response.status === 200) {
			let data = await response.text();
			
			button.innerHTML = data;
			
			if(data == 'OK')
				button.innerHTML = check;
		}
	}
}
function account_delete(){
	document.getElementById('overdelaccount').style.display = 'block';
}
function account_back_delete(){
	document.getElementById('overdelaccount').style.display = 'none';
}

// Sécurité
//
async function password_update(){
	let oldpassword = document.getElementById("oldpassword").value;
	let newpassword = document.getElementById("newpassword").value;
	let newpassword2 = document.getElementById("newpassword2").value;
	let button = document.getElementById("PswdBtn");

	if (oldpassword == '')
		button.innerHTML = "Mot de passe invalide";

	else if (newpassword != newpassword2)
		button.innerHTML = "Les mots de passe ne correspondent pas";

	else {	  
		let formData = new FormData();
		formData.append('oldpassword', oldpassword);
		formData.append('newpassword', newpassword);
		formData.append('newpassword2', newpassword2);
	
		let url = '_account2'; 

		let response = await fetch(url, {
											method: 'post',
											body: formData
										});	
		if (response.status === 200) {
			let data = await response.text();
			
			button.innerHTML = data;
			
			if(data == 'OK')
				button.innerHTML = check;			
		}
	}
}
async function visibility_change(checkboxElem) {
	let visi_status = document.getElementById('VisiStatus');
	let visi_loader = document.getElementById('VisiLoader');
	let visi_yes = document.getElementById('visiYes');
	let visi_no = document.getElementById('visiNo');

	let url = '_account2?visibility=';


	if (checkboxElem.checked)
		url += 'public';
	else
		url += 'private';
	
	visi_loader.style.display = "block";
	visi_status.innerHTML = "";

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
        
        visi_loader.style.display = "none";
		visi_status.innerHTML = data;
		
		if(data == 'Publique' || data == 'Privé'){
			
			if (data == 'Publique'){
				visi_yes.style.display = 'block';
				visi_no.style.display = 'none';
			} else {
				visi_yes.style.display = 'none';
				visi_no.style.display = 'block';
			}
			
		}
	}
}
async function discord_unlink(){
	let button = document.getElementById("DiscoBtn");
	let url = '_account2?unlinkDiscord=true'; 
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
		
		button.innerHTML = data;
		
		if(data == 'OK'){
			document.getElementById('linkDYes').style.display = "none";
			document.getElementById('linkDYes2').style.display = "none";
            
		}
			button.innerHTML = check;
	}
}

// Personalisation
//
async function description_update(){
	let description = document.getElementById("DescValue").value;
	let button = document.getElementById("DescBtn");
	let url = '_account2?description=' + description; 
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
		
		button.innerHTML = data;
		
		if(data == 'OK')
			button.innerHTML = check;
	}
}
async function alerte_update(){
	let alerte = document.getElementById("AlerteValue").value;
	let color = document.getElementById("AlerteColor").value;
	let button = document.getElementById("AlerteBtn");
	let url = '_account2?alert=' + alerte + '&color=' + color;
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
		
		button.innerHTML = data;
		
		if(data == 'OK')
			button.innerHTML = check;
	}
}
function alert_check_color(id, data){
	let colors = document.getElementsByClassName('ColorBtn');
	for (color in colors){
		if (colors[color].id){
			colors[color].classList.remove("checked");
		}
	}

	id.classList.add("checked");

	document.getElementById("AlerteColor").value = data;
}

// Options d'affichage
//
async function style_toogle(checkboxElem, style) {
	let url = '_account2?style=' + style + '&value=';

	if (checkboxElem.checked)
		url += '1';
	else
		url += '0';
	
	document.getElementById("StyleLoader" + style ).style.display = "block";
	document.getElementById("StyleStatus" + style ).innerHTML = "";

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
        
        document.getElementById("StyleLoader" + style ).style.display = "none";
		document.getElementById("StyleStatus" + style ).innerHTML = data;
		
		if(data == 'Image'){
			document.getElementById("MapImg").style.display = "block";
			document.getElementById("MapLink").style.display = "none";
		}
		if(data == 'Lien'){
			document.getElementById("MapImg").style.display = "none";
			document.getElementById("MapLink").style.display = "block";
		}
	}
}

// Info Trafic
//
async function trafic_page_toogle(checkboxElem) {
	let url = '_account2?trafic=';
	if (checkboxElem.checked)
		url += '1';
	else
		url += '0';
	
	document.getElementById("TraficLoader").style.display = "block";
	document.getElementById("TraficStatus").innerHTML = "";

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
        
        document.getElementById("TraficLoader").style.display = "none";
		
		if(data == 'OK'){
			if (checkboxElem.checked){
				document.getElementById("TraficBtn").innerHTML = '<div id="TraficBtn"><button class="classic_fluent_btn blue" onclick="Show(\'editinfo\')" style="width: 300px;"><span id="ApiBtn">Editer</span></button></div>';
				document.getElementById("TraficStatus").innerHTML = 'Personalisé';
			} else {
				document.getElementById("TraficBtn").innerHTML = '';
				document.getElementById("TraficStatus").innerHTML = 'Par défaut';
			}
		} else {
			document.getElementById("TraficStatus").innerHTML = data;
		}
	}
}

// Plan
//
async function map_link_update(){
	var button = document.getElementById("MapLinkBtn");
	var link = document.getElementById("MapLinkValue").value;
	button.innerHTML = loader;

	link = link.replaceAll('&', '&amp;');
	link = link.replaceAll('&', '&amp;');

	if (link.substring(0, 7) == "http://"){
	
		let url = '_account2?mapLink=' + link; 
		
		let response = await fetch(url);	
		if (response.status === 200) {
			let data = await response.text();
			
			button.innerHTML = data;
			
			if(data == 'OK')
			button.innerHTML = check;
				
		}
	} else {
		button.innerHTML = 'Lien invalide';
	}
}

// Images
//
async function img_auto_upload(id, img){
	let photo = id.files[0];
	let progress = document.getElementById('progress' + img);
	let idimg = document.getElementById('img' + img);
	let del = document.getElementById('del' + img);

	progress.style.backgroundColor = '#297CD3';
	progress.style.width  = '10%';

	let url = 'upload?img=' + img; 

	let formData = new FormData();
	formData.append("avatar", photo);

	let response = await fetch(url, {method: "POST", body: formData});	
	progress.style.width  = '50%';
	
	if (response.status === 200) {
		let data = await response.text();
			progress.style.width  = '75%';
		
		if(data == 'OK'){
			let d = new Date();
			let t = d.getTime();

			idimg.src = 'image.php?serv=' + img + '&company=' + account + '&t=' + t;

			progress.style.backgroundColor = '#29D33C';
			progress.style.width  = '100%';

			del.style.display = 'block';

		} else {
			Print_message(0, data);
			progress.style.backgroundColor = '#D32929';
			progress.style.width  = '100%';
		}
	}
}
async function img_delete(id, img){
	var progress = document.getElementById('progress' + img);
	var idimg = document.getElementById('img' + img);
	var del = document.getElementById('del' + img);

	progress.style.width  = '0';

	let url = '_account2?deleteImg=' + img; 

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
		
		if(data == 'OK'){
			var d = new Date();
			var t = d.getTime();

			idimg.src = 'image.php?serv=' + img + '&company=' + account + '&t=' + t;

			del.style.display = 'none';

		} else {
			console.log(data)
			Print_message(0, data);
		}
	}
}
function img_auto_def_class_name(id){	
	var name = id.files[0].name;
	var pos = name.indexOf('.');
	var sname = name.substring(0, pos);
	
	var progress = document.getElementById('progressclass');
	progress.style.backgroundColor = '#297CD3';
	progress.style.width  = '0%';

	var inName = document.getElementById('AddClassValue')
	if (inName.value == ''){
		inName.value = sname;
		inName.style.animation = 'alert-input 5s ease';
		inName.focus();
	}
}
async function img_class_upload(id, img){
	var file = document.getElementById('AddClassFile').files[0];
	var name = document.getElementById('AddClassValue').value;
	var progress = document.getElementById('progressclass');
	var new_class = document.getElementById('newClass');

	progress.style.backgroundColor = '#297CD3';
	progress.style.width  = '10%';

	var url = 'upload?img=' + name; 

	var formData = new FormData();
	formData.append("avatar", file);
	formData.append("class", '1');

	let response = await fetch(url, {method: "POST", body: formData});	
	progress.style.width  = '50%';
	
	if (response.status === 200) {
		let data = await response.text();
			progress.style.width  = '75%';
		
		if(data == 'OK'){
			var d = new Date();
			var t = d.getTime();

			new_class.innerHTML = '<span id="' + name + '"> <img class="Img-company" style="max-width: 75px;" src="image.php?serv=' + name + '&company=' + account + '&t=' + t + '"><br><b> ' + name + ' </b> <button class="button" onclick="img_delete_class(\'' + name + '\')"><img src="assets/img/no.png" style="width: 20px; top: 5px; position: relative; left: 10px;"></button><br><br></span>' + new_class.innerHTML

			progress.style.backgroundColor = '#29D33C';
			progress.style.width  = '100%';

		} else {
			Print_message(0, data);
			progress.style.backgroundColor = '#D32929';
			progress.style.width  = '100%';
		}
	}
}
async function img_delete_class(id){
	document.getElementById(id).innerHTML = '<div class="loader"> <svg width="40px" height="40px" viewBox="0 0 50 50"> <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite"/></path></svg></div>';
	
	url = '_account2?deleteclass=' + id;
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
			
		if(data == 'OK'){
			document.getElementById(id).outerHTML = '';
		} else {
			document.getElementById(id).innerHTML = data
			Print_message(0, data)
		}
	} else {
		Print_message(0, 'Une erreur s\'est produite')
	}
}

// -----

async function import_upload(id, img){
	var file = id.files[0];
	var status = document.getElementById('ImportStatus');
	var progress = document.getElementById('progress' + img);
	var imptOk = document.getElementById('ImportOk');
	
	imptOk.style.display = 'none';

	progress.style.backgroundColor = '#297CD3';
	progress.style.width  = '10%';
	status.innerHTML = 'Transfert en cours...'

	var url = 'upload2?import=' + img;
	
	let formData = new FormData();
	formData.append("avatar", file);

	let response = await fetch(url, {
									method: "POST", 
									body: formData
									});	
		progress.style.width  = '50%';
	if (response.status === 200) {
		let data = await response.text();
			progress.style.width  = '75%';
		
		if(data == 'OK'){
			progress.style.width  = '100%';

			await import_check(img);
		} else {
			status.innerHTML = data;
			progress.style.backgroundColor = '#D32929';
			progress.style.width  = '100%';
		}
	}
}
async function import_check(img){
	var status = document.getElementById('ImportStatus');
	var progress = document.getElementById('progress' + img);

	progress.style.width  = '';
	progress.classList.add('indeterminate');

	status.innerHTML = 'Analyse...';

	var url = 'import/analyse';

	let response = await fetch(url);
	if (response.status === 200) {
		let data = await response.text();
		
		if(data == 'OK'){
			progress.classList.remove('indeterminate');

			progress.style.width  = '95%';

			status.innerHTML = 'Quelques instants...';

			await getImport();
			
			progress.style.backgroundColor = '#29d33c';
			progress.style.width  = '100%';
			status.innerHTML = 'Import effectué avec succès';
			
		} else {
			status.innerHTML = data;
			progress.style.backgroundColor = '#D32929';
			progress.style.width  = '100%';
		}
	}
}
async function import_set_filiale_type(id){
	let bckinner = id.innerHTML;
	id.innerHTML = loader;

	let val = document.querySelector('input[name="filialeType"]:checked').value;
	let overtype = document.getElementById('oversetfilialetype');

	let url = 'api/setFilialeType?name=' + FILIALENAME + '&type=' + val; 
	
	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();
				
		if(data != 'OK')
			Print_message(0, data);
	}

	await getImport();

	id.innerHTML = bckinner;
}
async function import_update(id){
	let bckinner = id.innerHTML;
	id.innerHTML = loader;

	await getImport();

	id.innerHTML = bckinner;
	
}
async function getImport(){
	var imptTime = document.getElementById('ImportTime');
	var imptNb = document.getElementById('ImportNb');
	var impt0 = document.getElementById('Import0');
	var impt1 = document.getElementById('Import1');
	var imptOk = document.getElementById('ImportOk');
	var overtype = document.getElementById('oversetfilialetype');
	var filialename = document.getElementById('filialename');
	var fichelist = document.getElementById('ficheList');
	var progress = document.getElementById('progressImportFiliale');
	var url = 'api/getImport'; 

	impt0.style.display = 'none';
	impt1.style.display = 'none';
	imptOk.style.display = 'none';
	
	var response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

		if(data == 'Session invalide'){
			Print_message(0, data);

		} else {
			var json = JSON.parse(data);

			if (json.filliale && json.filliale.length >= 1){
				let u = json.filliale[0];
				FILIALENAME = u;
				overtype.style.display = 'block';
				filialename.innerHTML = u;

				progress.style.width = ((1 / json.filliale.length) * 100) + '%';

			} else if (json.length == 0){
				impt0.style.display = 'block';
				imptOk.style.display = 'none';
				overtype.style.display = 'none';

			} else {
				impt1.style.display = 'block';
				imptTime.innerHTML = json.time;
				imptNb.innerHTML = json.length;
				imptOk.style.display = 'block';
				overtype.style.display = 'none';

				if (json.fiche){
					let echo = '';
					for (var i = 0; i < json.fiche.length; i++ ){
						echo += '<div class="fiche">';
						echo += '<b>' + json.fiche[i].origine + '</b><br>→ ' + json.fiche[i].destination + '</b><br><br>'

						echo += '<div class="small_fluent_btn" onclick="fiche_edit(\'' + json.fiche[i].name + '\')" style="max-width: 145px;">';
						echo += '<img src="assets/img/edit.svg" class="svg"><span>Modifier</span>';
						echo += '</div>';
						echo += '<span class="space"></span>';
						echo += '<div class="small_fluent_btn" onclick="getImport()" style="width: 43px; display: inline-block;"><img src="assets/img/pdf.svg" class="svg"></div>';
						echo += '<div class="small_fluent_btn" onclick="getImport()" style="width: 43px; display: inline-block;"><img src="assets/img/csv.svg" class="svg"></div>';
						echo += '<div class="small_fluent_btn" onclick="getImport()" style="width: 43px; display: inline-block;"><img src="assets/img/code.svg" class="svg"></div>';
						echo += '</div><br>';
					}
					fichelist.innerHTML = echo;
				}
			}
		}
	}
}

async function fiche_generate(){
	let origine = document.getElementById('FicheOri').value;
	let destination = document.getElementById('FicheDes').value;
	let V = document.getElementById('checkTypeV').checked ? 'True' : 'False';
	let W = document.getElementById('Winput').checked ? 'True' : 'False';
	let F = document.getElementById('checkTypeF').checked ? 'True' : 'False';
	let T = document.getElementById('checkTypeT').checked ? 'True' : 'False';

	let res = document.getElementById('ficheresult');

	Show('ficheres1');

	res.innerHTML = '<span class="progress-bck"></span><span class="progress indeterminate"></span>';

	let url = 'import/fiche.php?ori=' + origine + '&des=' + destination +'&V=' + V + '&W=' + W + '&F=' + F + '&T=' + T;

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

		url = 'import/getFiche.php?type=html&name=' + data;

		response = await fetch(url);	
		if (response.status === 200) {
			data = await response.text();
			
			res.innerHTML = data;	
		}
	}
}
async function fiche_edit(name){
	let res = document.getElementById('ficheresult');

	Show('ficheres1');

	res.innerHTML = '<span class="progress-bck"></span><span class="progress indeterminate"></span>';

	let url = 'import/getFiche.php?type=html&name=' + name;

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

		res.innerHTML = data;	
	}
}
async function fiche_delete(name, el){
	let res = document.getElementById('ficheresult');

	Show('ficheres1');

	let url = 'import/deleteFiche.php?name=' + name;

	let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.text();

		if (data == 'OK'){
			
		}
	}
}
//

// Global
//
function lengthStr (id, max){
	var data = document.getElementById(id + 'Value').value;
	var len = document.getElementById(id+ 'len');
	len.innerHTML = data.length + ' / ' + max;
	if (data.length == max){
		len.style.color = 'red';
		len.style.animation = 'Rumble 0.3s';
	} else {
		len.style.color = 'inherit';
		len.style.animation = '';
	}

	if (data == 'BOUQUET'){
		len.innerHTML = 'Vous venez de gagner 10% de réduction chez Croc-Canard !';
		len.style.animation = 'Rumble 0.3s';
		len.style.color = '#297CD3';
		Print_message(2, 'Easter Egg !');
	}
}
function escapeString(str){
	var res = JSON.stringify(str);
	return res.substring(1, res.length - 1);
}
function escapeRegExp(str){
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, term, replace) {
	return str.replace(new RegExp(escapeRegExp(term), 'g'), replace);
}
function latin(id){ // ’
	var txt = id.value
	ntxt = replaceAll(txt, "\'", "");
	ntxt = replaceAll(ntxt, "\"", "");
	if (ntxt != txt){
		document.getElementById('info_err').innerHTML = 'Le nom d\'une page ne peut contenir d\'apostrophe ou de guillemet ( \' ou \" ).';
	}
	id.value = ntxt;
}
var Latinise={};
Latinise.latin_map={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
  String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
  String.prototype.latinize=String.prototype.latinise;
  String.prototype.isLatin=function(){return this==this.latinise()
}

// -----

async function launch(){
	try{
		if (visi == 'public'){
			document.getElementById('visiYes').style.display = 'block';
			document.getElementById('visiYes2').style.display = 'block';
			document.getElementById('visiCheck').checked = true;
			document.getElementById('VisiStatus').innerHTML = 'Publique';
		} else {
			document.getElementById('visiNo').style.display = 'block';
			document.getElementById('visiNo2').style.display = 'block';
			document.getElementById('VisiStatus').innerHTML = 'Privé';
		}

		if (api != ''){
			document.getElementById('linktYes').style.display = 'block';
			document.getElementById('linktYes2').style.display = 'block';
		} else {
			document.getElementById('linktNo').style.display = 'block';
			document.getElementById('linktNo2').style.display = 'block';
		}

		if (discord == true){
			document.getElementById('linkDYes').style.display = 'block';
			document.getElementById('linkDYes2').style.display = 'block';
		}

		if (getCookie('Theme') == "dark"){
			document.getElementById('toggleMode').checked = true;
			document.getElementById('toggleVal').innerHTML = 'Mode sombre';
		} else {
			document.getElementById('toggleVal').innerHTML = 'Mode clair';
		}

		await getInfo();
		await getHide();
		await getPage();
		await getTrafic();
		await getImport();

		let param = window.location.href.substring(window.location.href.indexOf('?=') + 2);
		if (document.getElementById( param ) ){
			setTimeout('Show("' + param + '");', 200);
		} else {
			setTimeout('Show("home");', 200);
		}
	} catch (e) {
		Print_message(0, 'Une erreur s\'est produite');
		console.error(e);

	} finally {
		//C'est bon !
		document.getElementById("root").outerHTML = '';
		document.getElementById("html").style.display = "initial";
		
	}
}