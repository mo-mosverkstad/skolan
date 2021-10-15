class GrecoRaiAI{
    constructor(){
        this.none = null;
    }
    
    init(){
        console.log("JS se est· ejecutando en este momento");
        document.getElementById("search-button").addEventListener("click", this.searchEvent);
        g.getGeolocation();
        setInterval(this.updateTime, 1000);
    }
    
    searchEvent(evt){
        console.log(evt);
    }
    
    getGeolocation(){
        navigator.geolocation.getCurrentPosition(function(position){
            document.getElementById("geoPos").innerHTML = "Posici√≥n = lat: " + position.coords.latitude.toString() + " lon: " + position.coords.longitude.toString();
            })
    }
    
    updateTime(){
        var time = new Date();
        var hours = time.getHours().toString();
        var minutes = time.getMinutes().toString();
        var secounds = time.getSeconds().toString();
        if (minutes.length < 2){
            minutes = "0" + minutes;
        }
        if (secounds.length < 2){
            secounds = "0" + secounds;
        }
        document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + secounds;
    }
};

var g = new GrecoRaiAI();
g.init();