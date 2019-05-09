var polygonEnum = {
    LINETO: 0,
    MOVETO: 1,
    properties: {
        0: { name: 'LINETO' },
        1: { name: 'MOVETO' }
    }
};

class simplePolygon /*This class if for creating all polygon customly in the code, in a more easy-to-look way*/ {
    constructor(points, fillcolour) {
        this.points = points; //the points passed in will be planed to be passed in as an array 
        this.fillColour = fillcolour; //the colour of the object is passed in (I was tempted to name this color just for familiarity)
    }

    draw(context) /*This function will happen in the render of the code and is only to draw the object on screen*/ {
        context.fillStyle = this.fillColour;
        context.beginPath();
        var savedPoint = new point(); //an empty point is created for later use
        for (var i = 0; i < this.points.length; i++) /*loop through the points within the shape*/ {
            switch (i) {
                case 0:
                    context.moveTo(this.points[i].x, this.points[i].y); //as the first point will be the starting location of the shape it will need to move to this location

                    savedPoint.x = this.points[i].x; //the first point will be saved 
                    savedPoint.y = this.points[i].y; //it will not be savedPoint = this.points[i] as this will create them to be constantly tied when I changed
                    break;
                default: //this is every other point
                    if (typeof this.points[i] !== 'object') /*This finds whether this is not an object (instance of a class)*/ {
                        let axis; //this will set if the axis is being changed
                        let sign; //this will set if numeric equation is happening on an axis
                        let num; //this is the number
                        let nextPoint = new point(); //these variables are all let as they may not be set again later so I want them to reset after the case

                        if (this.points[i].includes('X')) /*If the instruction string contains an 'X'*/ {
                            axis = 'X';
                        } else if (this.points[i].includes('Y')) /*If the instruction string contains an 'X'*/ {
                            axis = 'Y';
                        } else if (this.points[i].includes('_')) /*If the instruction string contains an '_', in this case it is setting for both points*/ {
                            nextPoint = new point(parseInt(this.points[i].substring(6, this.points[i].indexOf('_'))),
                                parseInt(this.points[i].substring(this.points[i].indexOf('_') + 1)));
                        }

                        if (axis) /*If X or Y was found this loop fires*/ {
                            if (this.points[i].includes('+')) {
                                sign = '+'; //sign is changed depended on what is included in the string 
                                num = parseInt(this.points[i].substring(this.points[i].indexOf(axis) + 2)); //the num is set aswell converting a sub string from the instruction into an number
                            } else if (this.points[i].includes('-')) {
                                sign = '-';
                                num = parseInt(this.points[i].substring(this.points[i].indexOf(axis) + 2));
                            }
                        }

                        if (sign) /*this continues from wheth er the sign was found*/ {
                            switch (axis) {
                                case 'X':
                                    nextPoint.x = operators[sign](savedPoint.x, num); //from the sign and axis an operator object function fires depending on which operator
                                    break;
                                case 'Y':
                                    nextPoint.y = operators[sign](savedPoint.y, num);
                                    break;
                            }
                        }

                        if (this.points[i].includes('LINETO')) /*In this function it will act on instruction depending on the instruction and axis*/ {
                            context.lineTo((nextPoint.x) ? nextPoint.x : savedPoint.x, (nextPoint.y) ? nextPoint.y : savedPoint.y);
                        } else if (this.points[i].includes('MOVETO')) {
                            context.moveTo((nextPoint.x) ? nextPoint.x : savedPoint.x, (nextPoint.y) ? nextPoint.y : savedPoint.y);
                        }

                        savedPoint.x = (nextPoint.x) ? nextPoint.x : savedPoint.x; //the new point is then saved
                        savedPoint.y = (nextPoint.y) ? nextPoint.y : savedPoint.y;

                    } else /*If the point is an object*/ {
                        context.lineTo(this.points[i].x, this.points[i].y); //A line will be created to the point

                        savedPoint.x = this.points[i].x;
                        savedPoint.y = this.points[i].y;
                    }
                    break;
            }
        }
        context.closePath();
        context.fill();
    }
}