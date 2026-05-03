"use strict";
console.log("Hello World!");
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Albert", new Date());
