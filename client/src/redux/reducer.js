import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  POST_RECIPE,
  GET_RECIPES_BY_NAME,
  GET_RECIPE_BY_ID,
  GET_SEARCH_RECIPES,
  ORDER_ALPHABETICALLY,
  ORDER_SCORE,
  DIET_FILTER,
  DBCREATED_FILTER,
} from "./actions";

const initialState = {
  recipes: [],
  temporal: [],
  diets: [],
  recipeByName: undefined,
  recipeById: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: action.payload, temporal: action.payload };

    case GET_ALL_DIETS:
      return { ...state, diets: action.payload };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipeByName:
          action.payload === undefined ? undefined : action.payload[0],
      };

    case GET_RECIPE_BY_ID: {
      return {
        ...state,
        recipeById: action.payload,
      };
    }

    case GET_SEARCH_RECIPES:
      let searchFilter = [
        ...state.recipes.filter((recipe) =>
          recipe.name
            .toString()
            .toLowerCase()
            .includes(action.payload.toString().toLowerCase()),
        ),
      ];

      return {
        ...state,
        temporal: searchFilter,
        // temporal: searchFilter.length === 0 ? ["Recipe not found"] : searchFilter
      };

    case ORDER_ALPHABETICALLY:
      let sortedRecipesAlphabetically;

      if (action.payload === "a-z") {
        sortedRecipesAlphabetically = [...state.temporal].sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
        );
      } else {
        sortedRecipesAlphabetically = [...state.temporal].sort((a, b) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0,
        );
      }

      return {
        ...state,
        temporal: sortedRecipesAlphabetically,
      };

    case ORDER_SCORE:
      let sortedRecipesByScore;

      if (action.payload === "asc") {
        sortedRecipesByScore = [...state.temporal].sort(
          (a, b) => a.healthScore - b.healthScore,
        );
      } else {
        sortedRecipesByScore = [...state.temporal].sort(
          (a, b) => b.healthScore - a.healthScore,
        );
      }

      return {
        ...state,
        temporal: sortedRecipesByScore,
      };

    case DIET_FILTER:
      let filteredRecipesByDiet;

      if (action.payload === "all") {
        filteredRecipesByDiet = state.recipes;
      } else if (action.payload === "vegetarian") {
        filteredRecipesByDiet = state.recipes.filter((recipe) =>
          recipe.diets.includes("vegetarian" && "vegan"),
        );
      } else {
        filteredRecipesByDiet = state.recipes.filter((recipe) =>
          recipe.diets.includes(action.payload),
        );
      }

      return {
        ...state,
        temporal: filteredRecipesByDiet,
      };

    case DBCREATED_FILTER:
      let filteredRecipesByDbCreated;

      if (action.payload === "all") {
        filteredRecipesByDbCreated = state.recipes;
      } else if (action.payload === "api") {
        filteredRecipesByDbCreated = state.recipes.filter(
          (recipe) => !recipe.hasOwnProperty("createdInDb"),
        );
      } else {
        filteredRecipesByDbCreated = state.recipes.filter((recipe) =>
          recipe.hasOwnProperty("createdInDb"),
        );
      }

      return {
        ...state,
        temporal: filteredRecipesByDbCreated,
      };

    case POST_RECIPE:
      return { ...state };

    default:
      return { ...state };
  }
};

export default rootReducer;
