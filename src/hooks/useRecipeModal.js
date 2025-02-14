import { useEffect, useState } from "react";

export function useRecipeModal (recipeName) {

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
    
        return {modalData, modalError}
}