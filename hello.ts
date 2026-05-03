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

export {};