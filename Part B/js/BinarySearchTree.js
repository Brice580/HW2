class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
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

    searchForDuplicateKey(key, node){
        while(node != null){
            if(node.key === key){
                return node;
            }
            else if(node.key < key){
                node = node.right;
            }
            else
                node = node.left;
        }
        return null;

    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {


        let condition = true;
        let cursorInit = this.root;
        let temp = this.searchForDuplicateKey(key, cursorInit);

        if(temp != null){
            temp.data = value;
            return;
        }

        if(this.root === null){
            this.root = new Node(key, value, null, null, null);
            this.size++;
        }

        else{
            let cursor = this.root;
            while(condition){
                if(cursor.key > key){
                    if(cursor.left === null){

                        cursor.left = new Node(key, value, cursor, null, null);
                        this.size++;
                        condition = false;

                    }
                    else
                        cursor = cursor.left;
                }
                else if(cursor.key < key){
                    if(cursor.right === null){

                        cursor.right= new Node(key,value,cursor, null, null);
                        this.size++;
                        condition = false;
                    }
                    else
                        cursor = cursor.right;
                }
                else
                    condition = false;
            }
        }



    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let cursor = this.root;
        
        while(cursor != null){
            if(cursor.key === key){
                return cursor.data;

            }
            else if(cursor.key < key){

                cursor = cursor.right;
            }
            else{

                cursor = cursor.left
            }
        }
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let cursor = this.root;

            let condition = false;
            while (!condition) {

                if (key === cursor.key) {

                    if (cursor.left != null) {

                        let largest = cursor.left;
                        while (largest.right != null) {
                            largest = largest.right;
                        }
                       
                        cursor.key = largest.key;

                        cursor.data = largest.data;
                        
                        if (largest === largest.parent.left) {
                            largest.parent.left = largest.left;
                        }
                        else {

                            largest.parent.right = largest.left;
                        }
                    }
                    else if (cursor.right != null) {

                        let smallest = cursor.right;
                        while (smallest.left != null) {

                            smallest = smallest.left;
                        }
                        
                        cursor.key = smallest.key;
                        cursor.data = smallest.data;
                        
                        if (smallest === smallest.parent.right) {
                            smallest.parent.right = smallest.right;
                        }
                        else {
                            smallest.parent.left = smallest.right;
                        }
                    }
                    else {

                        if (cursor === this.root) {

                            this.root = null;
                        }

                        else if (cursor === cursor.parent.left) {
                            cursor.parent.left = null;

                        }


                        else {
                            cursor.parent.right = null;

                        }
                    }
                    this.size--;
                    condition = true;
                }
                else if (key < cursor.key) {
                    if (cursor.left === null) {
                        return;
                    }
                    else {
                        cursor = cursor.left;
                    }
                }
                else {
                    if (cursor.right === null) {
                        return;
                    }
                    else {
                        cursor = cursor.right;
                    }
                }
            }


    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}