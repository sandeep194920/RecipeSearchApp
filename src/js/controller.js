// importing model data
import * as model from './model'

// importing view data
import recipeView from './views/recipeView';

// import icons from '../img/icons.svg' // PARCEL 1
import 'core-js/stable'; // for polyfilling everything but async functions
import 'regenerator-runtime'; //for polyfilling async functions
import searchView from './views/searchView';
import resultsView from './views/resultsView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// hot module replacement by parcel. Hot module replacement allows you to smart refresh the page. Meaning, when you change something
// on the page and save it, the live server won't refrersh the entire page, but instead the part which has been changed only 
// changes on the page. 
// for example, if you remove a console.log and save it, the page itself remains without refreshed, but if you observ in console,
// it says console cleared
if (module.hot) {
  module.hot.accept()
}

// Loading receipe

const controlRecipes = async function () {
  recipeView.renderSpinner()
  try {
    // 0) Load the recipe on hash change - init()
    const id = window.location.hash.slice(1);
    if (!id) return

    // 1) Loading the recipe from model
    await model.loadRecipe(id);

    // 2) Rendering the recipe to view
    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  resultsView.renderSpinner()
  try {
    // 1) Get search query 
    const query = searchView.getQuery()
    if (!query) return
    // 2) Load search results
    await model.loadSearchResults(query) // this will update model.state.search.results but will not return anything

    // 3) Render results
    resultsView.render(model.state.search.results)
    // 4) Clear the input search field
    // searchView.clearInput()
  } catch (error) {
    console.log(error)
  }
}

// the above functionality is being implemented in view and being called here as below. This is publish, subscribe pattern
function init() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}
init()