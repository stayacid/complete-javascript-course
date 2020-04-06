// Global app controller
import '../css/style.css';
import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';

/* Global state of the app
* - Seacrh object
* - Current recipe object
* - Shopping list object
* - Liked pecipes
*/
const state = {

};

// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1) Get the query from view
  const query = searchView.getInput(); // TODO

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);
    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Seacrh for recipes
      await state.search.getResult();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log('Search error: ', err);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    searchView.clearResults();
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', ' ');

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render recipe
      console.log(state.recipe);
    } catch (err) {
      console.log('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));
