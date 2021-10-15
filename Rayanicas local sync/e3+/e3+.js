class Elena3Flow{
    constructor(){
        this.none = null;
    }
    
    inicializar(){
        console.log("JS se está ejecutando en este momento");
        document.getElementById("Botón de búsqueda").addEventListener("click", this.botónDeBúsquendaEvento);
        document.getElementById("Botón de inicar sessión").addEventListener("click", this.botónDeInicarSessión);
        this.obtenerGeolocalización();
        setInterval(this.updateTime, 1000);
    }
    
    botónDeBúsquendaEvento(evt){
        console.log("este es cercando");
    }
    
    botónDeInicarSessión(evt){
        window.open("https://www.w3schools.com","_self")
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

class Elena3AI{
    constructor(){
        this.memoria = {cosa1: {cosa1: 1, cosa2: 2}, cosa2: {cosa1: 3, cosa2: 2}};
        this.valores = ["cosa1", "cosa2"];
        this.a = "cosa2";
        this.m = [1, 2, 1, 2, 2, 1, 1, 2, 2];
    }
    /*
    añadir(info){
        if (this.memoria[info] == undefined){
            this.memoria[info] = 1;
        }
        else{
            this.memoria[info] = this.memoria[info] + 1;
        }
    }
    */
    
    obtenerTamaño(){
        var tamaño = 0;
        for (var i of Object.values(this.memoria)){
            tamaño = tamaño + Object.values(i).reduce(function(a1, a2){
                return a1+a2;
            })
        }
        return tamaño;
    }
    
    obtenerProbabilidad(consulta){
        var cantidad = this.memoria[consulta][this.a];
        var pab = cantidad/this.obtenerTamaño();
        var pb = Object.values(this.memoria[consulta]).reduce(function(a1, a2){
            return a1+a2;
        });
        return pab*pb;
    }
    
    predecir(){
        var max = 0;
        var maxValor = "";
        for (var valor of this.valores){
            var probabilidad = this.obtenerProbabilidad(valor)
            if (probabilidad > max){
                max = probabilidad;
                maxValor = valor;
            }
        }
        return maxValor;
    }
    
}

var e3f = new Elena3Flow();
e3f.inicializar();

var e3a = new Elena3AI();
console.log(e3a.predecir())