var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 30;
var context = canvas.getContext('2d');

var player = {
    name: prompt('What is your name?'),
    money: 0
};

var selectedSeason = seasons.Akhet; //the currently selected season
var selectedCity;

var dragVelocity = 0.4; //this is the velocity multiplier which affects the dragging functionality
var mouseLocation = new point(), downLocation = new point(), //constant location of the mouse & the location of where you pressed down on the mouse
    visualDifference = new point(0, 0), dragLocation = new point(0, 0), //the represented location of the images && the location that you placing objects after moving
    mouseDown = false;

var tradeTab = new tab('Trade', menuType.TRADE);
var infoTab = new tab('Info', menuType.INFO);

var cityMenu = new menu(new point(canvas.width / 10, canvas.height / 10),
    new point(canvas.width - (2 * (canvas.width / 10)), canvas.height - (2 * (canvas.height / 10))),
    'rgb(0, 0, 0, 0.75)', 'rgb(139,69,19,0.5)', 'rgb(160,82,45)',
    [tradeTab, infoTab]
);

var imageSize = (canvas.clientWidth / 10 < canvas.clientHeight / 5) ? canvas.clientWidth / 10 : canvas.clientHeight / 5;

var moveScreen = true;

var grain = new tradeGoods('grain', 10, undefined, [goodType.GRAIN, goodType.HARVEST, goodType.PLANTS]);
var reed = new tradeGoods('reed', 10, undefined, [goodType.HARVEST, goodType.REEDS, goodType.PLANTS]);
var cow = new tradeGoods('cow', 15, undefined, [goodType.ANIMALS]);
var sheep = new tradeGoods('cow', 15, undefined, [goodType.SHEEP]);
var raScripture = new tradeGoods('Ra scripture', 30, undefined, [goodType.SCRIPTURE]);
var shuScripture = new tradeGoods('Shu scripture', 30, undefined, [goodType.SCRIPTURE]);
var tefnutScripture = new tradeGoods('Tefnut scripture', 30, undefined, [goodType.SCRIPTURE]);
var gebScripture = new tradeGoods('Geb scripture', 30, undefined, [goodType.SCRIPTURE]);
var nutScripture = new tradeGoods('Nut scripture', 30, undefined, [goodType.SCRIPTURE]);
var osirisScripture = new tradeGoods('Osiris scripture', 30, undefined, [goodType.SCRIPTURE]);
var isisScripture = new tradeGoods('Isis scripture', 30, undefined, [goodType.SCRIPTURE]);
var setScripture = new tradeGoods('Set scripture', 30, undefined, [goodType.SCRIPTURE]);
var nephtysScripture = new tradeGoods('Nephtys scripture', 30, undefined, [goodType.SCRIPTURE]);
//var horusScripture = new tradeGoods('Horus scripture', 30, undefined, [goodType.SCRIPTURE]);
var kiScripture = new tradeGoods('Ki scripture', 30, undefined, [goodType.SCRIPTURE]);
var anScripture = new tradeGoods('An scripture', 30, undefined, [goodType.SCRIPTURE]);
var nammuScripture = new tradeGoods('Nammu scripture', 30, undefined, [goodType.SCRIPTURE]);
var ninlilScripture = new tradeGoods('Ninlil scripture', 30, undefined, [goodType.SCRIPTURE]);
var enlilScripture = new tradeGoods('Enlil scripture', 30, undefined, [goodType.SCRIPTURE]);
var sirturScripture = new tradeGoods('Situr scripture', 30, undefined, [goodType.SCRIPTURE]);
var enkiScripture = new tradeGoods('Enki scripture', 30, undefined, [goodType.SCRIPTURE]);
var ningikugaScripture = new tradeGoods('Ningikuga scripture', 30, undefined, [goodType.SCRIPTURE]);
var nannaScripture = new tradeGoods('Nanna scripture', 30, undefined, [goodType.SCRIPTURE]);
var ningalScripture = new tradeGoods('Ningal scripture', 30, undefined, [goodType.SCRIPTURE]);
var utuScripture = new deity('Utu scripture', [goodType.SCRIPTURE]);
var inannaScripture = new deity('Inanna scripture', [goodType.SCRIPTURE]);
var ereshkigalScripture = new deity('Ereshkigal scripture', [goodType.SCRIPTURE]);
var gugalannaScripture = new deity('Gugalanna scripture', [goodType.SCRIPTURE]);

var ki = new deity('Ki', [goodType.EARTH]);
var an = new deity('An', [goodType.SKY]);
var nammu = new deity('Nammu', [goodType.WATER, goodType.CREATION]);
var ninlil = new deity('Ninlil', [goodType.AIR]);
var enlil = new deity('Enlil', [goodType.AIR]);
var sirtur = new deity('Sirtur', [goodType.SHEEP]);
var enki = new deity('Enki', [goodType.TRICKS]);
var ningikuga = new deity('Ningikuga', [goodType.REEDS]);
var nanna = new deity('Nanna', [goodType.MOON]);
var ningal = new deity('Ningal', [goodType.MOON]);
var utu = new deity('Utu', [goodType.SUN]);
var inanna = new deity('Inanna', [goodType.HEAVEN, goodType.EARTH]);
var ereshkigal = new deity('Ereshkigal', [goodType.UNDERWORLD]);
var gugalanna = new deity('Gugalanna', [goodType.BULL]);

var ra = new deity('Ra', [goodType.CREATION]);
var shu = new deity('Shu', [goodType.LIFE, goodType.SPIRIT]);
var tefnut = new deity('Tefnut', [goodType.ORDER]);
var geb = new deity('Geb', [goodType.EARTH]);
var nut = new deity('Nut', [goodType.SKY, goodType.STARS]);
var osiris = new deity('Osiris', [goodType.GRAIN, goodType.UNDERWORLD]);
var isis = new deity('Isis', [goodType.EARTH, goodType.MOON]);
var set = new deity('Set', [goodType.DARKNESS, goodType.EVIL]);
var nephthys = new deity('Nephtys', [goodType.DEATH, goodType.DUSK]);

var grainFarm = new farm(grain);
var reedFarm = new farm(reed);
var cowFarm = new farm(cow);
var sheepFarm = new farm(cow);
var raTemple = new temple(raScripture, ra);
var shuTemple = new temple(shuScripture, shu);
var tefnutTemple = new temple(tefnutScripture, tefnut);
var gebTemple = new temple(gebScripture, geb);
var nutTemple = new temple(nutScripture, nut);
var osirisTemple = new temple(osirisScripture, osiris);
var isisTemple = new temple(isisScripture, isis);
var setTemple = new temple(setScripture, set);
var nephtysTemple = new temple(nephtysScripture, nephthys);
//var horusTemple = new temple(horusScripture, horus);
var kiTemple = new temple(kiScripture, ki);
var anTemple = new temple(anScripture, an);
var nammuTemple = new temple(nammuScripture, nammu);
var ninlilTemple = new temple(ninlilScripture, ninlil);
var enlilTemple = new temple(enlilScripture, enlil);
var sirturTemple = new temple(sirturScripture, sirtur);
var enkiTemple = new temple(enkiScripture, enki);
var ningikugaTemple = new temple(ningikugaScripture, ningikuga);
var nannaTemple = new temple(nannaScripture, nanna);
var ningalTemple = new temple(ningalScripture, ningalScripture);
var utuTemple = new temple(utuScripture, utu);
var inannaTemple = new temple(inannaScripture, inanna);
var ereshkigalTemple = new temple(ereshkigalScripture, ereshkigal);
var gugalannaTemple = new temple(gugalannaScripture, gugalanna);

var egyptianReligion = new religion('Egyptian Pantheon', [
    ra,
    shu,
    tefnut,
    geb,
    nut,
    osiris,
    isis,
    set,
    nephthys
    //horus
]);
var sumerianReligion = new religion('Sumerian Pantheon', [
    ki,
    an,
    nammu,
    ninlil,
    enlil,
    sirtur,
    enki,
    ningikuga,
    nanna,
    ningal,
    utu,
    inanna,
    ereshkigal,
    gugalanna
]);

var cityList = [
    new city(new point(-700, 100), 'Heliopolis', cityType.TOWN, [grainFarm, raTemple, shuTemple], egyptianReligion, [ra, shu]),
    new city(new point(100, -750), 'Leontopolis', cityType.CITY, [grainFarm, shuTemple], egyptianReligion, [shu]),
    new city(new point(-750, 900), 'Busiris', cityType.VILLAGE, [grainFarm, cowFarm, osirisTemple], egyptianReligion, [osiris]),
    new city(new point(-900, 550), 'Memphis', cityType.CITY, [grainFarm], egyptianReligion),
    new city(new point(350, 750), 'Behbeit el-Hagar', cityType.VILLAGE, [grainFarm, cowFarm, isisTemple], egyptianReligion, [isis]),
    new city(new point(-250, 150), 'Philae', cityType.VILLAGE, [grainFarm, cowFarm, isisTemple], egyptianReligion, [isis]),
    new city(new point(1250, -500), 'Naqada', cityType.TOWN, [grainFarm, cowFarm, setTemple], egyptianReligion, [set]),
    new city(new point(950, 50), 'Diospos Parva', cityType.VILLAGE, [grainFarm, cowFarm, nephtysTemple], egyptianReligion, [nephthys]),
    new city(new point(1000, -750), 'Nippur', cityType.TOWN, [sheepFarm, reedFarm, enlilTemple], sumerianReligion, [enlil]),
    new city(new point(300, -250), 'Draco', cityType.TOWN, [sheepFarm, reedFarm, anTemple], sumerianReligion, [an]),
    new city(new point(400, -400), 'Eridu', cityType.TOWN, [sheepFarm, reedFarm, enkiTemple], sumerianReligion, [enki])
];

var eventList = [
    new event('Heliopolis grain price has risen', grain, '+10', cityList[0]),
    new event('Enlil (Sumerian deity) has become increasingly popular', enlilScripture, '+25', cityList[8], 250),
    new event('Ra (Egyptian deity) has become increasingly popular', raScripture, '+25', cityList[8], 250),
    new event('Shu (Egyptian deity) has become increasingly popular', shuScripture, '+25', cityList[8], 250),
    new event('Tefnut (Egyptian deity) has become increasingly popular', tefnutScripture, '+25', cityList[8], 250),
    new event('Geb (Egyptian deity) has become increasingly popular', gebScripture, '+25', cityList[8], 250),
    new event('Nut (Egyptian deity) has become increasingly popular', nutScripture, '+25', cityList[8], 250),
    new event('Osiris (Egyptian deity) has become increasingly popular', osirisScripture, '+25', cityList[8], 250),
    new event('Isis (Egyptian deity) has become increasingly popular', isisScripture, '+25', cityList[8], 250)
];

eventList[0].activate();