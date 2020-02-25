'use strict';

/** ***************************
* CODING CHALLENGE 1
*/

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: 
BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/

const markWeight = 62;
const markHeight = 1.72;

const johnWeight = 70;
const johnHeight = 1.80;

const markBmi = markWeight / Math.pow(markHeight, 2);
// console.log(markBmi);
const johnBmi = johnWeight / Math.pow(johnHeight, 2);
// console.log(johnBmi);

const compare = markBmi > johnBmi;
// console.log(`Is Mark's BMI higher than John's? ${compare}`);

/** ***************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, 
John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

const johnTeamScores = [89, 120, 123];
const mikeTeamScores = [116, 94, 123];
const maryTeamScores = [97, 134, 103];

const getAverage = (arr) => Math.round(arr.reduce((a, b) => a + b) / arr.length);

const johnTeamAverageScore = getAverage(johnTeamScores);
const mikeTeamAverageScore = getAverage(mikeTeamScores);
const maryTeamAverageScore = getAverage(maryTeamScores);

/*switch (true) {
  case johnTeamAverageScore > mikeTeamAverageScore && johnTeamAverageScore > maryTeamAverageScore:
    console.log(`John's team win with average score ${johnTeamAverageScore}`);
    break;
  case mikeTeamAverageScore > johnTeamAverageScore && mikeTeamAverageScore > maryTeamAverageScore:
    console.log(`Mike's team win with average score ${mikeTeamAverageScore}`);
    break;
  case maryTeamAverageScore > johnTeamAverageScore && maryTeamAverageScore > mikeTeamAverageScore:
    console.log(`Mary's team win with average score ${maryTeamAverageScore}`);
    break;
  default:
    console.log("It's a draw!");
}*/

/*****************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/

const bills = [124, 48, 268]

const calc = (bills) => {
  let tips = []
  bills.forEach(bill => {
    switch (true) {
      case bill < 50:
        tips.push(Math.round(bill * 0.2))
        break;
      case bill >= 50 && bill < 200:
        tips.push(Math.round(bill * 0.15))
        break;
      default:
        tips.push(Math.round(bill * 0.1))
        break;
    }
  });
  console.log(tips);
}

calc(bills)