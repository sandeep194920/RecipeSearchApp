import { API_URL } from './config'
import { getJson } from './helpers'
export const state = {
    recipe: {}
}

// Fetches the data from forkify api
export const loadRecipe = async function (id) {
    try {
        // ${API_URL}/${id}
        const data = await getJson(`${API_URL}/${id}`)
        const { recipe } = data.data

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_Url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe)
    }
    catch (err) {
        console.error(`${err} - 💥💥💥💥 `)
    }
}

