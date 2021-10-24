<?php
class e3runtime{
    public $nombre;
    public function __construct($nombre){
        $this -> nombre = $nombre;
        $this -> fecha = date("H");
        $this -> tiempo = "10 °C";
    }
    public function escribeFecha(){
        if ($this -> fecha < "12"){
            return "<h2>Buenos días, $this->nombre!</h2>";
        }
        elseif ($this -> fecha < "19"){
            return "<h2>Buenas tardes, $this->nombre!</h2>";
        }
        else{
            return "<h2>Buenas noches, $this->nombre!</h2>";
        }
    }
    public function obtenerTiempo(){
        return $this -> tiempo;
    }
}

class e3escribir{
    public function __construct(){
        $this -> estilo = "<style>*{font-family:helvetica;}h1{color: #ce52ff;}ul{margin:0.5em 0.8em;}button{padding:0.25em 0.8em;font-size:14px;background: #852b99;border:0;color: white;}</style>";
    }
    
    public function estiloEscribir(){
        echo $this->estilo; 
    }
}

$txt = "PHP";
$nombre = "Alexander Vivanco Sandin";
$e3s = new e3runtime($nombre);
$e3e = new e3escribir();
$e3e->estiloEscribir();

echo "<h1>$txt EXO +</h1>";
echo "<h2>La carta de EXO</h2>";
echo $e3s -> escribeFecha();

echo '<input type="text" placeholder = "herramienta de búsqueda global"</input><button>Submit</button>';

echo "<ul>";
echo "<li>Blunt Lípido 3(Arma) [1. [línea anillo iter] 2+ ...]<ul>";
echo "<li>HTML, XML y CSS [1. línea 2. links]</li>";
echo "<li>Tarejas [1. línea 2. otra gente-informes]</li>";
echo "<li>Fecha y hora [1. línea 2. [a+b a-b a*b a/b a^b]]</li>";
echo "<li>Sequencia [1. línea 2. [a+(copy, append, insert), a-(pop, remove (first item)), a+b(extend), a-b, a⚬b(sort)]]</li>";
echo "<li>SEQ [1. [1. ax+b 2. ax^2+bx+c 3. ax^3+bx^2+cx+d] 2+ [a+b a-b a*b a/b a^b]]</li>";
echo "<li>Física [1. [1 3 5 7 9] 2+ [a+b a-b a~~b]]</li>";
echo "<li>Biología [1. [parto de cuerpo] [combustión, circulación (transpuerto), movimientos, defensa, enfermedad] 2. [reproducción]]</li>";
echo "<li>ASEQ [1. anillo[3 4 5 6] 2+ [a&cong;b a~b]]</li>";
echo "<li>Teoría de grafo [1. [línea anillo] 2+ ...]</li>";
echo "<li>Química [1. [[línea anillo] lipidos] 2+ a+b]</li>";
echo "<li>Topología [1. [línea anillo iter] 2+ ...]</li>";
echo "<li>Estructura de cónfiguración[1. [línea anillo iter] 2. Todos los configuración]</li>";
echo "<li>Obj [1. [línea anillo iter] 2+ ...]</li>";
echo "<li><b>*Arma [1. [línea anillo iter] 2+ ...]</b></li>";
echo "<li>...</li>";
echo "</li></ul>";

echo "<li>Sociedad y cultura(Negocio) [Buisness models, other...]<ul>";
echo "<li>Economía [[capitalismo comunismo economía-neoclásica corrupción ...] [...]]</li>";
echo "<li>Política [[0 1 parto todos] [Qué necesitas un país]]</li>";
echo "<li><b>*Negocio [Buisness models, other...]</b></li>";
echo "<li>Historia </li>";
echo "<li>Geografía [[Varios tipos de países] economicas politicas a+ a-]</li>";
echo "<li>Sociología [Tipos abstract]</li>";
echo "<li>Ley [sistema de ley, abstract] </li>";
echo "<li>Estudios de comunicacion </li>";
echo "<li>...</li>";
echo "</li></ul>";
echo "</ul>";

echo "Colmeia Heading<ul>";
echo "<li></li>";
echo "<li></li>";
echo "</ul>";
?>