const budgetController = (function () {
  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((el) => {
      sum += el.value;
    });
  };

  return {
    addItem(type, des, val) {
      let newItem;
      let ID;
      // create new id = id of the last item in exp/inc array + 1
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on 'inc' of 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push it into our data structure
      data.allItems[type].push(newItem);

      // return new element
      return newItem;
    },
    calculateBudget() {
      // calculate total income and expences

      // calculate the budget: income - ex

      // calculate the percentage of income that we spent
    },
    testing() {
      console.log(data);
    },
  };
}());

const UIController = (function () {
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
  };

  return {
    getDOMstrings() {
      return DOMstrings;
    },
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addListItem(obj, type) {
      // Create HTML string with placeholder text
      let html;
      let newHTML;
      let element;

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);
      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('afterend', newHTML);
    },
    clearFields() {
      let fields;
      fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

      fields.forEach((el) => {
        el.value = '';
      });

      fields[0].focus();
    },
  };
}());

const controller = (function (budgetCtrl, UICtrl) {
  const setupIventListeners = () => {
    const DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keyup', (e) => {
      e.key === "Enter" ? ctrlAddItem() : false;
    });
  };

  const updateBudget = () => {
    // 1. Calculate budget

    // 2. Return the budget

    // 3. Display the budget on the UI

  };

  const ctrlAddItem = () => {
    let newItem;
    // 1. Get the field input data
    const input = UICtrl.getInput();
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear fields
      UICtrl.clearFields();
      // 5. calculate the budget
      updateBudget();
      // 6. Display the budget on the UI
    }
  };

  return {
    init() {
      console.log('init');
      setupIventListeners();
    },
  };
}(budgetController, UIController));

controller.init();
