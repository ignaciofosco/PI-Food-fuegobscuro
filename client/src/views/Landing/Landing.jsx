import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.center}>
          <h1 className={style.title}>Welcome to fuegobscuro's Food App</h1>
          <Link className={style.textDe} to="/home">
            <button className={style.btn}>Enter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
