export const state = {
    recipe: {}
}

// Fetches the data from forkify api
export const loadRecipe = async function (id) {
    try {

        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        const data = await res.json()
        console.log(res)
        console.log(data)
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
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
        alert(err)
    }
}