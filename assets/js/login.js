// Connexion
//
function loginload(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');

    bck.style.backgroundColor = '';
    progress.classList.add('indeterminate');
}

// Inscription
//
async function setMail(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var mail = document.getElementById('formmail').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(validateEmail(mail)){

        bck.style.backgroundColor = '';
        progress.classList.add('indeterminate');
        err.innerHTML = '';

        let formData = new FormData();
        formData.append('setMail', mail);

        let response = await fetch('signup', {
                                        method: 'post',
                                        body: formData
                                        });	
        if (response.status === 200) {
            let data = await response.text();

            if (IsJsonString(data)){
                var json = JSON.parse(data);

                err.innerHTML = json.error;
                window.location.replace(json.redirect);

                bck.style.backgroundColor = '#FFF0';
                progress.classList.remove('indeterminate');
            } else {
                form.innerHTML = data;
                
            }
        } else {
            err.innerHTML = 'Une erreur s\'est produite';
        }
    } else {
        err.innerHTML = 'Adresse mail invalide';
    }
}
async function setName(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var name = document.getElementById('formname').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    bck.style.backgroundColor = '';
    progress.classList.add('indeterminate');
    err.innerHTML = '';

    let formData = new FormData();
    formData.append('setName', name);

    let response = await fetch('signup', {
                                    method: 'post',
                                    body: formData
                                    });	
    if (response.status === 200) {
        let data = await response.text();

        if (IsJsonString(data)){
            var json = JSON.parse(data);

            err.innerHTML = json.error;

            bck.style.backgroundColor = '#FFF0';
            progress.classList.remove('indeterminate');
        } else {
            form.innerHTML = data;
            
        }
    } else {
        Print_message(0, 'Une erreur s\'est produite');
    }
}
async function setPassword(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var password = document.getElementById('formpassword').value;
    var password2 = document.getElementById('formpassword2').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(password.length >= 8){
        if ( password == password2){

            bck.style.backgroundColor = '';
            progress.classList.add('indeterminate');
            err.innerHTML = '';

            let formData = new FormData();
            formData.append('setPassword', password);
            formData.append('setPassword2', password2);

            let response = await fetch('signup', {
                                            method: 'post',
                                            body: formData
                                            });	
            if (response.status === 200) {
                let data = await response.text();

                if (IsJsonString(data)){
                    var json = JSON.parse(data);

                    err.innerHTML = json.error;

                    bck.style.backgroundColor = '#FFF0';
                    progress.classList.remove('indeterminate');
                } else {
                    form.innerHTML = data;
                    
                }
            } else {
                err.innerHTML = 'Une erreur s\'est produite';
            }
        } else {
            err.innerHTML = 'Les deux mots de passe ne correspondent pas';
        }
    } else {
        err.innerHTML = 'Votre mot de passe doit avoir au moins 8 caractères';
    }
}
async function finish(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var cgu = document.getElementById('formcgu');
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(cgu.checked){
        bck.style.backgroundColor = '';
            progress.classList.add('indeterminate');
            err.innerHTML = '';

            let formData = new FormData();
            formData.append('finish', '1');

            let response = await fetch('signup', {
                                            method: 'post',
                                            body: formData
                                            });	
            if (response.status === 200) {
                let data = await response.text();

                if (IsJsonString(data)){
                    var json = JSON.parse(data);

                    err.innerHTML = json.error;

                    bck.style.backgroundColor = '#FFF0';
                    progress.classList.remove('indeterminate');
                } else {
                    form.innerHTML = data;
                    
                }
            } else {
                err.innerHTML = 'Une erreur s\'est produite';
            }
    } else {
        err.innerHTML = 'Vous devez avoir lu est approuvé les conditions générales d\'utilisation';
    }
}

// Inscription avec Google
//
async function gsetName(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var name = document.getElementById('gname').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    bck.style.backgroundColor = '';
    progress.classList.add('indeterminate');
    err.innerHTML = '';

    let formData = new FormData();
    formData.append('gsetName', name);

    let response = await fetch('signup', {
                                    method: 'post',
                                    body: formData
                                    });	
    if (response.status === 200) {
        let data = await response.text();

        if (IsJsonString(data)){
            var json = JSON.parse(data);

            err.innerHTML = json.error;

            bck.style.backgroundColor = '#FFF0';
            progress.classList.remove('indeterminate');
        } else {
            form.innerHTML = data;
            
        }
    } else {
        Print_message(0, 'Une erreur s\'est produite');
    }
}
async function gfinish(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var cgu = document.getElementById('gcgu');
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(cgu.checked){
        bck.style.backgroundColor = '';
            progress.classList.add('indeterminate');
            err.innerHTML = '';

            let formData = new FormData();
            formData.append('gfinish', '1');

            let response = await fetch('signup', {
                                            method: 'post',
                                            body: formData
                                            });	
            if (response.status === 200) {
                let data = await response.text();

                if (IsJsonString(data)){
                    var json = JSON.parse(data);

                    err.innerHTML = json.error;

                    bck.style.backgroundColor = '#FFF0';
                    progress.classList.remove('indeterminate');
                } else {
                    form.innerHTML = data;
                    
                }
            } else {
                err.innerHTML = 'Une erreur s\'est produite';
            }
    } else {
        err.innerHTML = 'Vous devez avoir lu est approuvé les conditions générales d\'utilisation';
    }
}

// Mot de passe oublié
//
async function forgotMail(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var mail = document.getElementById('forgotmail').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(validateEmail(mail)){

        bck.style.backgroundColor = '';
        progress.classList.add('indeterminate');
        err.innerHTML = '';

        let formData = new FormData();
        formData.append('forgotMail', mail);

        let response = await fetch('passwordreset', {
                                        method: 'post',
                                        body: formData
                                        });	
        if (response.status === 200) {
            let data = await response.text();

            if (IsJsonString(data)){
                var json = JSON.parse(data);

                err.innerHTML = json.error;

                bck.style.backgroundColor = '#FFF0';
                progress.classList.remove('indeterminate');
            } else {
                form.innerHTML = data;
                
            }
        } else {
            err.innerHTML = 'Une erreur s\'est produite';
        }
    } else {
        err.innerHTML = 'Adresse mail invalide';
    }
}
async function forgetPassword(){
    var bck = document.getElementById('progressBck');
    var progress = document.getElementById('progress');
    var password = document.getElementById('forgetpassword').value;
    var password2 = document.getElementById('forgetpassword2').value;
    var err = document.getElementById('err');
    var form = document.getElementById('form');

    if(password.length >= 8){
        if ( password == password2){

            bck.style.backgroundColor = '';
            progress.classList.add('indeterminate');
            err.innerHTML = '';

            let formData = new FormData();
            formData.append('forgetPassword', password);
            formData.append('forgetPassword2', password2);

            let response = await fetch('passwordreset', {
                                            method: 'post',
                                            body: formData
                                            });	
            if (response.status === 200) {
                let data = await response.text();

                if (IsJsonString(data)){
                    var json = JSON.parse(data);

                    err.innerHTML = json.error;

                    bck.style.backgroundColor = '#FFF0';
                    progress.classList.remove('indeterminate');
                } else {
                    form.innerHTML = data;
                    
                }
            } else {
                err.innerHTML = 'Une erreur s\'est produite';
            }
        } else {
            err.innerHTML = 'Les deux mots de passe ne correspondent pas';
        }
    } else {
        err.innerHTML = 'Votre mot de passe doit avoir au moins 8 caractères';
    }
}

// Global
//
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function escapeRegExp(str){
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, term, replace) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replace);
}
function latin(id){
    var txt = id.value
    ntxt = replaceAll(txt, "\\", "");
    ntxt = replaceAll(ntxt, "/", "");
    ntxt = replaceAll(ntxt, "|", "");
    ntxt = replaceAll(ntxt, "&", "");
    ntxt = replaceAll(ntxt, "=", "");
    if (ntxt != txt){
        document.getElementById('err').innerHTML = 'Le nom d\'un compte ne peut contenir les caractères \\  /  | = et &  ';
    }
    document.getElementById(id).value = ntxt;
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}