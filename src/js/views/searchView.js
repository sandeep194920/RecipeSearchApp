class searchView {

    _parentElement = document.querySelector('.search')

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value
        this._clearInput()
        return query
    }
    _clearInput() {
        // console.log(this._parentElement.querySelector('.search__field').value)
        this._parentElement.querySelector('.search__field').value = ''
        // console.log("Clearing input")
        // console.log(this._parentElement.querySelector('.search__field').value)
    }
    addHandlerSearch(handler) {
        // default render pizza
        handler() // returns a promise as we are calling async function, but just wanted to trigger it for the first time to fill out left panel with pizzas
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault()
            handler()
        })
    }

}

export default new searchView()