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
        0: { name: 'farm', season: seasons.Shemu },
        1: { name: 'hunter', perHundred: 1 },
        2: { name: 'weaver', perHundred: 1.75 },
        3: { name: 'smith', perHundred: 1.875 },
        4: { name: 'miner', perHundred: 1.5 },
        5: { name: 'potter', perHundred: 1.125 },
        6: { name: 'temple', perHundred: 1.625 }
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

var goodType = {
    CREATION: 0,
    EARTH: 1,
    SKY: 2,
    WATER: 3,
    SUN: 4,
    VOID: 5,
    CHAOS: 6,
    MUD: 7,
    HOUSE: 8,
    PLANTS: 9,
    ANIMALS: 10,
    DEATH: 11,
    SEA: 12,
    LOVE: 13,
    TRICKS: 14,
    HARVEST: 15,
    REEDS: 16,
    AIR: 17,
    MOON: 18,
    UNDERWORLD: 19,
    SHEEP: 20,
    HEAVEN: 21,
    BULL: 22,
    LIFE: 23,
    SPIRIT: 24,
    ORDER: 25,
    STARTS: 26,
    DARKNESS: 27,
    EVIL: 28,
    DUSK: 29,
    FIRE: 30,
    RAIN: 31,
    WARRIOR: 32,
    GRAIN: 33,
    properties: {
        0: { name: 'creation' },
        1: { name: 'the Earth' },
        2: { name: 'the Sky' },
        3: { name: 'water' },
        4: { name: 'the Sun' },
        5: { name: 'emptiness' },
        6: { name: 'chaos' },
        7: { name: 'mud' },
        8: { name: 'the house' },
        9: { name: 'plants' },
        10: { name: 'animals' },
        11: { name: 'death' },
        12: { name: 'the sea' },
        13: { name: 'love' },
        14: { name: 'tricks' },
        15: { name: 'the harvest' },
        16: { name: 'reeds' },
        17: { name: 'the air' },
        18: { name: 'the Moon' },
        19: { name: 'the underworld' },
        20: { name: 'sheep' },
        21: { name: 'Heaven' },
        22: { name: 'bulls' },
        23: { name: 'life' },
        24: { name: 'the spirit' },
        25: { name: 'order' },
        26: { name: 'the stars' },
        27: { name: 'darkness' },
        28: { name: 'evil' },
        29: { name: 'dusk' },
        30: { name: 'fire' },
        31: { name: 'rain' },
        32: { name: 'warriors' },
        33: {name: 'grain'}
    }
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