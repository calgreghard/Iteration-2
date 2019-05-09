class dictionary /*This class is to hold dictionaries, this can be hold keys which assigned values*/ {
    constructor(key, value) {
        this.key = [];
        this.value = []; //this creates both empty arrays, this is in teh case of nothing being passed through

        if (key) /*This will check whether you have created an object with a key assigned*/ {
            for (var i = 0; i < key.length; i++) {
                this.key.push(key[i]); //these for loops will add in the items to do the dictionary if they were initiated with them
            }

            if (value === undefined) {
                for (var i = 0; i < key.length; i++) {
                    this.value.push(0); //if the values were undefined in the case where keys was defined the values made 0
                }
            }
            else {
                for (var i = 0; i < value.length; i++) {
                    this.value.push(value[i]); //this is preforming in the same way as the key for loop
                }
            }
        }
    }

        addKey(key) /*This function is for adding to the dictionary, the key is passed but without a value so it will be added by default*/ { 
        this.key.push(key);
        this.value.push(0);
    }

    addKeyAndValue(key, value) /*This is for adding a key and value to the dictionary*/ {
        this.key.push(key);
        this.value.push(value);
    }

    changeValue(key, value) /*This function is to change the value of a key that has already be defined*/ {
        var index;
        for (var i = 0; i < this.key.length; i++) {
            if (this.key[i] === key) /*This conditional statement finds the key passed so it can save the index number*/ {
                index = i; 
                break;
            }
        }
        var str;

        if (value.includes('+')) /*This condition is checking whether I am just adding to the value*/ { 
            let str = value.substring(1);
            if (isNaN(this.value[index])) /*This is checking if the value is not a number*/ {
                this.value[index] += str; //this is adding onto the value as a string
            } else {
                this.value[index] += parseInt(str); //this is adding onto the value as a numeric value
            }
        } else /*this is the case if I want to change the value to a determined one*/ {
            this.value[index] = value; 
        }
    }
}