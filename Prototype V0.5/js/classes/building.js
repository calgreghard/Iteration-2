class buildings {
    constructor(type, produce) {
        this.type = type;
        this.produce = produce;
        this.perHundred = (buildingType.properties[type].perHundred !== undefined) ? buildingType.properties[type].perHundred : undefined;
        this.seasonal = (buildingType.properties[type].perHundred === undefined) ? buildingType.properties[type].season : undefined;
    }

    harvest(city) {
        if (this.seasonal) {
            if (city.cityGoods.has(this.produce)) 
                city.cityGoods.set(this.produce, parseInt(city.cityGoods.get(this.produce)) + 100);
        }
        else if (this.perHundred) {
            if (city.cityGoods.key.includes(this.produce)) 
                city.cityGoods.set(this.produce, parseInt(city.cityGoods.get(this.produce)) + 1);
        }
    }
}

class farm extends buildings {
    constructor(produce) {
        super(buildingType.FARM, produce);
    }
}

class hunter extends buildings {
    constructor(produce) {
        super(buildingType.HUNTER, produce);
    }
}

class weaver extends buildings {
    constructor(produce) {
        super(buildingType.WEAVER, produce);
    }
}

class smith extends buildings {
    constructor(produce) {
        super(buildingType.SMITH, produce);
    }
}

class miner extends buildings {
    constructor(produce) {
        super(buildingType.MINER, produce);
    }
}

class potter extends buildings {
    constructor(produce) {
        super(buildingType.POTTER, produce);
    }
}

class temple extends buildings {
    constructor(produce, deity) {
        super(buildingType.TEMPLE, produce);
        this.deity = deity;
    }
}