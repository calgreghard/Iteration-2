var canvas = document.getElementById('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
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

var ra = new deity('Ra', new tradeGoods('Sun disk', 100, sunDisk));

var egyptianReligion = new religion('Egyptian Pantheon', [
    ra
    //new deity('Shu', 'Ostrich feather'),
    //new deity('Tefnut', ['Moisture', 'Moist Air', 'Dew', 'Rain'], 'Lioness'),
    //new deity('Nut', ['Sky', 'Stars', 'Cows']),
    //new deity('Geb', ['Geese', 'Snakes', 'Bulls', 'Barley']),
    //new deity('Isis', 'Tyet'),
    //new deity('Nephtys', ['House', 'basket'),
    //new deity('Set', ['Was-sceptre', 'Set animal']),
    //new deity('Osiris', ['Dead', 'Rebirth'], ['Crook and flail', 'Atef crown', 'Ostrich feathers', 'Fish', 'Gauze', 'Djed']),
    //new deity('Anubis', 'Protector', ['Fetish', 'Flail']),
    //new deity('Horus', 'Patron', 'Eye of Horus')
]);

var flax = new tradeGoods('Flax', 3, sunDisk);
var copper = new tradeGoods('Copper', 1, sunDisk);
var antelopeSkin = new tradeGoods('Antelope skin', 1, sunDisk);
var scripture = new tradeGoods('Scripture', 2, sunDisk);

var goodsList = [flax, copper, antelopeSkin, scripture];

var cityList = [
    new city(new point(200, 100), 'Heliopolis', cityType.TOWN, [new buildings(buildingType.TEMPLE, scripture)], egyptianReligion, ra),
    new city(new point(0, 50), 'Memphis', cityType.CITY, [new buildings(buildingType.FARM, flax)], egyptianReligion),
    new city(new point(550, 300), 'Saqqara', cityType.VILLAGE, [new buildings(buildingType.MINER, copper)])
];

var eventList = [
    new event('change herliopolis price of scripture', scripture, '+10', cityList[0])
];

eventList[0].activate();