const budgetController = (function () {

}());

const UIController = (function () {
  return {
    getInput() {
      // const type = document.querySelector();
    },
  };
}());

const controller = (function (budgetCtrl, UICtrl) {
  const ctrlAddItem = () => {
    console.log('puk');
  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keyup', (e) => {
    e.key === "Enter" ? ctrlAddItem() : false;
  });
}(budgetController, UIController));
