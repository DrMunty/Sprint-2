console.log("Hello World!");
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Albert", new Date());
function printId(id) {
    console.log("Your ID is: " + id);
}
printId(101);
printId("202");
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
function printCoord1(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord1({ x: 100, y: 100 });
export {};
