import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSearchRecipes } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);

    // if (inputValue.trim() === "") {
    //     dispatch(getAllRecipes());
    //     setCurrentPage(1);
    // }

    // else {
    const delayTimer = setTimeout(() => {
      dispatch(getSearchRecipes(inputValue));
      setCurrentPage(1);
    }, 1000); // Delay in milliseconds before triggering the search

    return () => clearTimeout(delayTimer); // Cleanup the timer on component unmount or input change
    // }
  };

  const handleSubmit = async (event) => {
    if (input !== "") {
      event.preventDefault();
      dispatch(getSearchRecipes(input));
      setInput("");
      setCurrentPage(1);
    } else {
      event.preventDefault();
    }
  };

  useEffect(() => {
    setInput(""); // Reset the input value when the SearchBar component mounts
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipe..."
        onChange={handleInput}
        value={input}
        className={style.inputSearch}
      />
    </form>
  );
};

export default SearchBar;
