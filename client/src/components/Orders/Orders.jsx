import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderAlphabetically, orderByHealthScore } from "../../redux/actions";
import style from "../Filters/Filters.module.css";

const Orders = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const handleChange = (order) => {
    switch (order.target.value) {
      case "a-z":
        dispatch(orderAlphabetically(order.target.value));
        break;
      case "z-a":
        dispatch(orderAlphabetically(order.target.value));
        break;
      case "asc":
        dispatch(orderByHealthScore(order.target.value));
        break;
      case "des":
        dispatch(orderByHealthScore(order.target.value));
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className={style.container}>
      <span className={style.title}>Order: </span>
      <div className={style.selectWrapper}>
        <select className={style.select} onChange={handleChange}>
          <option>Alphabetically</option>
          <option value={"a-z"}>A-Z</option>
          <option value={"z-a"}>Z-A</option>
        </select>
        <select className={style.select} onChange={handleChange}>
          <option>Health Score</option>
          <option value={"des"}>Highest ⬆️</option>
          <option value={"asc"}>Lowest ⬇️</option>
        </select>
      </div>
    </div>
  );
};

export default Orders;
