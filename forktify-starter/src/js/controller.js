import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js';
import 'regenerator-runtime';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

[`hashchange`, `load`].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
// window.addEventListener(`hashchange`, showRecipe);
// window.addEventListener(`load`, showRecipe);
