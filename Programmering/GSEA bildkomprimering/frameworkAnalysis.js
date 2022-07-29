var maxColorValue = 256;

function statisRawData(imageData) {
    var tempRedArray   = [];
    var tempGreenArray = [];
    var tempBlueArray  = [];
    for (i=0; i<maxColorValue; i++) {
        tempRedArray.push(0);
        tempGreenArray.push(0);
        tempBlueArray.push(0);
    }
    for (j=0; j<imageData.height; j++) {
        for (i=0; i<imageData.width; i++) {
            tempRedArray[imageData.data[j][i].r] += 1;
            tempGreenArray[imageData.data[j][i].g] += 1;
            tempBlueArray[imageData.data[j][i].b] += 1;
        }
    }
    return {r:tempRedArray,
            g:tempGreenArray,
            b:tempBlueArray};
}

function statisData(imageData) {
    var tempArray = statisRawData(imageData);
    return {r:calPercent(tempArray.r),
            g:calPercent(tempArray.g),
            b:calPercent(tempArray.b)};
}

function calPercent(tempArray) {
    var total = Math.max.apply(null, tempArray);
    for (i=0; i<maxColorValue; i++) {
        tempArray[i] = Math.round((tempArray[i] / total) * 100);
    }
    return tempArray;
}


function showHistogram(x, histogramArray) {
    for (c=0; c<3; c++) {
        pos = canvasPosition.getHistogramPosition(x, c);
        fillArea(pos.x, pos.y, canvasPosition.gethistogramSize().w, canvasPosition.gethistogramSize().h, 255, 255, 255);
        for (i=0; i<maxColorValue; i++) {
            switch (c) {
                case 0:
                    drawHorizonLine(pos.x, pos.y+i, histogramArray.r[i], i, 0, 0);
                    break;
                case 1:
                    drawHorizonLine(pos.x, pos.y+i, histogramArray.g[i], 0, i, 0);
                    break;
                case 2:
                    drawHorizonLine(pos.x, pos.y+i, histogramArray.b[i], 0, 0, i);
                    break;
            }
        }
    }
}