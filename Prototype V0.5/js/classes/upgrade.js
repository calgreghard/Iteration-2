class upgrade {
    constructor(type, details) {
        this.type = type;
        this.details = details;
        switch (this.type.contains) {
            case 'NEW':
                switch (this.type.contains) {
                    case 'CITY':
                        cityList.push(new city(details[0], details[1], details[2], details[3], details[4], details[5]));
                        break;
                    case 'FARM':
                        details[0].properties.push(new farm(details[1], details[2]));
                        break;
                }
                break;
            case 'UPGRADE':
                switch (this.type.contains) {
                    case 'HARVEST':
                        break;
                }
                break;
        }
    }
}