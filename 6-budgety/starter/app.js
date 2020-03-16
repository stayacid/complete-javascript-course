const budgetController = (function () {
  const Expense = (id, description, value) => {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  const Income = (id, description, value) => {
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
      let ID = 0;

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
  };
}());

const UIController = (function () {
  const DOMstrings = {
    inputType: '.add__type',
    inputdescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
  };

  return {
    getDOMstrings() {
      return DOMstrings;
    },
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputdescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
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
    const input = UICtrl.getInput();
    console.log(input);
  };

  return {
    init() {
      console.log('test');
      setupIventListeners();
    },
  };
}(budgetController, UIController));

controller.init();
