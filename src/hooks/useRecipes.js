import { useEffect, useState } from "react"

export function useRecipes (ingredient) {

    const RECIPE_INGREDIENT_ENDPOINT= `https://www.themealdb.com/api/json/v1/1/filter.php?`
    const [recipes, setRecipes] = useState([])
    const [error, setError]= useState(null) 

   
    useEffect(()=>{
        if(!ingredient) return;
    try{
        fetch(`${RECIPE_INGREDIENT_ENDPOINT}i=${ingredient}`)
        .then((res) => res.json())
        .then((data) => {

            if(!data.meals) {
                setRecipes([])
                setError("No recipes with that ingredient")
                return;
            }

            const recipeData = data.meals.map((meal) => ({
                recipeName: meal.strMeal,
                image: meal.strMealThumb,
                id: meal.idMeal,
            }));

            console.log(recipeData)
            setRecipes(recipeData)
            setError(null)
        })

    }catch(e) {
        console.log("Error geting recipes", e)
        setError("Error geting recipes")
    }

    }, [ingredient])
    

    return  { recipes, error, setRecipes }
}
