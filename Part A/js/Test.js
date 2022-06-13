import { Undergraduate } from "../../Part A/js/People.js";
import OpenAddressHashTable from "./OpenAddressHashTable.js";
import { Person, Employee, Student } from "./People.js";

const NUM_BINS = 5;
const KEY_LENGTH = 8;

function printHashTable(header, hashTable) {
    let text = hashTable.toString();
    text = header + "\n" + text;
    console.log(text);
    let outputDisplay = document.getElementById("output-display");
    text = text.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');
    text = text.replaceAll(" ", '&nbsp;');
    outputDisplay.innerHTML += text;
}

function addPersonToHashTable(person, hashTable) {
    hashTable.putValue(person.key, person);
    printHashTable("Current Hash Table:", hashTable);
}

let hashTable = new OpenAddressHashTable(NUM_BINS, KEY_LENGTH);

//Inserts at 3 different indexes

addPersonToHashTable(new Student("AAAAAAAA", "George", "Harrison", 4.0), hashTable);
addPersonToHashTable(new Person("BBBBBBBB", "Chuck", "Berry"), hashTable);
addPersonToHashTable(new Person("CCCCCCCC", "Roger", "Waters"), hashTable);


//replaces two of the previous indexex
addPersonToHashTable(new Employee("CCCCCCCC", "Ringo", "Starr", 40000), hashTable);
addPersonToHashTable(new Student("BBBBBBBB", "Jimi", "Hendrix", 3.6), hashTable);

//gets the new replaced index values
let p = hashTable.getValue("CCCCCCCC");
console.log("\nget " + "CCCCCCCC" + ": " + p.toString() + "\n");
p = hashTable.getValue("BBBBBBBB");
console.log("\nget " + "BBBBBBBB" + ": " + p.toString() + "\n");


//Fills the table up, making a new table double the size AND rehashs
addPersonToHashTable(new Employee("DDDDDDDD", "Paul", "McCartney", 80000), hashTable);
addPersonToHashTable(new Student("FFFFFFFF", "Mick", "Jagger", 3.5), hashTable);
addPersonToHashTable(new Person("GGGGGGGG", "Chuck", "Berry"), hashTable);

//add a new person after the table is resized
addPersonToHashTable(new Person("ZZZZZZZZ", "Micheal", "Jordan"), hashTable);

//remove a value which also rehashes elements into the array
hashTable.removeValue("ZZZZZZZZ");
printHashTable("\nAfter Removing Micheal Jordan", hashTable);

//add undergraduates
addPersonToHashTable(new Undergraduate("JJJJJJJJ", "Albert", "Einstien", 4.0, "U-4"), hashTable);
addPersonToHashTable(new Undergraduate("KKKKKKKK", "Pit", "Bull", 4.0, "U-2"), hashTable);
addPersonToHashTable(new Undergraduate("PQIEJDNS", "Mark", "Zuckerburg", 4.0, "U-4"), hashTable);
addPersonToHashTable(new Undergraduate("ANSKIENS", "King", "TUT", 3.0, "U-1"), hashTable);


//filled up the new hash table for remove testing
hashTable.removeValue("PQIEJDNS");
printHashTable("\nAfter Removing Mark", hashTable);
hashTable.removeValue("ANSKIENS");
printHashTable("\nAfter Removing tut", hashTable);

//key doesnt exist, program just returns, no changes done
hashTable.removeValue("VVVVVVVV");
printHashTable("\nAfter Removing nonexistent key", hashTable);


hashTable.removeValue("HHHHHHHH");
printHashTable("\nAfter Removing nonexistent key", hashTable);

hashTable.removeValue("OOOOOOOO");
printHashTable("\nAfter Removing nonexistent key", hashTable);



/*// DEMONSTRATE ADDING VALUES TO THE HASH TABLE, WHICH INCLUDES THE NEED TO MAKE THE HASH TABLE BIGGER
addPersonToHashTable(new Student(hashTable.generateKey(), "George", "Harrison", 4.0), hashTable);
addPersonToHashTable(new Employee(hashTable.generateKey(), "Paul", "McCartney", 80000), hashTable);
addPersonToHashTable(new Employee(hashTable.generateKey(), "Ringo", "Starr", 40000), hashTable);
addPersonToHashTable(new Person(hashTable.generateKey(), "Chuck", "Berry"), hashTable);
addPersonToHashTable(new Student(hashTable.generateKey(), "Mick", "Jagger", 3.5), hashTable);
addPersonToHashTable(new Student(hashTable.generateKey(), "Jimi", "Hendrix", 3.6), hashTable);
addPersonToHashTable(new Person(hashTable.generateKey(), "Roger", "Waters"), hashTable);

// DEMONSTRATE MAKING KEYS AND ADDING VALUES TO THE HASH TABLE    
let jlKey = hashTable.generateKey();
hashTable.putValue(jlKey, new Student(jlKey, "John", "Lennon", 3.8));
let cwKey = hashTable.generateKey();
hashTable.putValue(cwKey, new Student(cwKey, "Charlie", "Watts", 3.1));
let dgKey = hashTable.generateKey();
hashTable.putValue(dgKey, new Employee(dgKey, "David", "Gilmour", 120000));
printHashTable("\nAfter Changing 3 Items", hashTable);

// DEMONSTRATE GETTING VALUES FROM THE HASH TABLE
let p = hashTable.getValue(jlKey);
console.log("\nget " + jlKey + ": " + p.toString() + "\n");
p = hashTable.getValue(cwKey);
console.log("\nget " + cwKey + ": " + p.toString() + "\n");
p = hashTable.getValue(dgKey);
console.log("\nget " + dgKey + ": " + p.toString() + "\n");

// NOW LET'S TRY REPLACING THE DATA IN THE ABOVE THREE
hashTable.putValue(jlKey, new Student(jlKey, "Otis", "Redding", 3.5));
hashTable.putValue(cwKey, new Student(cwKey, "Keith", "Richards", 3.1));
hashTable.putValue(dgKey, new Student(dgKey, "Bill", "Withers", 3.4));
printHashTable("\nAfter Changing 3 Items", hashTable);

// AND DEMONSTRATE REMOVING ITEMS FROM THE BST
hashTable.removeValue(jlKey);
printHashTable("\nAfter Removing Otis Redding", hashTable);

hashTable.removeValue(cwKey);
printHashTable("\nAfter Removing Keith Richards", hashTable);

hashTable.removeValue(dgKey);
printHashTable("\nAfter Removing Bill Withers", hashTable);*/