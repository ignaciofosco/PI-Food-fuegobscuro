import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ recipesPerPage, allRecipes, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {currentPage > 1 && (
          <li className={styles.number}>
            <button onClick={() => paginate(currentPage - 1)}>{"<<"}</button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li className={styles.number} key={number}>
            <button
              className={currentPage === number ? styles.active : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}

        {currentPage < pageNumbers.length && (
          <li className={styles.number}>
            <button onClick={() => paginate(currentPage + 1)}>{">>"}</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
