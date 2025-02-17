import { useEffect, useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RecipeModal ({recipe, onClose}) {

   const { recipeName, image} = recipe;
    const FULL_RECIPE_ENDPOINT= "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const [modalError, setModalError] = useState(null)
    const [modalData, setModalData]= useState(null)
    

    useEffect(()=> {
        fetch(`${FULL_RECIPE_ENDPOINT}${recipeName}`)
        .then(res=> res.json())
        .then(data=> {

            if(!data.meals) {
                setModalError("We couldn't get the recipe")
                return
            }

            const meal = data.meals[0];

            //extraer ingredientes y medidas
            const ingredients = [];
            for (let i = 1; i<=20; i++ ) {
                const ingredient = meal[`strIngredient${i}`];
                const measure= meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }

            setModalData({
                origin: meal.strArea,
                instructions: meal.strInstructions,
                ingredients,
            });            

        })
        .catch(()=> setModalError("Error loading the recipe"))
    }, [recipeName])

    const handleFavorites =()=> {
       const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

       const isAlreadyFavorite= favorites.some(fav=> fav.recipeName === recipeName)

       if(!isAlreadyFavorite) {
        favorites.push({recipeName, image});
        localStorage.setItem('favorites', JSON.stringify(favorites))
       
        toast.success("⭐ Recipe added to favorites!", {
            className: "custom-toast",
            progressClassName: "custom-toast-progress",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon:false,
            theme: "colored",
            closeButton: false
        })
    } else {
        toast.info("✅ Recipe is already in favorites!", {
            className: "custom-toast",
            progressClassName: "custom-toast-progress",
            icon: false,
            position: "top-right",
            autoClose: 1500,
            closeButton: false,
            theme: "colored"
        })
    }
       
    }
    
    return (
        <div className="modal-container">
        <div className="modal">
            <button className="favorite-button" onClick={()=> handleFavorites(recipeName)}> <i className="ri-star-line"/></button>
            <ToastContainer position="top-right" autoClose={2000} />
            <button className="close-button" onClick={onClose}><i className="ri-close-large-line"></i></button>
            <div className="modal-content">
                <h2>{recipe.recipeName}</h2>
                <img className="modal-recipe-image" src={recipe.image} alt={recipe.recipeName} />
    
                {modalError && <p className="recipe-error">{modalError}</p>}
    
                {modalData ? (
                    <>
                        <h3>🌍 Origin:</h3>
                        <p>{modalData.origin}</p>
    
                        <h3>📝 Ingredients:</h3>
                        <ul>
                            {modalData.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
    
                        <h3>📖 Instructions:</h3>
                        <p>{modalData.instructions}</p>
                    </>
                ) : (
                    <p>Loading recipe details...</p>
                )}
            </div>
        </div>
    </div>
    );
}