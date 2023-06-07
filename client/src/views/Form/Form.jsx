import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllRecipes, getAllDiets, postRecipe } from '../../redux/actions';
import validation from "./validation";
import styles from "./Form.module.css";

const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const recipes = useSelector(state => state.allRecipes);
    const diets = useSelector(state => state.diets);

    const [error, setError] = useState({});

    const [form, setForm] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: [],
    });

    useEffect(() => {
        dispatch(getAllDiets())
        dispatch(getAllRecipes())
    }, [dispatch]);
    
    const handleSelect = (event) => {
        const checked = event.target.checked;
        const value = event.target.value;
        
        if (checked) {
            setForm({
                ...form,
                diets: [...form.diets, value]
            })

            setError(validation({
                ...form,
                diets: [...form.diets, value]
            }, recipes))
        } 
        
        else if (!checked) {
            setForm({
                ...form,
                diets: form.diets.filter(diet => diet !== value)
            })

            setError(validation({
                ...form,
                diets: form.diets.filter(diet => diet !== value)
            }, recipes))        
        }};


    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [property]: value
        });

        setError(validation({
            ...form,
            [property]: value
        }, recipes));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError(validation(form, recipes));
        
        if (Object.entries(error).length === 0 && form.name.length) {
            dispatch(postRecipe(form));
            alert("Recipe created successfully!");
            history.push('/home');
        } else {
            alert("Error processing form");
        }
    };
  
//     return (
//         <div className={style.formContainer}>
//           <div>
//             <form onSubmit={(event) => handleSubmit(event)}>
//               <div>
//                 <div className={style.formHeader}>
//                   <h1>Create your recipe!</h1>
//                 </div>
      
//                 <div>
//                   <label className={style.formLabel}>Name: </label>
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     value={form.name}
//                     name="name"
//                     onChange={(event) => handleChange(event)}
//                     required
//                     className={style.formInput}
//                   />
//                   {error.name ? <span className={style.formError}>*{error.name}</span> : undefined}
//                 </div>
      
//                 <div>
//                   <label className={style.formLabel}>Summary: </label>
//                   <textarea
//                     type="text"
//                     placeholder="Summary"
//                     value={form.summary}
//                     name="summary"
//                     onChange={(event) => handleChange(event)}
//                     required
//                     className={style.formTextarea}
//                   />
//                   {error.summary ? <span className={style.formError}>*{error.summary}</span> : undefined}
//                 </div>
      
//                 <div>
//                   <label className={style.formLabel}>Health Score: </label>
//                   <input
//                     type="number"
//                     placeholder="Health Score"
//                     value={form.healthScore}
//                     name="healthScore"
//                     onChange={(event) => handleChange(event)}
//                     maxLength="3"
//                     required
//                     className={style.formInput}
//                   />
//                   {error.healthScore ? <span className={style.formError}>*{error.healthScore}</span> : undefined}
//                 </div>
      
//                 <div>
//                   <label className={style.formLabel}>Step-by-step instructions: </label>
//                   <textarea
//                     type="text"
//                     placeholder="Steps"
//                     value={form.steps}
//                     name="steps"
//                     onChange={(event) => handleChange(event)}
//                     required
//                     className={style.formTextarea}
//                   />
//                   {error.steps ? <span className={style.formError}>*{error.steps}</span> : undefined}
//                 </div>
      
//                 <div>
//                   <label className={style.formLabel}>Image: </label>
//                   <input
//                     type="text"
//                     placeholder="URL Image"
//                     value={form.image}
//                     name="image"
//                     onChange={(event) => handleChange(event)}
//                     className={style.formInput}
//                   />
//                   {error.image ? <span className={style.formError}>*{error.image}</span> : undefined}
//                 </div>
//               </div>
      
//               <div>
//                 <h4>Choose diets:</h4>
//                 {error.diets ? <span className={style.formError}>*{error.diets}</span> : undefined}
//                 <div className={style.formCheckboxContainer}>
//                   {diets.map((diet) => (
//                     <label key={diet.name} htmlFor={diet.name}>
//                       <div>
//                         <input
//                           type="checkbox"
//                           id={diet.name}
//                           value={diet.name}
//                           onChange={(event) => handleSelect(event)}
//                           required
//                         />
//                         {diet.name}
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>
      
//               <div className={style.formButtonContainer}>
//                 <button type="submit" onClick={handleSubmit} className={style.formButton}>
//                   Create recipe
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       );
// };

return (
    <div className={styles.formContainer}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create your recipe!</h1>
        </div>
  
        <div>
          <label className={styles.formLabel}>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            name="name"
            onChange={(event) => handleChange(event)}
            required
            className={styles.formInput}
          />
          {error.name ? <span className={styles.formError}>*{error.name}</span> : undefined}
        </div>
  
        <div>
          <label className={styles.formLabel}>Summary:</label>
          <textarea
            type="text"
            placeholder="Summary"
            value={form.summary}
            name="summary"
            onChange={(event) => handleChange(event)}
            required
            className={styles.formTextarea}
          />
          {error.summary ? <span className={styles.formError}>*{error.summary}</span> : undefined}
        </div>
  
        <div>
          <label className={styles.formLabel}>Health Score:</label>
          <input
            type="number"
            placeholder="Health Score"
            value={form.healthScore}
            name="healthScore"
            onChange={(event) => handleChange(event)}
            maxLength="3"
            required
            className={styles.formInput}
          />
          {error.healthScore ? <span className={styles.formError}>*{error.healthScore}</span> : undefined}
        </div>
  
        <div>
          <label className={styles.formLabel}>Step-by-step instructions:</label>
          <textarea
            type="text"
            placeholder="Steps"
            value={form.steps}
            name="steps"
            onChange={(event) => handleChange(event)}
            required
            className={styles.formTextarea}
          />
          {error.steps ? <span className={styles.formError}>*{error.steps}</span> : undefined}
        </div>
  
        <div>
          <label className={styles.formLabel}>Image:</label>
          <input
            type="text"
            placeholder="URL Image"
            value={form.image}
            name="image"
            onChange={(event) => handleChange(event)}
            className={styles.formInput}
          />
          {error.image ? <span className={styles.formError}>*{error.image}</span> : undefined}
        </div>
  
        <div>
          <h4 className={styles.formLabel}>Choose diets:</h4>
          {error.diets ? <span className={styles.formError}>*{error.diets}</span> : undefined}
          <div className={styles.formCheckboxContainer}>
            {diets.slice(0, 6).map((diet) => (
              <label key={diet.name} htmlFor={diet.name}>
                <input
                  type="checkbox"
                  id={diet.name}
                  value={diet.name}
                  onChange={(event) => handleSelect(event)}
                  required
                />
                {diet.name[0].toUpperCase() + diet.name.slice(1)}
              </label>
            ))}
            <br />
            {diets.slice(6, 11).map((diet) => (
              <label key={diet.name} htmlFor={diet.name}>
                <input
                  type="checkbox"
                  id={diet.name}
                  value={diet.name}
                  onChange={(event) => handleSelect(event)}
                  required
                />
                {diet.name[0].toUpperCase() + diet.name.slice(1)}
              </label>
            ))}
          </div>
        </div>
  
        <div className={styles.formButtonContainer}>
          <button type="submit" onClick={handleSubmit} className={styles.formButton}>
            Create recipe
          </button>
        </div>
      </form>
    </div>
  );  

};  

export default Form;