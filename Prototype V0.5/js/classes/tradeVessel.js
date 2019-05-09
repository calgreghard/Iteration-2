class tradeVessel {
    constructor(city) {
        this.location = new point(city.location.x, city.location.y);
        this.active = false;
        this.moveDistance;
        this.cargoValue;
        this.image = caravanImage;
        this.route = {
            HOME: city,
            DESTINATION: undefined
        };

        this.frameCount;

        this.onReturn = false;
    }

    draw(context, seperation) {
        if (this.active) {
            context.drawImage(this.image, this.location.x + seperation.x, this.location.y + seperation.y, imageSize, imageSize);
            this.move();
        }
    }

    move() {
        if (this.active) {
            this.frameCount--;

            this.location.x += this.moveDistance.x;
            this.location.y += this.moveDistance.y;
        }

        if (this.frameCount <= 0) {
            if (this.onReturn) {
                this.route.HOME = this.route.DESTINATION;
                this.route.DESTINATION = undefined;
                this.endRoute();
            } else {
                this.onReturn = true;
                var x = this.route.HOME;
                this.route.HOME = this.route.DESTINATION;

                this.newRoute(x);

                //switchVar(this.route.HOME, this.route.DESTINATION);
            }
        }
    }

    newRoute(city) {
        this.route.DESTINATION = city;
        this.active = true;

        this.frameCount = this.route.HOME.routeLength(city);

        var distX = (this.route.HOME.location.x > this.route.DESTINATION.location) ? this.route.HOME.location.x - this.route.DESTINATION.location.x : this.route.DESTINATION.location.x - this.route.HOME.location.x;
        var distY = (this.route.HOME.location.y > this.route.DESTINATION.location) ? this.route.HOME.location.y - this.route.DESTINATION.location.y : this.route.DESTINATION.location.y - this.route.HOME.location.y;

        this.moveDistance = new point(distX / this.frameCount, distY / this.frameCount);

        if (!this.onReturn)
            this.cargoValue = Math.round((this.route.DESTINATION.multiplier * cityMenu.chosenProduct.value) - (cityMenu.productBaseValue * this.route.HOME.multiplier));
    }

    endRoute() {
        player.money += this.cargoValue;

        this.active = false;

        this.onReturn = false;
    }
}