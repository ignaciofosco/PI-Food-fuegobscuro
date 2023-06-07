import React from 'react'
import { useDispatch } from 'react-redux';
import { orderAlphabetically, orderByHealthScore } from '../../redux/actions';
import style from "../Filters/Filters.module.css";

const Orders = () => {

    const dispatch = useDispatch();

    function handleChange (order) {
        switch (order.target.value) {
          case "a-z":
            return dispatch(orderAlphabetically(order.target.value))
          case "z-a":
            return dispatch(orderAlphabetically(order.target.value))
          case "asc":
            return dispatch(orderByHealthScore(order.target.value))
          case "des":
            return dispatch(orderByHealthScore(order.target.value))
          default:
            break;
        }
      }

      return (
        <div className={style.container}>
          <span className={style.title}>Order: </span>
          <div className={style.selectWrapper}>
            <select className={style.select} onChange={handleChange}>
              <option>Alphabetically</option>
              <option value={'a-z'}>A-Z</option>
              <option value={'z-a'}>Z-A</option>
            </select>
            <select className={style.select} onChange={handleChange}>
              <option>Health Score</option>
              <option value={'des'}>Highest ⬆️</option>
              <option value={'asc'}>Lowest ⬇️</option>
            </select>
          </div>
        </div>
      );
      
};

export default Orders;