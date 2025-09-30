import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js';
import 'regenerator-runtime';

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

// event handling - publisher - subscriber design
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
