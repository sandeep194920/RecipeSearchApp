
// importing model data
import * as model from './model.js'

// importing view data
import recipeView from './views/recipeView';

// import icons from '../img/icons.svg' // PARCEL 1
import icons from 'url:../img/icons.svg' // PARCEL 2 -- for any asset file not related to programming file, we include url:
import 'core-js/stable'; // for polyfilling everything but async functions
import 'regenerator-runtime'; //for polyfilling async functions



const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Loading receipe
const showRecipe = async function () {
  recipeView.renderSpinner()
  try {
    // Load the recipe on hash change
    const id = window.location.hash.slice(1);
    if (!id) return

    // 1) Loading the recipe
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe)

  } catch (err) {
    alert(err)
  }
}

showRecipe();


// window.addEventListener('hashchange', showRecipe) // when link is clicked and hash changes
// window.addEventListener('load', showRecipe) // when whole link is pasted in a new page the hash should still work, so we listen for window load. 

// the above code can be written as 
['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, showRecipe)
});