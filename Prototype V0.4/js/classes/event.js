class event {
    constructor(content, product, change, city) {
        this.active = false;
        this.city = city;
        this.product = product;
        this.priceChange = change;
        this.currentTime = 0;
        this.maxTime = 100;
        this.text = new label(undefined, content, 'rgb(0,0,0)', 'rgb(255,255,240,.3)');
        this.text.location = new point(canvas.clientWidth - 30 - this.text.getWidth(), 25);
    }

    draw(context) {
        this.text.draw(context);
        this.currentTime++;
        if (this.currentTime === this.maxTime)
            this.deactivate();  
    }

    activate() {
        this.active = true;
        if (typeof this.city === 'string') {
            for (var i = 0; i < cityList.length; i++) {
                for (var j = 0; j < cityList[i].properties.length; j++) {
                    if (cityList[i].properties[j].produce === this.product) {
                        cityList[i].properties[j].produce.value = operators[this.priceChange[0]](cityList[i].properties[j].produce.value, parseInt(this.priceChange.substr(1)));
                    }
                }
            }
        } else if (typeof this.city === 'object') {
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i] === this.city) {
                    for (var j = 0; j < cityList[i].properties.length; j++) {
                        if (cityList[i].properties[j].produce === this.product) {
                            cityList[i].properties[j].produce.value = operators[this.priceChange[0]](cityList[i].properties[j].produce.value, parseInt(this.priceChange.substr(1)));
                            break;
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < cityList.length; i++) {
                for (var j = 0; j < this.city.length; j++) {
                    if (cityList[i] === this.city[j]) {
                        for (var k = 0; k < cityList[i].properties.length; k++) {
                            if (cityList[i].properties[k].produce === this.product) {
                                cityList[i].properties[k].produce.value = operators[this.priceChange[0]](cityList[i].properties[j].produce.value, parseInt(this.priceChange.substr(1)));
                            }
                        }
                    }
                }
            }
        }
    }

    deactivate() {
        this.active = false;

        if (typeof this.city === 'string') {
            for (var i = 0; i < cityList.length; i++) {
                for (var j = 0; j < cityList[i].properties.length; j++) {
                    if (cityList[i].properties[j].produce === this.product) {
                        preformOperator(this.priceChange);
                    }
                }
            }
        } else if (typeof this.city === 'object') {
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i] === this.city) {
                    for (var j = 0; j < cityList[i].properties.length; j++) {
                        if (cityList[i].properties[j].produce === this.product) {
                            preformOperator(this.priceChange);
                            break;
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < cityList.length; i++) {
                for (var j = 0; j < this.city.length; j++) {
                    if (cityList[i] === this.city[j]) {
                        for (var k = 0; k < cityList[i].properties.length; k++) {
                            if (cityList[i].properties[k].produce === this.product) {
                                preformOperator(this.priceChange);
                            }
                        }
                    }
                }
            }
        }

        function preformOperator(priceChange) {
            if (priceChange[0] === '+')
                cityList[i].properties[j].produce.value = operators['-'](cityList[i].properties[j].produce.value, parseInt(priceChange.substr(1)));
            else if (priceChange[0] === '-')
                cityList[i].properties[j].produce.value = operators['+'](cityList[i].properties[j].produce.value, parseInt(priceChange.substr(1)));
            else if (priceChange[0] === '*')
                cityList[i].properties[j].produce.value = operators['/'](cityList[i].properties[j].produce.value, parseInt(priceChange.substr(1)));
            else if (priceChange[0] === '/')
                cityList[i].properties[j].produce.value = operators['*'](cityList[i].properties[j].produce.value, parseInt(priceChange.substr(1)));
        }
    }
}