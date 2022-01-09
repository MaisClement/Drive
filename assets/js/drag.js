//--------- Drag Zone

// draggable="true" ondragstart="drag(event)" ondrop="drop(event, 0)" ondragover="allowDrop(event, this)"

function drag(id) {    
    if (id.className.includes("drag")){

        DRAGEL = id.parentElement;
        DRAGALLOW = 'ZONE';

        var zonedrop = document.getElementsByClassName('zonedrop');
        var zone1 = document.getElementsByClassName('zone1')
        for (var i = 0; i < zonedrop.length; i++){
            zonedrop[i].style.display = 'block';
        }
        for (var y = 0; y < zone1.length; y++){
            zone1[y].style.marginTop = 'calc(2% - 5px)';
            zone1[y].style.marginBottom = 'calc(2% - 5px)';
        }
    }
}
function drop(event){
    if (event.target.className.includes("zonedrop")){
        var zonedrop = document.getElementsByClassName('zonedrop');
        var zone1 = document.getElementsByClassName('zone1')
        for (var i = 0; i < zonedrop.length; i++){
            zonedrop[i].style.display = 'none';
        }
        for (var y = 0; y < zone1.length; y++){
            zone1[y].style.margin = '2% 10% 2% 10%';
        }

        var data = DRAGEL.outerHTML;
        DRAGEL.outerHTML = '';
        event.target.outerHTML = data;

        loadEl(makeJson());
    
    }    
}
function colorDrop(id){
	id.style.backgroundColor = "#297CD3";
}
function endDrop(id) {
	id.style.backgroundColor = "";
}

function allowDrop(ev, id) {
    if (id.className == 'zonedrop' && DRAGALLOW == 'ZONE') {
        ev.preventDefault();
    } else if (id.className == 'elemdrop' && DRAGALLOW == 'ELEM') {
        ev.preventDefault();
    }
}


//--------- Drag El

function dragElement(id, el) {    
    if (id.className.includes("dragEl")){

        var ctrl = document.getElementById('ctrl');
		var ctrlTxt = document.getElementById('ctrlTxt');
		var ctrlFont = document.getElementById('ctrlFont');
		var ctrlAlign = document.getElementById('ctrlAlign');
		var ctrlColorText = document.getElementById('ctrlColorText');
		ctrl.style.display = 'none';
		ctrlEl.style.marginTop = '';
		
		ctrlTxt.style.display = 'none';
		ctrlFont.style.display = 'none';
		ctrlAlign.style.display = 'none';
		ctrlColorText.style.display = 'none';

        var elemdrop = document.getElementsByClassName('elemdrop');
        for (var i = 0; i < elemdrop.length; i++){
            elemdrop[i].style.display = 'block';
        }

        DRAGEL = document.getElementById(el);
        DRAGALLOW = 'ELEM';

    }
}
function dropElement(event){
    if (event.target.className.includes("elemdrop")){
        var elemdrop = document.getElementsByClassName('elemdrop');
        for (var i = 0; i < elemdrop.length; i++){
            elemdrop[i].style.display = 'none';
        }

        var data = DRAGEL.outerHTML;
        DRAGEL.outerHTML = '';
        event.target.outerHTML = data;

        loadEl(makeJson());    
    }    
}

