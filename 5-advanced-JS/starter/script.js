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

//const john = new Person('John', 1990, 'teacher');
//const jane = new Person('Jane', 1969, 'designer');
//const mark = new Person('Mark', 1989, 'retired');

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
