function loadData(x, y, w, h) {
    return {width : w,
            height: h,
            data  : getImageData({x:x, y:y, width:w, height:h})};
}

function getImageData(pickArea) {
    var tempArray = [];
    for (j=0; j<pickArea.height; j++) {
        var rowArray = [];
        imageData = chunkArray(getPoint(pickArea.x, pickArea.y + j, pickArea.width, 1), 4);
        for (i=0; i<imageData.length; i++) {
            rowArray.push(convertArrayToDict(imageData[i]));
        }
        tempArray.push(rowArray);
    }
    return tempArray;
}

function imageProcess(imageProcessFunction, imageData, startPoint) {
    for (j=0; j<imageData.height; j++) {
        for (i=0; i<imageData.width; i++) {
            color = imageProcessFunction(imageData.data[j][i]);
            putPoint(startPoint.x + i, startPoint.y + j, [color.r, color.g, color.b]);
        }
    }
}

function imageProcess2(imageProcessFunction2, imageData, startPoint) {
    for (j=0; j<imageData.height-1; j++) {
        for (i=0; i<imageData.width-1; i++) {
            color = imageProcessFunction2(imageData.data[j][i], imageData.data[j+1][i+1]);
            putPoint(startPoint.x + i, startPoint.y + j, [color.r, color.g, color.b]);
        }
    }
}

function imageProcess3(imageProcessFunction, imageData, startPoint, referData) {
    for (j=0; j<imageData.height; j++) {
        for (i=0; i<imageData.width; i++) {
            color = imageProcessFunction(imageData.data[j][i], referData);
            putPoint(startPoint.x + i, startPoint.y + j, [color.r, color.g, color.b]);
        }
    }
}

function imageProcessArray(imageProcessFunctionArray, imageData, startPoint) {
    for (j=1; j<imageData.height-1; j++) {
        for (i=1; i<imageData.width-1; i++) {
            color = imageProcessFunctionArray([imageData.data[j-1][i-1],
                                               imageData.data[j-1][i  ],
                                               imageData.data[j-1][i+1],
                                               imageData.data[j  ][i-1],
                                               imageData.data[j  ][i  ],
                                               imageData.data[j  ][i+1],
                                               imageData.data[j+1][i-1],
                                               imageData.data[j+1][i  ],
                                               imageData.data[j+1][i+1]]);
            putPoint(startPoint.x + i, startPoint.y + j, [color.r, color.g, color.b]);
        }
    }
}


function convertArrayToDict(imageDataArray) {
    return {r:imageDataArray[0], g:imageDataArray[1], b:imageDataArray[2]};
}

function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}

function getPoint(x, y, w, h) {
    return ctx.getImageData(x,y,w,h).data;
}

function putPoint(x, y, imageData){
    var r = imageData[0];
    var g = imageData[1];
    var b = imageData[2];
    fillArea(x, y, 1, 1, r, g, b);
}

function fillArea(x, y, w, h, r, g, b) {
    ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    ctx.fillRect(x,y,w,h);
}

function drawHorizonLine(x, y, w, r, g, b) {
    drawLine(x, y, x+w, y, r, g, b);
}

function drawLine(x1, y1, x2, y2, r, g, b) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    ctx.stroke(); 
}