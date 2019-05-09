var timeInt = 0;
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

            if (dragLocation.x < -canvas.clientWidth)
                dragLocation.x = -canvas.clientWidth;
            else if (dragLocation.x > canvas.width)
                dragLocation.x = canvas.clientWidth;

            if (dragLocation.y < -canvas.clientHeight)
                dragLocation.y = -canvas.clientHeight;
            else if (dragLocation.y > canvas.clientHeight)
                dragLocation.y = canvas.clientHeight;
        }
    }

    function down(e) {
        mouseDown = true;

        downLocation = Object.assign({}, mouseLocation);
    }

    function up(e) {
        mouseDown = false;
        if (moveScreen) /*If menu isn't open*/ {
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
        } else /*If the menu is open*/ {
            newpoint = mouseLocation.findDistance(downLocation);

            if (newpoint.x < 1 && newpoint.y < 1) {
                if (!checkBetween(mouseLocation, new point(cityMenu.location.x, cityMenu.location.y),
                    new point(cityMenu.location.x + cityMenu.size.x, cityMenu.location.y + cityMenu.size.y))) {

                    selectedCity.selectedVessel = 0;
                    selectedCity.selectedProduct[selectedCity.selectedVessel] = 0;
                    selectedCity.selectedCity[selectedCity.selectedVessel] = 0;

                    cityMenu.tabIndex = menuType.TRADE;

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
                    if (checkBetween(mouseLocation, cityMenu.selections[1][i].location,
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
                            break;
                        }
                    }

                    if (player.money >= 100) {
                        gtag('event', 'test', {
                            'event_category': 'Iteration2',
                            'event_label': `Gold`,
                            'value': `${player.name}${player.money}`
                        });
                    }
                }/*selecting the trade button*/ else if (checkBetween(mouseLocation, cityMenu.tabPoints[0],
                    new point(cityMenu.tabPoints[0].x + (cityMenu.size.x / 10), cityMenu.tabPoints[0].y + (cityMenu.size.y / 20)))) {
                    cityMenu.tabIndex = menuType.TRADE;
                }/*selecting trade menu tab*/ else if (checkBetween(mouseLocation, cityMenu.tabPoints[1],
                    new point(cityMenu.tabPoints[1].x + (cityMenu.size.x / 10), cityMenu.tabPoints[1].y + (cityMenu.size.y / 20)))) {
                    cityMenu.tabIndex = menuType.INFO;
                }/*selecting info tab*/
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
    if (canvas.width !== window.innerWidth - 25 || canvas.height !== window.innerHeight - 30) {
        canvas.width = window.innerWidth - 25;
        canvas.height = window.innerHeight - 30;

        cityMenu.location = new point(canvas.width / 10, canvas.height / 10);
        cityMenu.location = new point(canvas.width / 10, canvas.height / 10);
        cityMenu.size = new point(canvas.width - (2 * (canvas.width / 10)), canvas.height - (2 * (canvas.height / 10)));

        cityMenu.columnX = [cityMenu.location.x + 2 * (cityMenu.size.x / 10),
        cityMenu.location.x + 4 * (cityMenu.size.x / 10),
        cityMenu.location.x + 6 * (cityMenu.size.x / 10)];

        var arr = [[], [], []];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 10; j++) {
                arr[i].push(new label(new point(cityMenu.columnX[i], cityMenu.location.y + cityMenu.size.y / 5 + (j * 25) + 10)));
            }
        }

        cityMenu.selections = arr;

        for (var i = 0; i < eventList.length; i++) {
            eventList[i].text.location = new point(canvas.width - 30 - eventList[i].text.getWidth(), 25);
        }

    }

    timerRender();

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(background, -(canvas.width - dragLocation.x),
        -(canvas.height - dragLocation.y),
        canvas.width * 3, canvas.height * 3);

    for (var city of cityList) {
        city.update(context, dragLocation);

        for (var caravan of city.playerCaravans) {
            if (caravan.active)
                caravan.draw(context, dragLocation);
        }
    }

    cityMenu.update(context, selectedCity);

    imageSize = (canvas.width / 10 < canvas.height / 5) ? canvas.width / 10 : canvas.height / 5;

    var text = new label(new point(10, 25), player.name + '\'s gold: ' + player.money, 'rgb(0,0,0)', 'rgb(255,255,240,.3)');

    text.draw(context);

    var j = 1;
    for (var event of eventList) {
        if (event.active) {
            event.text.location.y = j++ * 30;
            event.draw(context);
        }
    }
    requestAnimationFrame(render);
}

function timerRender() {
    timeInt++;

    if (RNG(1000) === 1) {
        eventList[RNG(eventList.length - 1)].activate();
    }

    if (timeInt % 100 === 0)
        seasonChange();

    for (var type in buildingType) {
        try {
            if (timeInt % buildingType.properties[type].perHundred === 0)
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