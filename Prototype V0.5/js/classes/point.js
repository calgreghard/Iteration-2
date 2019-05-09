class point /*This class is just to hold vecors as an x and y value*/ {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    findDistance(check) {
        return new point(this.x - check.x, this.y - check.y);
    }
}