import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, filterByDbCreated} from '../../redux/actions';
import style from "./Filters.module.css";

const Filters = () => {

    const dispatch = useDispatch();

    const diets = useSelector(state => state.diets)

    const handleChange = (event) => {
        dispatch(filterByDiet("all"))
        dispatch(filterByDiet(event.target.value));
    };

    const handleChangeDbOnly = (dbonly) => {
        dispatch(filterByDbCreated(dbonly.target.value))
    }

    return (
      <div className={style.container}>
        <span className={style.title}>Filter: </span>
        <div className={style.selectWrapper}>
          <select onChange={handleChange} className={style.select}>
            <option value={'all'}>All diets</option>
            {diets.map(diet => (
              <option value={diet.name} key={diet.name}>
                {diet.name[0].toUpperCase() + diet.name.slice(1)}
              </option>
            ))}
          </select>
          <select className={style.select} onChange={handleChangeDbOnly}>
            <option value={'all'}>All recipes</option>
            <option value={'api'}>Only API</option>
            <option value={'db'}>Only Database</option>
          </select>
        </div>
      </div>
    );
};

export default Filters;