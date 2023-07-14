import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getAllDiets, getRecipeById } from "../../redux/actions";
import RecipesContainer from "../../components/RecipesContainer/RecipesContainer";
import Filters from "../../components/Filters/Filters";
import Orders from "../../components/Orders/Orders";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Home.module.css";

const Home = () => {

    const dispatch = useDispatch();
//Pagination
    const allRecipes = useSelector((state) => state.allRecipes);
    const [ currentPage, setCurrentPage ] = useState(1); 
    const [ recipesPerPage, setRecipesPerPage ] = useState(9);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
//
    // const handleClearAll = () => {
    //  
    // };

    useEffect(() => {
        dispatch(getAllDiets())
        dispatch(getAllRecipes());
        // dispatch(getRecipeById([]));
    },[dispatch]);

    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} />
          <div className={style.containerHome}>
            <section className={style.section}>
              <div className={style.filtersOrders}>
              
                <div>
                  <Filters setCurrentPage={setCurrentPage}/>
                </div>
                <div className={style.separator} />
                <div >
                  <Orders setCurrentPage={setCurrentPage}/>
                </div>
                
              </div>
              <div className={style.clearAll}>
                <button className={style.link}>
                  Clear all
                </button>
              </div>
              <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} currentPage={currentPage} paginate={paginate} />
              <div className={style.cardContainer}>
                <RecipesContainer currentRecipes={currentRecipes} />
              </div>
            </section>
            <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} currentPage={currentPage} paginate={paginate} />
          </div>
        </>
      );
};

export default Home;