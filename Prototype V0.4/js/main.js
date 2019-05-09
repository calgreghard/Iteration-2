var timeInt = 0;
console.log('frame: ' + timeInt + ' season: ' + seasons.properties[selectedSeason].name);
createListeners();
render();


function createListeners() {
    document.addEventListener('mousemove', function (e) {
        mouseLocation.x = e.clientX, mouseLocation.y = e.clientY;
        if (moveScreen)
            move();
    });
    document.addEventListener('touchmove', function (e) {
        mouseLocation.x = e.touches[0].clientX, mouseLocation.y = e.touches[0].clientY;
        if (moveScreen)
            move();
    });
    document.addEventListener('mousedown', down);
    document.addEventListener('touchstart', down);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);

    function move() {
        if (mouseDown) {
            if (visualDifference.x !== 0)
                dragLocation.x = visualDifference.x + mouseLocation.x - downLocation.x;
                else
                dragLocation.x = mouseLocation.x - downLocation.x;

            if (visualDifference.y !== 0)
                dragLocation.y = visualDifference.y + mouseLocation.y - downLocation.y;
            else
                dragLocation.y = + mouseLocation.y - downLocation.y;
        }
    }

    function down(e) {
        mouseDown = true;

        downLocation = Object.assign({}, mouseLocation);
    }

    function up(e) {
        mouseDown = false;
        if (moveScreen) {
            newpoint = mouseLocation.findDistance(downLocation);

            if (newpoint.x < 1 && newpoint.y < 1) {
                for (var i = 0; i < cityList.length; i++) {

                    selectedCity = cityList[i];

                    if (checkBetween(mouseLocation, new point(cityList[i].location.x + dragLocation.x, cityList[i].location.y + dragLocation.y),
                        new point(cityList[i].location.x + dragLocation.x + imageSize, cityList[i].location.y + dragLocation.y + imageSize))) {

                        cityMenu.visible = true;
                        moveScreen = false;
                        break;
                    }
                }
            }

            visualDifference = Object.assign({}, dragLocation);
        } else {
            newpoint = mouseLocation.findDistance(downLocation);

            if (newpoint.x < 1 && newpoint.y < 1) {
                if (!checkBetween(mouseLocation, new point(cityMenu.location.x, cityMenu.location.y),
                    new point(cityMenu.location.x + cityMenu.size.x, cityMenu.location.y + cityMenu.size.y))) {

                    cityMenu.visible = false;
                    moveScreen = true;
                }//if you are selecting outside of the screen
                for (var i = 0; i < cityMenu.countActiveBoxes(0); i++) {
                    if (checkBetween(mouseLocation, cityMenu.selections[0][i].location,
                        new point(cityMenu.selections[0][i].location.x + cityMenu.selections[0][i].size.x.width, cityMenu.selections[0][i].location.y + cityMenu.selections[0][i].size.y))) {
                        selectedCity.selectedVessel = i;
                    }
                }//selecting caravans
                for (var i = 0; i < cityMenu.countActiveBoxes(1); i++) {
                    if (checkBetween(mouseLocation, cityMenu.selections[1][i],
                        new point(cityMenu.selections[1][i].location.x + cityMenu.selections[1][i].size.x.width, cityMenu.selections[1][i].location.y + cityMenu.selections[1][i].size.y))) {
                        selectedCity.selectedProduct[selectedCity.selectedVessel] = i;
                    }
                }//selecting goods
                for (var i = 0; i < cityMenu.countActiveBoxes(2); i++) {
                    if (checkBetween(mouseLocation, cityMenu.selections[2][i].location,
                        new point(cityMenu.selections[2][i].location.x + cityMenu.selections[2][i].size.x.width, cityMenu.selections[2][i].location.y + cityMenu.selections[2][i].size.y))) {
                        selectedCity.selectedCity[selectedCity.selectedVessel] = i;
                    }
                }//if you are selection a city
                if (checkBetween(mouseLocation, cityMenu.tradeButton.location,
                    new point(cityMenu.tradeButton.location.x + cityMenu.tradeButton.size.x.width, cityMenu.tradeButton.location.y + cityMenu.tradeButton.size.y))) {
                    for (var i = 0; i < cityList.length; i++) {
                        if (cityMenu.selections[2][selectedCity.selectedCity[selectedCity.selectedVessel]].content === cityList[i].name) {
                            selectedCity.playerCaravans[selectedCity.selectedVessel].newRoute(cityList[i]);

                            //cityMenu.visible = false;
                            //moveScreen = true;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function seasonChange() {
    if (selectedSeason === 2)
        selectedSeason = 0;
    else
        selectedSeason++;

    for (var i = 0; i < cityList.length; i++) {
        for (var j = 0; j < cityList[i].properties.length; j++) {
            if (cityList[i].properties[j].seasonal === selectedSeason)
                cityList[i].properties[j].harvest(cityList[i]);
        }
    }
    //console.log('frame: ' + timeInt + ' season: ' + seasons.properties[selectedSeason].name);
}

function perHundredHarvest(type) {
    for (var i = 0; i < cityList.length; i++) {
        for (var j = 0; j < cityList[i].properties.length; j++) {
            if (cityList[i].properties[j].type === type)
                cityList[i].properties[i].harvest(cityList[i]);
        }
    }
}

function render() {
    timerRender();

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(background, -(canvas.width - dragLocation.x),
        -(canvas.height - dragLocation.y),
        canvas.width * 3, canvas.height * 3);

    for (var i = 0; i < cityList.length; i++) {
        for (var j = 0; j < cityList[i].playerCaravans.length; j++) {
            if (cityList[i].playerCaravans[j].active) {
                cityList[i].playerCaravans[j].draw(context, dragLocation);
            }
        }
    }

    for (var i = 0; i < cityList.length; i++) {
        cityList[i].update(context, dragLocation);
    }

    cityMenu.update(context, selectedCity);

    imageSize = (canvas.clientWidth / 10 < canvas.clientHeight / 5) ? canvas.clientWidth / 10 : canvas.clientHeight / 5;

    var text = new label(new point(10, 25), player.name + '\'s gold: ' + player.money, 'rgb(0,0,0)', 'rgb(255,255,240,.3)');

    text.draw(context);

    var j = 1;
    for (var i = 0; i < eventList.length; i++) {
        if (eventList[i].active) {
            eventList[i].text.location.y = j++ * 30;
            eventList[i].draw(context);
        }
    }

    requestAnimationFrame(render);
}

function timerRender() {
    timeInt++;
    if (timeInt % 100 === 0)
        seasonChange();
    for (var i = 1; i < Object.size(buildingType); i++) {
        try {
            if (timeInt % buildingType.properties[i].perHundred === 0)
                perHundredHarvest(i);
        } catch{
            break;
        }
    }
}

function checkBetween(check, point1, point2) {
    if (point1.x < point2.x && point1.y < point2.y) {
        if (check.x > point1.x && check.x < point2.x && check.y > point1.y && check.y < point2.y)
            return true;
        else
            return false;
    } else {
        if (check.x > point2.x && check.x < point1.x && check.y > point2.y && check.y < point1.y)
            return true;
        else
            return false;
    }
}

function RNG(max, min) {
    let x;
    if (!min) {
        x = Math.floor(Math.random() * max);
    } else {
        x = Math.floor(Math.random() * max + min);
    }

    return x;
}

function switchVar(a, b) {
    var c = a;
    a = b;
    b = c;

    return a, b;
}