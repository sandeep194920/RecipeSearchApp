import { async } from 'regenerator-runtime'
import { API_URL } from './config'
import { getJson } from './helpers'
export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
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
    }
    catch (err) {
        throw err // handled by controller
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query
        const { data } = await getJson(`${API_URL}?search=${query}`)

        state.search.results = data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
    } catch (error) {
        throw error // handled by controller
    }
}

loadSearchResults('pizza')
