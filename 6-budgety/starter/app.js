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
    budget: 0,
    percentage: null,
  };
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = null;
  };
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = ((this.value / totalIncome) * 100).toFixed(1);
    } else {
      this.percentage = null;
    }
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
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
    data.totals[type] = sum;
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
    deleteItem(type, id) {
      data.allItems[type].forEach((current, index, allItems) => {
        if (current.id === id) {
          allItems.splice(index, 1);
        }
      });
    },
    calculateBudget() {
      // calculate total income and expences
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget: income - ex
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(1);
      } else {
        data.percentage = -1;
      }
    },
    calculatePercentages() {
      data.allItems.exp.forEach((el) => {
        el.calcPercentage(data.totals.inc);
      });
    },
    getPercentages() {
      return data.allItems.exp.map((el) => el.getPercentage()).reverse();
    },
    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
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
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    item: '.item',
    deleteBtn: '.item__delete--btn',
    expencesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  const formatNumber = (num, type) => {
    const nSplit = num.toFixed(2).split('.');
    const separator = navigator.language === 'en-US' ? ',' : ' ';
    let int = nSplit[0];
    if (int.length > 3) {
      int = int.substring(0, int.length - 3) + separator + int.substring(int.length - 3, int.length);
    }
    const dec = nSplit[1];
    return `${(type === 'exp' ? '-' : '+')} ${int}.${dec}`;
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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('afterend', newHTML);
    },
    deleteListItem(selectorID) {
      document.getElementById(selectorID).remove();
    },
    clearFields() {
      const fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

      fields.forEach((el) => {
        el.value = '';
      });

      fields[0].focus();
    },
    displayBudget(obj) {
      let type;
      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage}%`;
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },
    displayPercentages(percentages) {
      const fields = document.querySelectorAll(DOMstrings.expencesPercLabel);
      fields.forEach((el, i) => {
        const e = el;
        if (percentages[i] > 0) {
          e.textContent = `${percentages[i]}%`;
        } else {
          e.textContent = '---';
        }
      });
    },
    displayMonth() {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      document.querySelector(DOMstrings.dateLabel).textContent = `${months[month]} ${year}`;
    },
    changeType() {
      const fields = document.querySelectorAll(`${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputValue}`);
      fields.forEach((el) => {
        el.classList.toggle('red-focus');
      });
      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },
  };
}());

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {
  const DOM = UICtrl.getDOMstrings();

  const updateBudget = () => {
    // 1. Calculate budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    const budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  const updatePercentages = () => {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();
    // 2. read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    // 3. Update the UI with the new pecrcentages
    UICtrl.displayPercentages(percentages);
  };

  const ctrlAddItem = function () {
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
      // 5. calculate and update the budget
      updateBudget();
      // 6. Calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function (e) {
    let itemID;
    let type;
    let ID;

    if (e.target.closest(DOM.deleteBtn)) {
      itemID = e.target.closest(DOM.item).id;
      const splitID = itemID.split('-');
      [type, ID] = splitID;
      ID = parseInt(ID, 10);
      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. Delete the item from the UI
      UICtrl.deleteListItem(itemID);
      // 3. Update the show the new budget
      updateBudget();
    }
  };

  const setupIventListeners = () => {
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keyup', (e) => {
      e.key === "Enter" ? ctrlAddItem() : false;
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
  };

  return {
    init() {
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupIventListeners();
    },
  };
}(budgetController, UIController));

controller.init();
