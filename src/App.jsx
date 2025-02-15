import { useEffect, useRef, useState } from 'react'
import './App.css'
import {useIngredient} from './hooks/useIngredient'
import { useRecipes } from './hooks/useRecipes'
import { RecipeCard } from './components/RecipesCard'

export function App(){

    const {ingredient, setIngredient, error} = useIngredient()
    const {recipes, error: recipesError, setRecipes} = useRecipes(ingredient)
    const [searchDone, setSearchDone] = useState(false)
    const [favorites, setFavorites] = useState([])

    const handleChange= (event) => {
        const newIngredient=event.target.value
        setIngredient(newIngredient)
        setSearchDone(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchDone(true)
    }

    const handleFavorites =() => {
        setFavorites( JSON.parse(localStorage.getItem('favorites')) || [])
    }

    console.log(favorites)


    return (
        <>
        <header>
        <img className='logo' src="/images/logo.png" alt="" onClick={()=> {
            setIngredient(''); 
            setRecipes([]);
            setSearchDone(false)
            
            }}/>
        <h1>Ela´s kitchen🍳</h1>
        <button className='favorites-button' onClick={handleFavorites}><i className="ri-star-line"></i></button>
        </header>
        
        <main>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='tomato, onion, chicken...' value={ingredient} onChange={handleChange}  />
            <button type='submit'>Search</button>
        </form>
        {error && <p className='ingredient-error'>{error}</p>}
        {recipesError && searchDone &&  <p className='recipe-error'>{recipesError}</p>}

       {searchDone && recipes.length > 0 &&  <RecipeCard ingredient={ingredient}/>}
        </main>
        </>
    )
}