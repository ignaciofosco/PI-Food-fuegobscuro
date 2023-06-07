import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getAllDiets } from "../../redux/actions";
import RecipesContainer from "../../components/RecipesContainer/RecipesContainer";
import Filters from "../../components/Filters/Filters";
import Orders from "../../components/Orders/Orders";
import Pagination from "../../components/Pagination/Pagination";
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
    useEffect(() => {
        dispatch(getAllDiets())
        dispatch(getAllRecipes());
    },[dispatch]);

    return (
        <>
          <div className={style.containerHome}>
            <section className={style.section}>
              <div className={style.filtersOrders}>
              
                <div>
                  <Filters />
                </div>
                <div className={style.separator} />
                <div >
                  <Orders />
                </div>
                
              </div>
              <div className={style.clearAll}>
                <a className={style.link} href="/home">Clear all</a>
              </div>
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