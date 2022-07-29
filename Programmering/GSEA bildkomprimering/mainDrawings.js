var canvas = document.getElementById("imageProcessCanvas");
var ctx = canvas.getContext("2d");
var hiddenCanvas = document.getElementById('outputCanvas');
var hiddenCtx = hiddenCanvas.getContext('2d');
hiddenCanvas.style.display = 'none';

var fileUpload = document.getElementById('fileUpload');
var fileUploadRight = document.getElementById('fileUploadRight');

var imageOrigData = null;
var imageProcData = null;

var imageColorAmount = 0;

var canvasPosition = new CanvasPosition(ctx);
var imgOrignal = new Image();

function readImage() {
    if ( this.files && this.files[0] ) {
        var fr= new FileReader();
        fr.onload = function(e) {
            imgOrignal.src = e.target.result;
            imgOrignal.onload = function() {
                canvasPosition.setImageSize(imgOrignal.naturalWidth, imgOrignal.naturalHeight);
                ctx.drawImage(imgOrignal, 0, 0, imgOrignal.naturalWidth, imgOrignal.naturalHeight);
                imageOrigData  = loadData(0, 0, imgOrignal.naturalWidth, imgOrignal.naturalHeight);
                imageColorAmount = imageOrigData.width * imageOrigData.height;
           };
        };       
        fr.readAsDataURL( this.files[0] );
    }
}
fileUpload.onchange = readImage;


function imageProcessGeneralFunction(ipFunc, func) {
    if (imageOrigData == null) return;
    pos = canvasPosition.getImagePosition(1, 0);
    ipFunc(func, imageOrigData, pos);
    imageProcData = loadData(pos.x, pos.y, imgOrignal.naturalWidth, imgOrignal.naturalHeight);
}


function colorOrigScatter() {
    if (imageOrigData == null) return;
    colorScatter(imageOrigData, 0);
}

function colorProcScatter() {
    if (imageProcData != null)
        colorScatter(imageProcData, 1);
}

function colorScatter(data, x) {
    imageProcess(imageRed,   data, canvasPosition.getImagePosition(x, 1));
    imageProcess(imageGreen, data, canvasPosition.getImagePosition(x, 2));
    imageProcess(imageBlue,  data, canvasPosition.getImagePosition(x, 3));
}





function colorOrigAnalysis() {
    if (imageOrigData == null) return;
    var histogramArray = statisData(imageOrigData);
    showHistogram(0, histogramArray);
}

function colorProcAnalysis() {
    if (imageProcData != null) {
        var histogramArray = statisData(imageProcData);
        showHistogram(1, histogramArray);
    }
}



function generateOutputImg() {
    if (imageOrigData == null || imageProcData == null) return;
    
    var pos = canvasPosition.getImagePosition(1, 0);
    var x = pos.x;
    var y = pos.y;
    var w = imageOrigData.width;
    var h = imageOrigData.height;
    
    hiddenCtx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
    hiddenCanvas.width = w;
    hiddenCanvas.height = h;
    
    //Draw the data you want to download to the hidden canvas
    hiddenCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
    
    //Create a download URL for the data
    var hiddenData = hiddenCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var dataURL = hiddenCanvas.toDataURL();
    document.getElementById('outputImg').src = dataURL;
}


function setBestChromosome(bestChromosome, chromosome) {
    bestChromosome.chromosome = chromosome;
    bestChromosome.met = 1;
}

function increaseBestChromosome(bestChromosome) {
    bestChromosome.met += 1;
}

function shrinkText(string, length) {
    if (string.length >= length) {
        return string.substring(0, length-3) + "...";
    } else {
        return string;
    }
}

function generateBestOnGSEA(targtC) {
    var populationQuantity = parseInt(document.getElementById("inputPopulationQuantity").value);
    var chromosomeSize = parseInt(document.getElementById("inputChromosomeSize").value);
    var bestChromosome = {chromosome: {genes: [], score: 0}, met: 0};
    
    population = generatePopulation(populationQuantity, chromosomeSize);
    setScore(population, targtC);
    population = sortPopulation(population);
    setBestChromosome(bestChromosome, population[0]);

    //console.log(bestChromosome);
    
    var generationNumber = 0;
    var generationMax = parseInt(document.getElementById("inputGenerationMax").value);
    var metMax = 2;
    
    while (bestChromosome.met <= metMax && generationNumber < generationMax){
        var newGeneration = crossOver(population);
        setScore(newGeneration, targtC);
        population = population.concat(newGeneration);
        population = sortPopulation(population);
        population = population.slice(0, populationQuantity);
        
        if (population[0].score < bestChromosome.chromosome.score) {
            setBestChromosome(bestChromosome, population[0]);
        } else {
            increaseBestChromosome(bestChromosome);
        }
        appendInDiv("outputGSEA", "Generation: " + generationNumber + "; resultat: " + shrinkText(convertToAscii(population[0].genes),60) + "; ∆C: " + (population[0].score * 100 / imageColorAmount).toFixed(6) + "%");

        //console.log(bestChromosome);
        generationNumber++;
    }
    return bestChromosome;
}

function compressGSEA() {
    if (imageOrigData == null) return;
    var histogramArray = statisData(imageOrigData);
    cleanDiv("outputGSEA");
    appendInDiv("outputGSEA", "\nAtt generera RÖD med GSEA:");
    bestChromosomeR = generateBestOnGSEA(histogramArray.r);
    appendInDiv("outputGSEA", "\nAtt generera GRÖN med GSEA:");
    bestChromosomeG = generateBestOnGSEA(histogramArray.g);
    appendInDiv("outputGSEA", "\nAtt generera BLÅ med GSEA:");
    bestChromosomeB = generateBestOnGSEA(histogramArray.b);
    
    pos = canvasPosition.getImagePosition(1, 0);
    imageProcess3(compressOnReferData, imageOrigData, pos, {r:bestChromosomeR.chromosome.genes, g:bestChromosomeG.chromosome.genes, b:bestChromosomeB.chromosome.genes});
    imageProcData = loadData(pos.x, pos.y, imgOrignal.naturalWidth, imgOrignal.naturalHeight);
    
}