function comparator(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomAscii() {
    return getRandomInt(0, 256);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function generateChromosome(chromosomeSize) {
    var chromosome = [];
    var randomAscii = 0;
    chromosome.push(randomAscii);
    
    for (j = 1; j < chromosomeSize; j++){
        randomAscii = getRandomAscii();
        while (chromosome.includes(randomAscii)) {
            randomAscii = getRandomAscii();
        }
        chromosome.push(randomAscii);
    }
    return chromosome.sort(function(a, b){
        return a - b;
    });
}

function generatePopulation(quantity, chromosomeSize){
    var p = [];
    for (i = 0; i < quantity; i++){
        p.push({genes: generateChromosome(chromosomeSize), score: 0});
    }
    return p;
}

// basic functions
function sigma(a){
    var result = 0;
    for (var i = 0; i < a.length; i++){
        result = result + a[i];
    }
    return result;
}

function calculateScore(chromosome, targetC){
    var score   = 0;
    var chPoint = 0;
    var tPoint  = 0;
    
    while (tPoint < targetC.length) {
        if ((chPoint == chromosome.length - 1) || (tPoint >= chromosome[chPoint] && tPoint < chromosome[chPoint+1])) {
            //score = score + Math.abs(targetC[tPoint] - targetC[chromosome[chPoint]]);
            score = score + Math.abs(targetC[tPoint] - targetC[chromosome[chPoint]]) * Math.abs(chromosome[chPoint] - tPoint);
        } else {
            if (chPoint + 1 < chromosome.length) {
                chPoint += 1;
            }
        }
        tPoint += 1;
    }
    return score;
}

function sortPopulation(p){
    return p.sort(comparator);
}


function setScore(p, targetC){
    for (var i = 0; i < p.length; i++){
        p[i].score = calculateScore(p[i].genes, targetC);
    }
}

function makeSegments (c, slices) {
    var cSegs = [];
    for (var i = 0; i < slices.length - 1; i++) {
        cSegs.push(c.slice(slices[i], slices[i+1]));
    }
    //console.log(cSegs);
    return cSegs;
}

function reproduce(c1, c2){
    var geneLength = c1.length;
    var slices = [0, getRandomInt(0, geneLength+1), getRandomInt(0, geneLength+1), getRandomInt(0, geneLength+1), geneLength];
    slices.sort();
    //console.log("slices: ", slices);
    var genSegs1 = makeSegments(c1, slices);
    var genSegs2 = makeSegments(c2, slices);

    var c3 = genSegs1[0].concat(genSegs2[1], genSegs1[2], genSegs2[3]);
    var c4 = genSegs2[0].concat(genSegs1[1], genSegs2[2], genSegs1[3]);
    //console.log("c3: ", c3);
    //console.log("c4: ", c4);
    
    return [c3.sort(function(a, b){return a - b;}), c4.sort(function(a, b){return a - b;})];
}

function crossOver(p){
    var newP = [];
    //console.log("Population length: ", p.length / 2);
    for (var i = 0; i < (p.length / 2); i++){
        var n = 2*i;
        var m = 2*i+1;
        // console.log("results", p[n].genes, p[m].genes);
        var [new1, new2] = reproduce(p[n].genes, p[m].genes)
        newP.push({genes: new1, score: 0});
        newP.push({genes: new2, score: 0});
    }
    return newP;
}

function convertToAscii(genes) {
    var strAscii = "";
    for (var g of genes) {
        strAscii += g.toString() + ";";
    }
    return strAscii;
}

function appendInDiv(divId, print) {
    var div = document.getElementById(divId);
    div.style.display = "block";
    div.innerText += "\n" + print;

}

function cleanDiv(divId) {
    var div = document.getElementById(divId);
    div.style.display = "block";
    div.innerText = "";

}

