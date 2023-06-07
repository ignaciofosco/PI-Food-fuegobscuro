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
} from "./actions"

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    recipeByName: undefined,
    recipeById: {},
};

const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case GET_ALL_RECIPES:
            return { ...state, 
                recipes: action.payload,
                allRecipes: action.payload,
            };
            
        case GET_ALL_DIETS:
            return { ...state,
                diets: action.payload
            };
            
        case GET_RECIPES_BY_NAME:
            return { ...state,
                recipeByName: action.payload === undefined ? undefined : action.payload[0]
            };
        
        case GET_RECIPE_BY_ID: {
          return {
            ...state,
            recipeById: action.payload,
          };
        }
                
        case GET_SEARCH_RECIPES:
            let searchFilter = [
                ...state.allRecipes.filter((recipe) =>
                recipe.name.toString().toLowerCase().includes(action.payload.toString().toLowerCase())
                )
            ] 
                    
            return {
                ...state,
                allRecipes: searchFilter
                // allRecipes: searchFilter.length === 0 ? ["Recipe not found"] : searchFilter
            };        
        
        case ORDER_ALPHABETICALLY:
            let sortedRecipesAlphabetically;
          
            if (action.payload === "a-z") {
              sortedRecipesAlphabetically = [...state.allRecipes].sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
            } else {
              sortedRecipesAlphabetically = [...state.allRecipes].sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
            }
          
            return {
              ...state,
              allRecipes: sortedRecipesAlphabetically
            };
          
        case ORDER_SCORE:
            let sortedRecipesByScore;
          
            if (action.payload === "asc") {
              sortedRecipesByScore = [...state.allRecipes].sort((a, b) => a.healthScore - b.healthScore);
            } else {
              sortedRecipesByScore = [...state.allRecipes].sort((a, b) => b.healthScore - a.healthScore);
            }
          
            return {
              ...state,
              allRecipes: sortedRecipesByScore
            };

        case DIET_FILTER:
            if (action.payload === 'all') {
                return {
                    ...state,
                    allRecipes: state.recipes,
                };
            }
              
            return {
                ...state,
                allRecipes: state.recipes.filter((recipe) => recipe.diets.includes(action.payload)),
            };
              
        case DBCREATED_FILTER:
            if (action.payload === 'all') {
              return {
                ...state,
                allRecipes: state.recipes,
              };
            } 
            
            else if (action.payload === 'api') {
              return {
                ...state,
                allRecipes: state.recipes.filter((recipe) => !recipe.hasOwnProperty('createdInDb')),
              };
            }
            
            else {
              return {
                ...state,
                allRecipes: state.recipes.filter((recipe) => recipe.hasOwnProperty('createdInDb')),
              };
            }

        case POST_RECIPE:
            return { ...state };
        
        default:
            return { ...state };           
    }      
};

export default rootReducer;