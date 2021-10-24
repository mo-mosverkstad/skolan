CREATE TABLE TabellDEMO (
  ID tinyint(4),
  TodosLosCosas varchar(6),
  Parto1 varchar(10),
  Estado varchar(5),
  Parto2 varchar(3)
);

INSERT INTO TabellDEMO
(ID, TodosLosCosas, Parto1, Estado, Parto2)
VALUES 
(1,'Cosa 1','Articulo 1','True','-<a'),
(2,'Cosa 2','Articulo 2','False',''),
(3,'Cosa 3','Articulo 3','True',''),
(4,'Cosa 4','Articulo 4','True',''),
(5,'Cosa 5','Aritculo 5','True',''),
(6,'Cosa 6','Articulo 6','False','');

CREATE TABLE Tabell1 (
  "ID" tinyint(4),
  "Blunt (Lípido 3)" varchar(123),
  "Sociedad y cultura" varchar(75)
);

INSERT INTO Tabell1 
VALUES 
(1,'Blunt Lípido 3(Arma) [1. [línea anillo iter] 2+ ...]','Economía [[capitalismo comunismo economía-neoclásica corrupción ...] [...]]'),
(2,'HTML, XML y CSS [1. línea 2. links]','Política [[0 1 parto todos] [Qué necesitas un país]]'),
(3,'Tarejas [1. línea 2. otra gente-informes]','*Negocio [Buisness models, other...]'),
(4,'Fecha y hora [1. línea 2. [a+b a-b a*b a/b a^b]]','Historia'),
(5,'Sequencia [1. línea 2. [a+(copy, append, insert), a-(pop, remove (first item)), a+b(extend), a-b, a⚬b(sort)]]','Geografía [[Varios tipos de países] economicas politicas a+ a-]'),
(6,'SEQ [1. [1. ax+b 2. ax^2+bx+c 3. ax^3+bx^2+cx+d] 2+ [a+b a-b a*b a/b a^b]]','Sociología [Tipos abstract]'),
(7,'Física [1. [1 3 5 7 9] 2+ [a+b a-b a~~b]]','Ley [sistema de ley, abstract]'),
(8,'Biología [1. [parto de cuerpo] [combustión, circulación (transpuerto), movimientos, defensa, enfermedad] 2. [reproducción]]','Estudios de comunicacion'),
(9,'ASEQ [1. anillo[3 4 5 6] 2+ [a≅b a~b]]',''),
(10,'Teoría de grafo [1. [línea anillo] 2+ ...]',''),
(11,'Teoría de grafo [1. [línea anillo] 2+ ...]',''),
(12,'Topología [1. [línea anillo iter] 2+ ...]',''),
(13,'Estructura de cónfiguración[1. [línea anillo iter] 2. Todos los configuración]',''),
(14,'Obj [1. [línea anillo iter] 2+ ...]',''),(15,'*Arma [1. [línea anillo iter] 2+ ...]','');

SELECT * FROM TabellDEMO;
SELECT * FROM Tabell1;