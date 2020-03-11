// Function constructor
const Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function () { // add method to constructor later
  console.log(2016 - this.yearOfBirth);
};
Person.prototype.lastName = 'Smith';

// const john = new Person('John', 1990, 'teacher');
// const jane = new Person('Jane', 1969, 'designer');
// const mark = new Person('Mark', 1989, 'retired');

// Object.create

const personProto = {
  calculateAge: () => {
    console.log(2016 - this.yearOfBirth);
  },
};

const john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1919;
john.job = 'teacher';


const jane = Object.create(personProto, {
  name: { value: 'Jane' },
  yearOfBirth: { value: 1989 },
  job: { value: 'designer' },
});

// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

const questionNode = document.querySelector('h2');
const answerNode = document.querySelector('ol');
const formNode = document.querySelector('form');
const scoreNode = document.querySelector('p span');

const Question = function (question, answers, correntAnswer) {
  this.question = question;
  this.answers = answers;
  this.correntAnswer = correntAnswer;

  this.showAnswers = function () {
    for (let i = 0; i < answers.length; i++) {
      console.log(`${i + 1}: ${answers[i]}`);
    }
  };
};

const firstQuestion = new Question('2 + 2 = ?', [4, 6, 'too much'], 1);
const secondQuestion = new Question('6 * 6 = ?', [66, 18, 36], 3);
const thirdQuestion = new Question('Which year is it now ?', [2019, 2020, 2021], 2);

const questions = [firstQuestion, secondQuestion, thirdQuestion];

let currentQuestion;

function askQuestion() {
  // get random answer
  const currentQuestionNumber = Math.floor(Math.random() * questions.length);
  // save this question
  currentQuestion = questions.slice(currentQuestionNumber, currentQuestionNumber + 1)[0];
  console.log(currentQuestion);
  // cut question from array
  questions.splice(currentQuestionNumber, 1);
  // put text in question
  questionNode.textContent = currentQuestion.question;
  // delete previous list
  while (answerNode.firstChild) {
    answerNode.removeChild(answerNode.firstChild);
  }
  // create new list
  const fragment = new DocumentFragment();
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const li = document.createElement('li');
    li.textContent = currentQuestion.answers[i];
    fragment.append(li);
  }
  answerNode.append(fragment);
}

askQuestion();



/* 
  1. Берем случайный вопрос (сделано)
  2. Вырезаем его из массива
  3. Задаем вопрос
  4. Проверяем
  5. Прибавляем к счету
  6. Задаем следующий вопрос
  7. Показываем финальный результат
*/