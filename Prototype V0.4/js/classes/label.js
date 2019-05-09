class label {
    constructor(location, content, txtcolour, bgcolour) {
        this.location = location;
        this.content = content;
        this.txtColour = txtcolour;
        this.bgColour = bgcolour;
        context.font = '15px Arial';
        this.size = new point(context.measureText(this.content), 25);
    }

    draw(context) {
        this.size.x = context.measureText(this.content);
        if (this.bgColour) {
            let shape = new simplePolygon([new point(this.location.x, this.location.y + 8), polygonEnum.properties[polygonEnum.LINETO].name + 'X+' + this.size.x.width,
            polygonEnum.properties[polygonEnum.LINETO].name + 'Y-' + this.size.y,
            polygonEnum.properties[polygonEnum.LINETO].name + 'X-' + this.size.x.width,
            this.location],
                this.bgColour);

            shape.draw(context);
        }

        context.fillStyle = (this.txtColour) ? this.txtColour : 'rgb(0,0,0)';
        context.fillText(this.content, this.location.x, this.location.y);
    }

    getWidth() {
        return context.measureText(this.content).width;
    }
}