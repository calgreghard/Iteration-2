class buildings {
    constructor(type, produce) {
        this.type = type;
        this.produce = produce;
        this.perHundred = (buildingType.properties[type].perHundred !== undefined) ? buildingType.properties[type].perHundred : undefined;
        this.seasonal = (buildingType.properties[type].perHundred === undefined) ? seasons.Shemu : undefined;
    }

    harvest(city) {
        //console.log(city.cityGoods);
        //console.log(this.produce);
        //console.log(city.cityGoods.get(this.produce)); for testing wether this worked
        if (this.seasonal) {
            if (city.cityGoods.has(this.produce)) {
                city.cityGoods.set(this.produce, parseInt(city.cityGoods.get(this.produce)) + 100);
            }
            console.log(city.name + ' produced ' + this.produce.name);
        }
        else if (this.perHundred) {
            if (city.cityGoods.key.includes(this.produce)) {
                city.cityGoods.set(this.produce, parseInt(city.cityGoods.get(this.produce)) + 1);
            }
            console.log(city.name + ' produced ' + this.produce.name);
        }
    }
}