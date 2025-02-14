import { toast } from "react-toastify";

export function useFavorites() {

    const addToFavorites = (recipeName) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.some(fav => fav.recipeName === recipe.recipeName)) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        
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

    const getFavorites = () => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }     

    return {addToFavorites, getFavorites};
}