import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllRecipes, getSearchRecipes, getRecipesByName } from '../../redux/actions';
import style from "./SearchBar.module.css";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState("");
        
    const handleInput = (event) => {
        const inputValue = event.target.value;
        setInput(inputValue);

        if (inputValue.trim() === "") {
            dispatch(getAllRecipes());
        } 
        
        else {
            const delayTimer = setTimeout(() => {
            dispatch(getSearchRecipes(inputValue));
            }, 750); // Delay in milliseconds before triggering the search
          
            return () => clearTimeout(delayTimer); // Cleanup the timer on component unmount or input change
        }
    };
            
    const handleSubmit = async (event) => {
        if (input !== "") {
            event.preventDefault();
            dispatch(getRecipesByName(input));
            setInput("");
        }

        else {
            event.preventDefault();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder="Search recipe..."
                onChange={handleInput}
                value={input}
                className={style.inputSearch}
            />
        </form>
    )
};

export default SearchBar;