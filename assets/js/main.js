console.log( "%cSTOP!", "color:#f00;font-size:xxx-large" );
console.log("%cSi quelqu'un t'a demander de copier/coller quelque chose ici, il y'a environ 11 chances sur 10 que ce soit une arnaque !", "font-size:large");
console.log("%cCopier quelque chose ici t'expose a un vol de tes données par une attaque appelé Self-XSS.", "font-size:normal");
console.log("%cNe saisissez ou ne copiez en AUCUN CAS du code que vous ne comprenez pas.", "color:#f00;font-size:large");
console.log("%cPour en savoir plus : https://en.wikipedia.org/wiki/Self-XSS", "font-size:small");		
function logout(){
    document.getElementById('logout').style.display = "block";
}
function nologout(){
    document.getElementById('logout').style.display = "none";
}
function navShow(el, id){
    var child = document.getElementById('child' + id);
    child.style.display = "block";
    el.getBoundingClientRect();

    child.style.top = el.getBoundingClientRect().top + "px";
    child.style.right = (el.getBoundingClientRect().left - el.getBoundingClientRect().left) + "px";
}
if (document.getElementById("marquee-rtl2")){
    var text = document.getElementById("marquee-rtl2").offsetWidth

    text = text/80
    document.getElementById("marquee-rtl2").style.animationDuration = text + 's';
}
function navHide(e, id){
    var child = document.getElementById('child' + id);
    child.style.display = "none";
}
function menuOp(){
    document.getElementById('bckmenu').style.display = "block";
    document.getElementById('menu').style.display = "block";
    document.getElementById('menu').style.right = "0";
}
function menuClose(){
    document.getElementById('bckmenu').style.display = "none";
    document.getElementById('menu').style.right = "-70%";
    setTimeout("document.getElementById('menu').style.display = 'none'", 700);
}
function expand(id, img){
    var el = document.getElementById("child" + id);
    
    if (el){
        if (el.style.display == 'none'){
            el.style.display = 'block';
            img.style.top = '4px';
            img.style.transform = '';
        } else {
            el.style.display = 'none';
            img.style.top = '0';
            img.style.transform = 'rotate(-90deg)'; 
        }
    }
}