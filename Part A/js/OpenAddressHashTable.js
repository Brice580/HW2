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
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
    }
    rehash(oldHash, newHash, newItemObject){
        for(let i =0; i< this.length/2; i++){
            let index = this.hashCode(oldHash[i].key);
            if(newHash[index] == null){
                newHash[index] = oldHash[i];
            }
            else{
                let z = index;
                while(newHash[z] != null){
                    z = (z+1) % this.length;
                }
                if(newHash[z] == null){
                    newHash[z] = oldHash[i];
                }
            }
        }
        let index1 = this.hashCode(newItemObject.key);
        if(newHash[index1] == null){
            newHash[index1] = newItemObject;
            this.size++;
        }
        else{
            let a = index1;
            while(newHash[a] !=null){

                a = (a+1) % this.length;

            }
            if(newHash[a] == null){
                newHash[a] = newItemObject;
                this.size++;
            }
        }
        oldHash = newHash;
        
    }    

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

        let index = this.hashCode(key);

        let newItem = new KeyValuePair(key, item);

        for(let i =0; i<this.length; i++){
            if(this.hashTable[i] != null){
                if(this.hashTable[i].key == key){
                    this.hashTable[i] = newItem;
                    return;
                }
            }

        }
        if(this.size == this.length){
            this.length = this.length*2;
            let newHashTable = new Array(this.length);
            this.rehash(this.hashTable,newHashTable,newItem);

        }
        if(this.hashTable[index] == null){
            this.hashTable[index] = newItem;
            this.size++;
        }
        else if(this.hashTable[index] != null && this.size != this.length){
           let i = index;
            while(this.hashTable[i] != null){
                i = (i+1) % this.length;
            }
            if(this.hashTable[i] == null){
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