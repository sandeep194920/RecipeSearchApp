class searchView {

    _parentEl = document.querySelector('.search')


    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value
        this._clearInput()
        return query
    }
    _clearInput() {
        console.log(this._parentEl.querySelector('.search__field').value)
        this._parentEl.querySelector('.search__field').value = ''
        console.log("Clearing input")
        console.log(this._parentEl.querySelector('.search__field').value)
    }
    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault()
            handler()
        })



    }

}

export default new searchView()