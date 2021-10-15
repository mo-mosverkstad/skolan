class Elena3AI{
    constructor(){
        this.none = null;
    }
    
    inicializar(){
        console.log("JS se está ejecutando en este momento");
        document.getElementById("Botón de búsqueda").addEventListener("click", this.botónDeBúsquendaEvento);
        this.obtenerGeolocalización();
        setInterval(this.updateTime, 1000);
    }
    
    botónDeBúsquendaEvento(evt){
        console.log(evt);
    }
    
    obtenerGeolocalización(){
        navigator.geolocation.getCurrentPosition(function(posición){
            document.getElementById("Geolocación").innerHTML = "Posición = lat: " + posición.coords.latitude.toString() + " lon: " + posición.coords.longitude.toString();
            })
    }
    
    updateTime(){
        var fechaYHora = new Date();
        var horas = fechaYHora.getHours().toString();
        var minutos = fechaYHora.getMinutes().toString();
        var segundos = fechaYHora.getSeconds().toString();
        if (minutos.length < 2){
            minutos = "0" + minutos;
        }
        if (segundos.length < 2){
            segundos = "0" + segundos;
        }
        document.getElementById("Fecha y hora").innerHTML = horas + ":" + minutos + ":" + segundos;
    }

    updateWeather(){
        var request = new XMLHttpRequest();
        request.open("GET", "https://www.smhi.se" + encodeURIComponent("https://duckduckgo.com/html/?q=stack+overflow"), true);  // last parameter must be true
        request.responseType = "document";
        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    //var a = request.responseXML.querySelector("div.result:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)");
                    console.log(a.href);
                    //document.body.appendChild(a);
                } else {
                    console.error(request.status, request.statusText);
                }
            }
        };
        request.onerror = function (e) {
        console.error(request.status, request.statusText);
        };
        request.send(null);  // not a POST request, so don't send extra data
    }
};

var e3 = new Elena3AI();
e3.inicializar();
e3.updateWeather();

$(document).ready(function () {
    $.get("www.example.com/index.php", function(data) {
        console.log(data)
    }) ;
});