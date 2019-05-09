class menu /*This is a class to hold the menu*/ {
    constructor(location, size, bgcolour, midcolour, fgcolour, tabs) {
        this.location = location;
        this.size = size; //When creating the object the location of the object and size are passed in

        this.bgColour = bgcolour;
        this.unselectedTabColour = midcolour;
        this.selectedTabColour = fgcolour; //I set all possible colours when creating th object aswell

        this.columnX = [this.location.x + 2 * (this.size.x / 10),
        this.location.x + 4 * (this.size.x / 10),
        this.location.x + 6 * (this.size.x / 10)]; //here I set column x's for when I populate my menus

        this.selections = [[], [], []];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 10; j++) {
                this.selections[i].push(new label(new point(this.columnX[i], this.location.y + this.size.y / 5 + (j * 25) + 10)));
            }
        }

        this.tradeButton = new label(new point(this.columnX[2], this.location.y + this.size.y * 0.9), 'Send trade vessel', 'rgb(0,0,0)', 'rgb(255,255,240)');
        this.tradeInfo = new label(new point(this.columnX[2], this.location.y + this.size.y * 0.9), 'something');

        this.itemValue;
        this.perString;

        this.tabs = tabs;
        this.tabPoints = [new point(this.location.x + this.size.x / 10, this.location.y + this.size.y / 10),
        new point(this.location.x + 2 * (this.size.x / 10), this.location.y + this.size.y / 10)];
        this.tabIndex = 0;
        this.tabBox = {
            box1: [this.tabPoints[0], new point()],
            box2: [this.tabPoints[1], new point()]
        };

        this.visible = false;
    }

    update(context, city) {
        if (this.visible) {
            context.fillStyle = this.bgColour;
            context.rect(this.location.x, this.location.y, this.size.x, this.size.y); //this is building the background of the menu
            context.fill();

            context.fillStyle = 'rgb(0,0,0)';
            context.font = '15px Arial';
            context.fillText(city.name, this.location.x, this.location.y);

            let shape;
            let savedPoint = new point();

            for (var i = 0; i < this.tabs.length; i++) {
                switch (i) {
                    case 0:
                        if (i === this.tabIndex) {
                            shape = new simplePolygon([this.tabPoints[i]], this.selectedTabColour);

                            savedPoint.x = this.tabPoints[i].x, savedPoint.y = this.tabPoints[i].y;

                            savedPoint.x += this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y += this.size.y / 20;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move down

                            if (i === 0) {
                                this.tabBox.box1[1].x = savedPoint.x;
                                this.tabBox.box1[1].y = savedPoint.y;
                            }
                            else {
                                this.tabBox.box2[1].x = savedPoint.x;
                                this.tabBox.box2[1].y = savedPoint.y;
                            }

                            savedPoint.x = this.location.x + this.size.x - (this.size.x / 10);
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y = this.location.y + this.size.y - 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move down
                            savedPoint.x = this.location.x + this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move left
                            savedPoint.y = this.tabPoints[i].y + this.size.y / 20;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move up
                            savedPoint.x = this.tabPoints[i].x;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                        }
                        else {
                            shape = new simplePolygon([this.tabPoints[i]], this.unselectedTabColour);

                            savedPoint.x = this.tabPoints[i].x, savedPoint.y = this.tabPoints[i].y;

                            savedPoint.x += this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y += (this.size.y / 20);
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y);  //move down
                            savedPoint.x = this.tabPoints[i].x;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move left

                            shape.points.push(this.tabPoints[i]);//back to start
                        }
                        break;
                    case 1:
                        if (i === this.tabIndex) {
                            shape = new simplePolygon([this.tabPoints[i]], this.selectedTabColour);

                            savedPoint.x = this.tabPoints[i].x, savedPoint.y = this.tabPoints[i].y;

                            savedPoint.x += this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y += this.size.y / 20;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move down
                            savedPoint.x = this.location.x + this.size.x - (this.size.x / 10);
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y = this.location.y + this.size.y - 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move down
                            savedPoint.x = this.location.x + this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move left
                            savedPoint.y = this.tabPoints[i].y + this.size.y / 20;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move up
                            savedPoint.x = this.tabPoints[i].x;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                        }
                        else {
                            shape = new simplePolygon([this.tabPoints[i]], this.unselectedTabColour);

                            savedPoint.x = this.tabPoints[i].x, savedPoint.y = this.tabPoints[i].y;

                            savedPoint.x += this.size.x / 10;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move right
                            savedPoint.y += (this.size.y / 20);
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y);  //move down

                            if (i === 0) {
                                this.tabBox.box1[1].x = savedPoint.x;
                                this.tabBox.box1[1].y = savedPoint.y;
                            }
                            else {
                                this.tabBox.box2[1].x = savedPoint.x;
                                this.tabBox.box2[1].y = savedPoint.y;
                            }

                            savedPoint.x = this.tabPoints[i].x;
                            shape.points.push(polygonEnum.properties[polygonEnum.LINETO].name + savedPoint.x + '_' + savedPoint.y); //move left

                            shape.points.push(this.tabPoints[i]);//back to start
                        }
                        break;
                }

                shape.draw(context);

                context.fillStyle = 'rgb(0,0,0)';
                context.fillText(this.tabs[i].name, this.tabPoints[i].x + 5, this.tabPoints[i].y + 15);
            }

            switch (this.tabs[this.tabIndex].style) {
                case menuType.TRADE:
                    for (var i = 0; i < city.playerCaravans.length; i++) {
                        if (this.selections[0][i].txtColour === 'rgb(0,0,0,.3)')
                            this.selections[0][i].txtColour = 'rgb(0,0,0)';

                        this.selections[0][i].content = 'Caravan';

                        if (city.playerCaravans[i].active)
                            this.selections[0][i].txtColour = 'rgb(0,0,0,.3)';

                        if (city.selectedVessel === i) {
                            this.selections[0][i].bgColour = 'rgb(255,255,240)';
                        } else {
                            this.selections[0][i].bgColour = undefined;
                        }

                        this.selections[0][i].draw(context);
                    } //draw caravans
                    if (!city.playerCaravans[city.selectedVessel].active) {
                        for (var i = 0; i < city.properties.length; i++) {
                            if (this.selections[1][i].txtColour === 'rgb(0,0,0,.3)')
                                this.selections[1][i].txtColour = 'rgb(0,0,0)';

                            this.selections[1][i].content = city.properties[i].produce.name;

                            if (city.selectedProduct[city.selectedVessel] === i) {
                                this.selections[1][i].bgColour = 'rgb(255,255,240)';
                                this.itemValue = city.properties[i].produce.value;
                            } else {
                                this.selections[1][i].bgColour = undefined;
                            }

                            this.selections[1][i].draw(context);
                        } //draw products
                        var j = 0;
                        for (var i = 0; i < cityList.length; i++) {
                            if (this.selections[2][i].txtColour === 'rgb(0,0,0,.3)')
                                this.selections[2][i].txtColour = 'rgb(0,0,0)';

                            if (city.selectedCity[city.selectedVessel] === j) {
                                this.selections[2][j].bgColour = 'rgb(255,255,240)';
                            } else {
                                this.selections[2][j].bgColour = undefined;
                            }

                            if (city.name !== cityList[i].name) {
                                if (this.selections[2][j].bgColour)
                                    this.tradeInfo.content = Math.round(this.itemValue * cityList[i].multiplier) + ' gold in ' + Math.round(city.routeLength(cityList[i])) + ' miles';

                                this.selections[2][j].content = cityList[i].name;
                                this.selections[2][j++].draw(context);
                            }
                        }//draw destinations
                    } else {
                        this.selections[1][city.selectedProduct[city.selectedVessel]].txtColour = 'rgb(0,0,0,.3)';
                        this.selections[1][city.selectedProduct[city.selectedVessel]].bgColour = 'rgb(255,255,240)';
                        this.selections[2][city.selectedCity[city.selectedVessel]].txtColour = 'rgb(0,0,0,.3)';
                        this.selections[2][city.selectedCity[city.selectedVessel]].bgColour = 'rgb(255,255,240)';

                        this.selections[1][city.selectedProduct[city.selectedVessel]].draw(context);
                        this.selections[2][city.selectedCity[city.selectedVessel]].draw(context);
                    }

                    this.tradeInfo.location.x = this.columnX[2] - (this.tradeInfo.getWidth() / 0.9);

                    if (!city.playerCaravans[city.selectedVessel].active) {
                        this.tradeInfo.draw(context);
                        this.tradeButton.draw(context);
                    }
                    break;

                case menuType.INFO:
                    context.fillText(city.description, this.columnX[0], this.location.y + this.size.y / 5 + 25);
                    break;
            }
        }
    }

    countActiveBoxes(index) {
        var x = 0;
        for (var i = 0; i < this.selections[index].length; i++) {
            if (!this.selections[index][i].content) {
                break;
            }
            x++;
        }

        return x;
    }
}