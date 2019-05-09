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

        this.playerProperties = [];
        this.playerGoods = new Map();
        if (this.properties.length > 0) {
            for (var i = 0; i < properties.length; i++) {
                this.playerGoods.set(this.properties[i].produce, 0);
            }
        }

        this.religion = (religion !== undefined) ? true : false;
        this.patronDeity = (deity !== undefined) ? true : false;

        this.description = this.name;

        this.description += ' ' + cityType.properties[type].name;

        this.playerCaravans = [new tradeVessel(this), new tradeVessel(this), new tradeVessel(this)];

        this.selectedVessel = 0;
        this.selectedProduct = [0, 0, 0];
        this.selectedCity = [0, 0, 0];

        this.image.onpointerdown = this.onDown;

        console.log(this);
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