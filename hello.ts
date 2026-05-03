console.log("Hello World!");

function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Albert", new Date());

function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
printId(101)
printId("202")
// printId({myID:2004}) Això no seria correcte ja que no s'ha especificat cap type.

//Type Aliases

type Point = {
  x: number;
  y: number;
};
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });

//Interface

interface Point1 {
  x: number;
  y: number;
}
 
function printCoord1(pt: Point1) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord1({ x: 100, y: 100 });

export {};