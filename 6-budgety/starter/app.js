const budgetController = (function () {
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

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
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    addListItem(obj, type) {
        // Create HTML string with placeholder text
        let html;
        let newHTML;
        let element;

        if (type === 'inc') {
          element = DOMstrings.incomeContainer;
          html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
        } else if (type === 'exp') {
          element = DOMstrings.expensesContainer;
          html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
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

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
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

  const ctrlAddItem = () => {
    let input;
    let newItem;
    // 1. Get the field input data
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);
    // 4. calculate the budget

    // 5. Display the budget on the UI
  };

  return {
    init() {
      console.log('init');
      setupIventListeners();
    },
  };
}(budgetController, UIController));

controller.init();
