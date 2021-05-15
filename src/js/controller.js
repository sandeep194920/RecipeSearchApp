
// importing model data
import * as model from './model'

// importing view data
import recipeView from './views/recipeView';

// import icons from '../img/icons.svg' // PARCEL 1
import 'core-js/stable'; // for polyfilling everything but async functions
import 'regenerator-runtime'; //for polyfilling async functions



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    console.error(`${err} - from controller `)
  }
}

// This controller should have controlRecipes() and init()

controlRecipes();

// init()

// window.addEventListener('hashchange', showRecipe) // when link is clicked and hash changes
// window.addEventListener('load', showRecipe) // when whole link is pasted in a new page the hash should still work, so we listen for window load. 

// the above code can be written as 
// ['hashchange', 'load'].forEach(ev => {
//   window.addEventListener(ev, controlRecipes)
// });

function init() {
  recipeView.addHandlerRender(controlRecipes)
}

init()