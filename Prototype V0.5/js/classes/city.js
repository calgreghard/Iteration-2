class city {
    constructor(location, name, type, properties, religion, deity) {
        this.location = location;

        this.name = name;

        this.type = type;
        this.multiplier = (cityType.properties[type].multiplier) ? cityType.properties[type].multiplier : undefined;
        this.image = cityType.properties[type].image;

        this.properties = (properties === undefined) ? [] : properties;
        this.cityGoods = new Map();
        if (this.properties.length > 0) {
            for (var i = 0; i < properties.length; i++) {
                this.cityGoods.set(this.properties[i].produce, 0);
            }
        }

        this.religion = religion;
        this.patronDeity = deity;

        this.description = this.name;
        let shortSentence;
        let sentenceStart;

        this.description += ` ${cityType.properties[type].name}.\n\n`;
        sentenceStart = this.description.length - 1;

        if (properties.length > 0) {
            for (var i = 0; i < properties.length; i++) {
                if (i === 0) {
                    this.description += 'This city contains ';
                } else
                    this.description += ', and ';

                this.description += (i !== properties.length - 1) ?
                    `a ${buildingType.properties[properties[i].type].name} producing ${this.properties[i].produce.name.toLowerCase()} ` :
                    `a ${buildingType.properties[properties[i].type].name} producing ${this.properties[i].produce.name.toLowerCase()}.\n\n`;
            }
        }

        if (this.patronDeity) {
            for (var i = 0; i < this.patronDeity.length; i++) {
                if (i === 0)
                    this.description += `This city practices worship of `;

                shortSentence = this.description.substr(sentenceStart);

                if (context.measureText(shortSentence).width + context.measureText(` ${this.patronDeity[i].name} which is the god of `).width >
                    cityMenu.size.x - (cityMenu.size.x / 5)) {
                    this.description += `\n`;
                    sentenceStart = this.description.length - 1;
                }

                this.description += `${this.patronDeity[i].name} which is the god of `;


                for (var j = 0; j < this.patronDeity[i].type.length; j++) {
                    shortSentence = this.description.substr(sentenceStart);

                    if (context.measureText(`${goodType.properties[this.patronDeity[i].type[j]].name}  `).width + context.measureText(shortSentence).width >
                        cityMenu.size.x - (cityMenu.size.x / 5)) {
                        this.description += `\n`;
                        sentenceStart = this.description.length - 1;
                    }

                    if (j === 0 && j !== this.patronDeity[i].type.length - 1) {
                        this.description += `${goodType.properties[this.patronDeity[i].type[j]].name}`;

                        this.description += (this.patronDeity[i].type.length - 1 !== j) ? `, ` : `. `;
                    } else if (j === this.patronDeity[i].type.length - 1) {
                        this.description += `${goodType.properties[this.patronDeity[i].type[j]].name}.`;
                    } else {
                        this.description += `and ${goodType.properties[this.patronDeity[i].type[j]].name}`;

                        this.description += (this.patronDeity[i].type.length - 1 !== j) ? `, ` : `. `;
                    }
                }
            }
        }

        this.playerCaravans = [new tradeVessel(this), new tradeVessel(this), new tradeVessel(this)];

        this.selectedVessel = 0;
        this.selectedProduct = [0, 0, 0];
        this.selectedCity = [0, 0, 0];

        this.image.onpointerdown = this.onDown;
    }

    update(context, seperation) {
        context.drawImage(this.image, this.location.x + seperation.x, this.location.y + seperation.y, imageSize, imageSize);
        context.fillStyle = 'rgb(0,0,0,0.75)';
        context.font = '15px Arial';
        context.fillText(this.name, this.location.x + seperation.x, this.location.y + seperation.y, imageSize, imageSize);
        context.stroke();
    }

    addCaravan() {
        this.playerCaravans.push(new tradeVessel(this));
    }

    routeLength(city) {
        var x = (this.location.x > city.location.x) ? this.location.x - city.location.x : city.location.x - this.location.x;
        var y = (this.location.y > city.location.y) ? this.location.y - city.location.y : city.location.y - this.location.y;
        x *= x, y *= y;
        return Math.sqrt(x + y);
    }
}