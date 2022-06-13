class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let index = this.hashCode(key);

        let count = 0;

        while (count < this.length){

            let test = this.hashTable[index];

            if(test == null){
                return null;
            }
            else if(test.key == key){
                return test.value;
            }
            index++
            if(index == this.length){
                index = 0;
            }
            count++;
        }
        return null;
    }

    rehashForRemove(){
        let temp = new Array(length);

        for(let i=0; i< this.length; i++){
            temp[i] = null;

        }
        for(let i=0; i< this.length; i++){

            if(this.hashTable[i] != null){
                let index = this.hashCode(this.hashTable[i].key);
                if(temp[index] == null){
                    temp[index] = this.hashTable[i];
                }
                else{
                    let z = index;
                    while(temp[z] != null){

                        z= (z+1) % this.length;
                    }
                        temp[z] = this.hashTable[i];
                }
            }
        }
        this.hashTable = temp;
    }

    
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

        let index = this.hashCode(key);
        if(this.hashTable[index] === null){ 
            let count =0;
            for(let i = index; i < this.length; i = (i+1) % this.length){
                if(count === this.size){
                    break;
                }
                if(this.hashTable[index] != null && this.hashTable[index].key === key){
                    count++;
                    this.hashTable[index] = null;
                    this.size--;
                    this.rehashForRemove();
                    return;

                }
            }
        }
        if(this.hashTable[index] != null) {
            if (this.hashTable[index].key == key) {

                this.hashTable[index] = null;
                this.size--;
                this.rehashForRemove();

            } else {
                let a = index;
                let count1 = 0;;
                for (let temp = a; temp < this.length; temp = (temp + 1) % this.length) {
                    if(count1 === this.size){
                        return;
                    }
                    if (this.hashTable[temp] != null) {

                        if (this.hashTable[temp].key === key) {
                            a = temp;
                            break;
                        }
                        count1++;
                    }
                }
                this.hashTable[a] = null;
                this.size--;
                this.rehashForRemove();

            }
        }

    
    }
    rehash(item2, newItem){

        for(let i = 0; i< this.length; i++){
            item2[i] = null;
        }
        for(let i =0; i< this.length/2; i++) {
            let index = this.hashCode(this.hashTable[i].key);  //the new index with the new length of the array
            if (item2[index] == null) {
            item2[index] = this.hashTable[i]; //COPY THE VALUE AT THE INDEX IN ORIGINAL ARRAY INTO PROPER SPOT

        }
            else{
                let z = index;
                while(item2[z] != null){

                    z= (z+1) % this.length;
                }
                if(item2[z] == null) {
                    item2[z] = this.hashTable[i];

                }
            }
        }

        let index1 = this.hashCode(newItem.key);
        if(item2[index1] == null){
            item2[index1] = newItem;
            this.size++;

        }
        else{
            let a = index1;
            while(item2[a] != null){

                a= (a+1) % this.length;
            }
            if(item2[a] == null) {
                item2[a] = newItem;
                this.size++;

            }
        }
        return item2;

    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

        let index = this.hashCode(key);

        let newItem = new KeyValuePair(key, item);

        //CHECKS IF THE KEY ALREADY EXISTS
        for(let i=0; i < this.length; i++) {
            if (this.hashTable[i] != null) {
                 if (this.hashTable[i].key === key) {
                      this.hashTable[i] = newItem;
                     return;
            }
        }
        }

        if(this.size === this.length){

            this.length = this.length *2;
            let newHashTable = new Array(this.length);
            this.hashTable = this.rehash(newHashTable, newItem);
            return;


        }

        if(this.hashTable[index] == null){
            this.hashTable[index] = newItem;
            this.size++;
        }
        else if(this.hashTable[index] != null && this.size != this.length){
            let i = index;
            while(this.hashTable[i] != null){

                i= (i+1) % this.length;
            }
            if(this.hashTable[i] == null) {
                this.hashTable[i] = newItem;
                this.size++;
                return;
            }
        }

        }

        

    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};