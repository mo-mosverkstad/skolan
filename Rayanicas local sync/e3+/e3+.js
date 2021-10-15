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

};

var e3 = new Elena3AI();
e3.inicializar();