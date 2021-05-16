import { async } from 'regenerator-runtime'
import { API_URL, RES_PER_PAGE } from './config'
import { getJson } from './helpers'
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
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

// pagination
// at this point of time, we already have all the data loaded into results. All we need is to get the current page and give 
// some results for that particular page
export const getSearchResultsPage = function (page = state.search.page) {
    // page 1 -> 0 to 9
    // page 2 -> 10 to 19
    // page 3 -> 20 to 29

    // Formula for pageStart and end

    // const pageEnd = page * 10
    // const pageStart = (page - 1) * 10

    // alternate way to calculate pageStart
    // const pageStart = pageEnd - 10


    const pageEnd = page * state.search.resultsPerPage
    const pageStart = (page - 1) * state.search.resultsPerPage

    // we need to know at which page we currently are, 

    state.search.page = page

    return state.search.results.slice(pageStart, pageEnd)
}


getSearchResultsPage(1)