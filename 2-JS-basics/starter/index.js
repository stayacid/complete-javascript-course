/*****************************
* CODING CHALLENGE 1
*/

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/

let markWeight = 62
let markHeight = 1.72

let johnWeight = 70
let johnHeight = 1.80

let markBmi = markWeight / Math.pow(markHeight , 2)
console.log(markBmi);
let johnBmi = johnWeight / Math.pow(johnHeight , 2)
console.log(johnBmi);

let compare = markBmi > johnBmi
console.log("Is Mark's BMI higher than John's? " + compare);