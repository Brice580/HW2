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
            else if(test.key.localeCompare(key) == 0){
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

    
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

    
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

        let index = this.hashCode(key); 
            let count = 0;
            while (count < this.length) {
                let test = this.hashTable[index];

                if (test == null) {

                    this.hashTable[index] = new KeyValuePair(key, item);
                    this.size++;

                    return;
                }
                else if ((test.key).localeCompare(key) == 0) {

                    this.hashTable[index].value = item;
                    size++;
                    return;
                }

                index++;
                if (index == this.length)
                    index = 0;

                count++;
            }
            
            let temp = this.hashTable;
            this.length = this.length*2;      

            this.hashTable = new Array(length);

            for (let i = 0; i < this.length; i++) {
                this.hashTable[i] = null;
            }

            let numToCopy = this.size;
            this.size = 0;

            for (let i = 0; i < numToCopy; i++) {

                let testPair = temp[i];

                let keyToMove = testPair.key;

                let valueToMove = testPair.value;

                this.putValue(keyToMove, valueToMove);
            }
            
            this.putValue(key, item);
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