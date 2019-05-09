var seasons = {
    Akhet: 0,
    Peret: 1,
    Shemu: 2,
    properties: {
        0: { name: 'Akhet' },
        1: { name: 'Peret' },
        2: { name: 'Shemu' }
    }
};

var buildingType = {
    FARM: 0,
    HUNTER: 1,
    WEAVER: 2,
    SMITH: 3,
    MINER: 4,
    POTTER: 5,
    TEMPLE: 6,
    properties: {
        0: { name: 'farm' },
        1: { name: 'Hunters', perHundred: 1 },
        2: { name: 'Weavers', perHundred: 1.75 },
        3: { name: 'Smiths', perHundred: 1.875 },
        4: { name: 'Miners', perHundred: 1.5 },
        5: { name: 'Potters', perHundred: 1.125 },
        6: { name: 'Temple', perHundred: 1.625}
    }
};

var cityType = {
    TENT: 0,
    VILLAGE: 1,
    TOWN: 2,
    CITY: 3,
    MASTABA: 4,
    PYRAMID: 5,
    properties: {
        0: { name: 'Tent', multiplier: 0.66, image: tentImage },
        1: { name: 'Village', multiplier: 0.75, image: villageImage },
        2: { name: 'Town', multiplier: 1, image: townImage },
        3: { name: 'City', multiplier: 1.25, image: cityImage },
        4: { name: 'Mastaba', multiplier: 0, image: roughStone },
        5: { name: 'Pyramid', multiplier: 1.25, image: pyramidImage }
    }
};

var menuType = {
    TRADE: 0,
    INFO: 1,
    PAUSE: 2
};

Object.size = function (obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

//var polygonEnum = {
//    MOVETO: 1,
//    LINETO: 0,
//    properties: {
//        0: { name: 'LINETO' },
//        1: { name: 'MOVETO' }
//    }
//};

var operators = {
    '+': function (a, b) { return a + b },
    '-': function (a, b) { return a - b },
    '*': function (a, b) { return a * b },
    '/': function (a, b) { return a / b },
    '%': function (a, b) { return a % b }
};