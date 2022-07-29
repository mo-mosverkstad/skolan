function imageRed(imageData) {
    return {r:imageData.r, g:0, b:0};
}

function imageGreen(imageData) {
    return {r:0, g:imageData.g, b:0};
}

function imageBlue(imageData) {
    return {r:0, g:0, b:imageData.b};
}


function inRange(value, array) {
    var point = 0;
    while (point < array.length - 1 && !(array[point] <= value && value < array[point + 1])) {
        point += 1;
    }
    return array[point];
}

function compressOnReferData(imageData, referData) {
    return {r:inRange(imageData.r, referData.r), g:inRange(imageData.g, referData.g), b:inRange(imageData.b, referData.b)}
}

function imageCompressOnReferData(imageData, referData) {
    return {r:compressTo8(imageData.r), g:compressTo8(imageData.g), b:compressTo8(imageData.b)};
}