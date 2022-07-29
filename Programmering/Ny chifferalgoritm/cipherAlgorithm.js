Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};

Object.prototype.has = function (value) {
    for (var key in this) {
        if (key == value || this[key] == value) {
            return true;
        }
    }
    return false;
}

// Encoding and decoding
function mapCode(originalText, map, mapFunc) {
    var resultText = "";
    for (i of originalText) {
        var add = "";
        if (map.has(i)) {
            add = mapFunc(map, i);
        } else {
            add = i;
        }
        resultText += add;
    }
    return resultText;
}

function encode(plainText, map){
    var mapFunc = function(map, i){return map[i]};
    return mapCode(plainText, map, mapFunc);
}

function decode(encryptedText, map){
    var mapFunc = function(map, i){return map.getKey(i)};
    return mapCode(encryptedText, map, mapFunc);;
}

// Generating mapping
function generateMapping(mappingFunc, processFunc){
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var mapping = {};
    var processList = [];
    for (x = 0; x < letters.length; x++){
        var m = mappingFunc(x);
        if (typeof m == 'number') {
            processList.push(m);
        }
    }
    resultList = processFunc(processList);
    if (resultList.length >= letters.length) {
        for (x = 0; x < letters.length; x++){
            y = resultList[x];
            mapping[letters[x]] = letters[y];
        }
    }
    return mapping;
}

// Processing types
function unequalIntervalProcess(processList) {
    var sortedList = processList.slice(0).sort();
    var resultList = [];
    for (var i of processList) {
        resultList.push(sortedList.getKey(i));
    }
    return resultList;
}

function equalIntervalProcess(processList) {
    var resultList = [];
    for (var i of processList) {
        resultList.push(findAvailableValue(resultList, i % 26));
    }
    return resultList;
}

function findAvailableValue(resultList, value) {
    var totalNumber = 26;
    var i = 0;
    var resultValue = value;
    while (resultList.includes(resultValue) && i < totalNumber) {
        resultValue = (resultValue + 1) % totalNumber;
        i = i + 1;
    }
    return resultValue;
}

// Math functions
function caesarMappingFunc(x) {
    return x + 3;
}

function semiFactorisationMappingFunc(x) {
    n = (x + 1) / 10;
    return n ** (-1 * n + 1);
}

// onChange event
function onChangeSelectAlgorithmType() {
    var algorithmType = document.getElementById("algorithmType").value;
    var algorithm = "";
    var regularInterval = "true";
    switch (algorithmType) {
        case "cae":
            algorithm  = "x + 3";
            regularInterval = "true";
            break;
        case "sfc":
            algorithm  = "((x + 1) / 10) ** (-1 * ((x + 1) / 10) + 1)";
            regularInterval = "false";
            break;
        default:
            break;
    }
    document.getElementById("Algorithm").value = algorithm;
    document.getElementById("regularInterval").value = regularInterval;
}

// onClick events
function generateMappingByConfig() {
    var algorithm = document.getElementById("Algorithm").value;
    var sentence = "var func = function(x){ return " +algorithm+";};";
    try {
        eval(sentence);
    } catch(err) {
        alert("The algorithm you defined is not right, the error from Javascript shows: " + err);
        document.getElementById("Algorithm").value = "";
        return {};
    }
    
    var interval = document.getElementById("regularInterval").value;
    var processF = unequalIntervalProcess;
    if (interval == "true"){
        processF = equalIntervalProcess;
    }    
    
    return generateMapping(func, processF);
}

function onClickEncode(){
    var plainTxt = document.getElementById("plainText").value;
    var result = encode(plainTxt, generateMappingByConfig());
    document.getElementById("encryptedText").innerHTML = result;
}

function onClickDecode(){
    var encText = document.getElementById("encryptText").value;
    var result = decode(encText, generateMappingByConfig());
    document.getElementById("decryptedText").innerHTML = result;
}

/*
console.log(encode("hello world", generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess)));
console.log(decode("vowwr frmwl", generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess)));
console.log(generateMapping(semiFactorisationMappingFunc, unequalIntervalProcess));
console.log(generateMapping(caesarMappingFunc, equalIntervalProcess));
*/