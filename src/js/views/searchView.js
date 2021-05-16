class searchView {

    #parentEl = document.querySelector('.search')


    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value
        this.#clearInput()
        return query
    }
    #clearInput() {
        console.log(this.#parentEl.querySelector('.search__field').value)
        this.#parentEl.querySelector('.search__field').value = ''
        console.log("Clearing input")
        console.log(this.#parentEl.querySelector('.search__field').value)
    }
    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault()
            handler()
        })



    }

}

export default new searchView()