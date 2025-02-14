import { useState } from "react"
import { useRecipes } from "../hooks/useRecipes"
import {RecipeModal} from "./RecipeModal"



function useModalRecipe (recipeName, image) {

    return (
        <>
        <div className="modal-container">
            <h2>{recipeName}</h2>
            <img src={image} alt="" />

        </div>
        </>
    )

}

export function RecipeCard({ingredient}) {
    const {recipes} = useRecipes(ingredient)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    
    const handleClick = (recipe) => {
       console.log(recipe)
        setSelectedRecipe(recipe)      
    }
    
    return(
    <>
    <div className="recipes-container">
        {recipes?.length>0 ? (
        recipes.map(( {recipeName,image,id}) => (
            <div key={id} className="recipe-container">
            <h2 className="recipe-title">{recipeName}</h2>
            <img className="recipe-image" src={image} alt="" /> 
            <button className="recipe-button" onClick={()=> handleClick({recipeName, image})}>Read more  <i className="ri-arrow-right-line"></i></button>   
            </div>
                ))
            ) : (
                <div className="recipe-container">
                    <h3>Cargando...</h3>
                </div>
            )
        }
        
        {selectedRecipe && <RecipeModal recipe= {selectedRecipe} onClose={()=>setSelectedRecipe(null)}/> }
    </div>
    </>
)


}