import axios from "axios";

const URL_API = "http://localhost:3001";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_SEARCH_RECIPES = "GET_SEARCH_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const ORDER_SCORE = "ORDER_SCORE";
export const DIET_FILTER = "DIET_FILTER";
export const DBCREATED_FILTER = "DBCREATED_FILTER";

export const getAllRecipes = () => {
    const urlAllRecipes = `${URL_API}/recipes`;
    
    return async function (dispatch) {
            const apiData = await axios.get(urlAllRecipes);
            const allRecipes = apiData.data;

           dispatch({ type: GET_ALL_RECIPES, payload: allRecipes });

            // axios.get(urlAllRecipes)   
            // .then((response) => {
            //     return dispatch({type: GET_ALL_RECIPES, payload: response.data })
            // })
    };
};

export const getAllDiets = () => {
    const urlAllDiets = `${URL_API}/diets`;

    return async function (dispatch) {
        const dietData = await axios.get(urlAllDiets);
        const allDiets = dietData.data;

        dispatch({ type: GET_ALL_DIETS, payload: allDiets });
    };
};

export const getRecipesByName = (name) => {
    const urlRecipesByName = `${URL_API}/recipes?name=${name}`;
    
    return async function (dispatch) {
        if (name) {
            try {
                const apiData = await axios.get(urlRecipesByName);
                const recipesByName =  apiData.data;
                
                dispatch({ type: GET_RECIPES_BY_NAME, payload: recipesByName });
            }

            catch (error) {
                dispatch({ type:GET_RECIPES_BY_NAME, payload: null });
                alert("Recipe not found");
            }
        } 
        
        else {
            dispatch({ type: GET_RECIPES_BY_NAME });
        }
    };
};

export const getRecipeById = (id) => {
    let urlRecipeById = `${URL_API}/recipes/${id}`;
    
    return async function (dispatch) {
            try {
                const apiData = await axios.get(urlRecipeById);
                const recipeById = apiData.data;
                dispatch({type: GET_RECIPE_BY_ID, payload: recipeById })
            } 
            
            catch (error) {
                console.log(error)
            }
    }
};

export const getSearchRecipes = (name) => {
    return {
        type: GET_SEARCH_RECIPES,
        payload: name
    }
};

export const postRecipe = (form) => {
    return async function (dispatch) {
      try {
        await axios.post(`${URL_API}/recipes`, form);
        
        dispatch({ type: POST_RECIPE });
      } 
      
      catch (error) {
        console.log(error);
      }
    };
};

export const orderAlphabetically = (order) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload: order
    }
};

export const orderByHealthScore = (score) => {
    return {
        type: ORDER_SCORE,
        payload: score
    }
};

export const filterByDiet = (diet) => {
    return {
        type: DIET_FILTER,
        payload: diet
    }
};

export const filterByDbCreated = (dbcreated) => {
    return {
        type: DBCREATED_FILTER,
        payload: dbcreated
    }
};