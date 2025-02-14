import { useState, useEffect, useRef } from "react"

//custom hook que verifica que el ingrediente tenga formato correcto
export function useIngredient() {
    const [ingredient, setIngredient] = useState('')
    const [error, setError]= useState(null)
    const isFirstInput= useRef(true)

    useEffect(()=> {
        if (isFirstInput.current) {
            isFirstInput.current = ingredient === ''
            return
          }

        if (ingredient === '') {
            setError('Enter the ingredient you want to search')
            return
        }

        setError(null)
    }, [ingredient])

    return { ingredient, setIngredient, error }
}
